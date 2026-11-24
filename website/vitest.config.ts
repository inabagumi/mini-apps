import { defineVitestConfig } from "@inabagumi/config/vitest";

export default defineVitestConfig({
  resolve: {
    // `@hookform/error-message` provides its ES module build only through the
    // `module` field. Without it, the CommonJS build loads another instance of
    // `react-hook-form` and `useFormContext()` returns `null`.
    mainFields: ["module", "jsnext:main", "jsnext"],
  },
});
