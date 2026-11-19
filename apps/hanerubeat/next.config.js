import { withSerwist } from "@serwist/turbopack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      {
        destination: "/serwist/sw.js",
        source: "/service-worker.js",
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
