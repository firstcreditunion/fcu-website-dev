import { defineConfig, devices } from "@playwright/test"

/**
 * Accessibility test suite — Playwright + axe-core.
 *
 * Runs the app on a dedicated port (3100) so it never collides with a dev
 * server on :3000. Uses `npm run dev:a11y` (next dev -p 3100) as the webServer;
 * swap to `npm run build && npm run start -- -p 3100` for a production-DOM run.
 */
const PORT = Number(process.env.A11Y_PORT ?? 3100)
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 180_000,
  expect: { timeout: 15_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    navigationTimeout: 120_000,
    actionTimeout: 20_000,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run dev:a11y`,
    url: baseURL,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
})
