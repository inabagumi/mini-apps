import { withSerwist } from "@serwist/turbopack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers() {
    return [
      {
        headers: [
          {
            key: "cache-control",
            value: "max-age=600, s-maxage=60",
          },
        ],
        source: "/((?!_next).*)",
      },
      {
        headers: [
          {
            key: "cache-control",
            value: "max-age=0",
          },
        ],
        source: "/service-worker.js",
      },
    ];
  },
  rewrites() {
    return [
      {
        destination: "/serwist/sw.js",
        source: "/service-worker.js",
      },
      {
        destination: "/manifest.webmanifest",
        source: "/manifest.json",
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
      },
    },
  },
};

export default withSerwist(nextConfig);
