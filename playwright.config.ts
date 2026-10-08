import { defineConfig } from "@playwright/test";

export const PORT = Number(process.env.E2E_PORT ?? 3100);

/** A deployed site to check instead of starting one locally, e.g. its workers.dev URL. */
const REMOTE_URL = process.env.E2E_BASE_URL;

/** The stand-in Resend API (e2e/mock-resend.mjs) that a local site sends contact-form email to. */
export const MOCK_RESEND_URL = `http://127.0.0.1:${Number(process.env.MOCK_RESEND_PORT ?? 3199)}`;
export const MOCK_RESEND_KEY = "re_mock";

/**
 * Checks the built site. The project hub flag and the analytics token are read
 * at build time, so build and test with the same SALTANCY_PROJECT_HUB and
 * SALTANCY_WEB_ANALYTICS_TOKEN.
 */
export function siteConfig(site: { command: string; env?: Record<string, string> }) {
  return defineConfig({
    testDir: "e2e",
    timeout: 120_000,
    workers: 1,
    reporter: [["list"]],
    outputDir: "test-results",
    use: { baseURL: REMOTE_URL ?? `http://localhost:${PORT}` },
    projects: [
      {
        name: "desktop-1440",
        use: { browserName: "chromium", viewport: { width: 1440, height: 900 } },
      },
      {
        name: "phone-390",
        use: {
          browserName: "chromium",
          viewport: { width: 390, height: 844 },
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true,
        },
      },
    ],
    webServer: REMOTE_URL
      ? undefined
      : [
          {
            command: "node e2e/mock-resend.mjs",
            url: `${MOCK_RESEND_URL}/__mock`,
            reuseExistingServer: true,
          },
          {
            command: site.command,
            env: site.env,
            url: `http://localhost:${PORT}`,
            reuseExistingServer: true,
            timeout: 120_000,
          },
        ],
  });
}

/** Under `next start`: run `npm run build` first. */
export default siteConfig({
  command: `npx next start -p ${PORT}`,
  env: { RESEND_BASE_URL: MOCK_RESEND_URL, RESEND_API_KEY: MOCK_RESEND_KEY },
});
