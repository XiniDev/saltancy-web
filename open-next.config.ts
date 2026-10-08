import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Every page is prerendered at build time and nothing revalidates, so the
 * prerendered pages are served read-only from the Worker's static assets.
 * Cache interception answers those requests without starting the Next server,
 * which keeps page views well inside the Workers CPU limit.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
