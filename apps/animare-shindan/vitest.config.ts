import { defineVitestConfig } from "@inabagumi/config/vitest";
import { configDefaults } from "vitest/config";

export default defineVitestConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    // The E2E tests are run by Playwright (see `playwright.config.ts`).
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
});
