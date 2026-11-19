import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import jest from "ultracite/oxlint/jest";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export default defineConfig({
  env: core.env,
  extends: [core, react, next, jest],
  ignorePatterns: [
    ...core.ignorePatterns,
    // Copied from Docusaurus as is.
    "website/src/theme/IdealImage/**",
  ],
  overrides: [
    {
      // These packages are not ES modules, so their config files must be
      // written in CommonJS.
      files: [
        "apps/774-ink/*.config.js",
        "apps/hanerubeat/*.config.js",
        "apps/neru-camera/*.config.js",
      ],
      rules: {
        "unicorn/prefer-module": "off",
      },
    },
  ],
});
