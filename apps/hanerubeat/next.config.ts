import { defineNextConfig } from "@inabagumi/config/next";
import { withSerwist } from "@inabagumi/config/next/serwist";

export default withSerwist(
  defineNextConfig({
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
