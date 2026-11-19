import { fileURLToPath } from "node:url";

import { defineVitestConfig } from "@inabagumi/config/vitest";

export default defineVitestConfig({
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
});
