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
};

export default withSerwist(nextConfig);
