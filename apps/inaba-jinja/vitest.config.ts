import { fileURLToPath } from "node:url";

import baseConfig from "@inabagumi/config/vitest";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    resolve: {
      alias: [
        {
          find: /^.+\.svg$/u,
          replacement: fileURLToPath(
            new URL("__mocks__/svg-mock.tsx", import.meta.url)
          ),
        },
      ],
    },
    test: {
      env: {
        NEXT_PUBLIC_BASE_URL: "https://inaba-jinja.test",
      },
      environmentOptions: {
        jsdom: {
          url: "https://inaba-jinja.test",
        },
      },
    },
  })
);
