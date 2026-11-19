import { defineConfig } from "oxfmt";

import root from "../../oxfmt.config.ts";

export default defineConfig({
  ...root,
  sortTailwindcss: {
    ...root.sortTailwindcss,
    stylesheet: "./src/app/globals.css",
  },
});
