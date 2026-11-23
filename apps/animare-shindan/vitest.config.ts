import { defineVitestConfig } from "@inabagumi/config/vitest";

export default defineVitestConfig({
  resolve: {
    // The same alias as `paths` in tsconfig.json.
    alias: {
      "@/": `${import.meta.dirname}/`,
    },
  },
});
