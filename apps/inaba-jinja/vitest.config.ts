import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^.+\.svg$/u,
        replacement: fileURLToPath(
          new URL("__mocks__/svg-mock.tsx", import.meta.url)
        ),
      },
    ],
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        url: "https://inaba-jinja.test",
      },
    },
    passWithNoTests: true,
    setupFiles: ["vitest.setup.ts"],
  },
});
