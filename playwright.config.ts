import { defineConfig, devices } from "@playwright/test";

const STATIC_PORT = 4610;
const DEV_PORT = 4331;

/**
 * Two targets:
 * - "static": the production build served with Vercel's per-route headers (real CSP).
 *   Requires `npm run build` first.
 * - "dev": `astro dev`, for the contact action (on-demand; no CSP in dev mode).
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    ...devices["Desktop Chrome"],
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "static",
      testMatch: /pages\.spec\.ts/,
      use: { baseURL: `http://localhost:${STATIC_PORT}` },
    },
    {
      name: "dev",
      testMatch: /contact\.spec\.ts/,
      use: { baseURL: `http://localhost:${DEV_PORT}` },
    },
  ],
  webServer: [
    {
      command: `node tests/support/serve-static.mjs ${STATIC_PORT}`,
      url: `http://localhost:${STATIC_PORT}/es/`,
      reuseExistingServer: !process.env.CI,
    },
    {
      // Dummy credentials: validation runs before sending, and the tests only reach the
      // handler through the honeypot path, which never calls Resend.
      command: `astro dev --port ${DEV_PORT} --ignore-lock`,
      url: `http://localhost:${DEV_PORT}/es/contacto/`,
      env: { RESEND_API_KEY: "re_test_dummy", CONTACT_TO_EMAIL: "test@example.com" },
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
