import { MOCK_RESEND_KEY, MOCK_RESEND_URL, PORT, siteConfig } from "./playwright.config";

/**
 * Under workerd, the runtime Cloudflare deploys, serving the OpenNext build:
 * run `npm run cf:build` first. CI checks this build, then deploys it. The
 * Worker takes its test-only settings as Wrangler vars, which never reach the build.
 */
export default siteConfig({
  command:
    `npx opennextjs-cloudflare preview --port ${PORT}` +
    ` --var RESEND_BASE_URL:${MOCK_RESEND_URL} --var RESEND_API_KEY:${MOCK_RESEND_KEY}`,
});
