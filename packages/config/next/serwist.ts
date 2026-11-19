import { withSerwist as withSerwistBase } from "@serwist/turbopack";
import type { NextConfig } from "next";

type Rewrite = Extract<
  Awaited<ReturnType<NonNullable<NextConfig["rewrites"]>>>,
  unknown[]
>[number];

/**
 * Serves the service worker built by `createSerwistRoute` (`/serwist/sw.js`)
 * as `/service-worker.js`.
 */
export const serviceWorkerRewrite = {
  destination: "/serwist/sw.js",
  source: "/service-worker.js",
} satisfies Rewrite;

/**
 * Applies the settings for apps that use Serwist with Turbopack.
 *
 * In addition to `withSerwist` from `@serwist/turbopack`, this adds
 * `serviceWorkerRewrite` before the app-specific rewrites.
 */
export const withSerwist = (config: NextConfig = {}): NextConfig => {
  const { rewrites } = config;

  return withSerwistBase({
    ...config,
    async rewrites() {
      const appRewrites = (await rewrites?.()) ?? [];

      if (Array.isArray(appRewrites)) {
        return [serviceWorkerRewrite, ...appRewrites];
      }

      return {
        ...appRewrites,
        afterFiles: [serviceWorkerRewrite, ...(appRewrites.afterFiles ?? [])],
      };
    },
  });
};
