import { defineNextConfig } from "@inabagumi/config/next";
import { withSerwist } from "@inabagumi/config/next/serwist";

export default withSerwist(
  defineNextConfig({
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
          destination: "/manifest.webmanifest",
          source: "/manifest.json",
        },
      ];
    },
  })
);
