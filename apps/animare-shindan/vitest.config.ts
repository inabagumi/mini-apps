import { defineVitestConfig } from "@inabagumi/config/vitest";

export default defineVitestConfig({
  resolve: {
    tsconfigPaths: true,
  },
});
