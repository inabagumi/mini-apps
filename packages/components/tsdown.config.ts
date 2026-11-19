import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: ["src/index.ts", "src/skeleton/index.ts"],
  format: ["esm"],
  sourcemap: true,
});
