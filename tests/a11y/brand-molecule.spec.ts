import { test, expect, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]

function axe(page: Page) {
  return new AxeBuilder({ page })
    .withTags(TAGS)
    // Exclude Next.js dev-mode overlay/indicator so results reflect our feature only.
    .exclude("nextjs-portal")
    .exclude("[data-nextjs-toast]")
    .exclude("#__next-build-watcher")
    .exclude("[data-next-mark]")
}

test.describe("brand molecule a11y", () => {
  for (const v of ["1", "2", "3"]) {
    test(`no axe violations (v=${v})`, async ({ page }) => {
      await page.goto(`/brand-molecule?v=${v}`, { waitUntil: "load" })
      // Settle client hydration / entrance animation before scanning.
      await page.locator('svg [role="button"]').first().waitFor({ state: "attached", timeout: 120_000 })
      await page.waitForTimeout(700)

      const results = await axe(page).analyze()
      expect(
        results.violations,
        `axe WCAG A/AA violations on /brand-molecule?v=${v}`
      ).toEqual([])
    })
  }

  test("every segment is keyboard reachable", async ({ page }) => {
    await page.goto("/brand-molecule?v=1", { waitUntil: "load" })
    const segments = page.locator('svg [role="button"]')
    await expect(segments).toHaveCount(9)
  })
})
