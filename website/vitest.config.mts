import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mimic the `@site` alias of Docusaurus.
      "@site": import.meta.dirname,
    },
    // `@hookform/error-message` provides its ES module build only through the
    // `module` field. Without it, the CommonJS build loads another instance of
    // `react-hook-form` and `useFormContext()` returns `null`.
    mainFields: ["module", "jsnext:main", "jsnext"],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
  },
});
