import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export default defineConfig({
  env: core.env,
  extends: [core, react, next],
  ignorePatterns: core.ignorePatterns,
  rules: {
    // The Material Icons stylesheet is loaded in the root layout of the App
    // Router, so it applies to every page.
    "nextjs/no-page-custom-font": "off",
  },
});
