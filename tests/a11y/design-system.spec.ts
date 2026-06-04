import { test, expect, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]
const OUT = path.join(process.cwd(), "a11y-results")

// Major component sections, by their container id (mirrors the showcase nav).
const SECTION_IDS = [
  "foundations", "buttons", "inputs", "textarea-select", "selection",
  "card-dialog", "table", "alert-badge", "navigation", "disclosure",
  "dropdown-menu", "hover-card", "avatar", "progress-spinner", "skeleton",
  "toast", "empty-state", "toggle-group", "rating", "slider", "otp",
  "stepper", "file-upload", "tag-input", "combobox", "command",
  "date-picker", "calendar", "stat-block", "testimonial", "cta-banner",
  "timeline", "description-list", "charts", "carousel",
]

type Theme = "light" | "dark"

async function setTheme(page: Page, theme: Theme) {
  await page.evaluate((t) => {
    document.documentElement.classList.toggle("dark", t === "dark")
  }, theme)
}

function axe(page: Page) {
  return new AxeBuilder({ page })
    .withTags(TAGS)
    // Exclude Next.js dev-mode overlay/indicator so results reflect our components only.
    .exclude("nextjs-portal")
    .exclude("[data-nextjs-toast]")
    .exclude("#__next-build-watcher")
    .exclude("[data-next-mark]")
}

for (const theme of ["light", "dark"] as Theme[]) {
  test(`design-system a11y — ${theme}`, async ({ page }, testInfo) => {
    mkdirSync(OUT, { recursive: true })

    await page.goto("/design-system", { waitUntil: "load" })
    await page.locator("#foundations").waitFor({ state: "attached", timeout: 120_000 })
    // settle client hydration (charts/carousel mount)
    await page.waitForTimeout(1500)
    await setTheme(page, theme)
    await page.waitForTimeout(300)

    const report: {
      theme: Theme
      generatedAt: string
      axeVersion?: string
      full: unknown[]
      sections: Record<string, unknown>
    } = { theme, generatedAt: new Date().toISOString(), full: [], sections: {} }

    // Whole-page scan.
    const full = await axe(page).analyze()
    report.full = full.violations
    report.axeVersion = full.testEngine?.version

    // Per-section scans so failures report which component broke.
    for (const id of SECTION_IDS) {
      const sel = `#${id}`
      if ((await page.locator(sel).count()) === 0) {
        report.sections[id] = "NOT_FOUND"
        continue
      }
      try {
        const r = await axe(page).include(sel).analyze()
        report.sections[id] = r.violations
      } catch (e) {
        report.sections[id] = `ERROR: ${(e as Error).message}`
      }
    }

    writeFileSync(path.join(OUT, `${theme}.json`), JSON.stringify(report, null, 2))
    await testInfo.attach(`a11y-${theme}`, {
      body: JSON.stringify(report, null, 2),
      contentType: "application/json",
    })

    const byImpact: Record<string, number> = {}
    for (const v of report.full as Array<{ impact?: string }>) {
      const k = v.impact ?? "unknown"
      byImpact[k] = (byImpact[k] ?? 0) + 1
    }
    console.log(
      `[a11y ${theme}] full-page violations: ${report.full.length} ${JSON.stringify(byImpact)}`
    )

    expect(report.full, `axe WCAG A/AA violations on /design-system (${theme})`).toEqual([])
  })
}
