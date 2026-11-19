const { withSerwist } = require("@serwist/turbopack");

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

module.exports = withSerwist(nextConfig);
