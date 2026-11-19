import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import jest from "ultracite/oxlint/jest";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export default defineConfig({
  env: core.env,
  extends: [core, react, next, jest],
  ignorePatterns: core.ignorePatterns,
});
