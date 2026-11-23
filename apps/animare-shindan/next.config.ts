import { withSerwist } from "@serwist/turbopack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Keep serving the service worker from `/sw.js` so that clients that
  // registered the old next-pwa worker pick up the new one on update.
  rewrites() {
    return Promise.resolve([
      {
        destination: "/serwist/sw.js",
        source: "/sw.js",
      },
    ]);
  },
};

export default withSerwist(nextConfig);
