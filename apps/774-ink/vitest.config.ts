import { readFileSync } from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

// Next.js turns static image imports into `StaticImageData`, but Vite turns
// them into URL strings. Mimic Next.js by reading the width and height from
// the IHDR chunk of the PNG file.
const staticImage = (): Plugin => ({
  enforce: "pre",
  load(id) {
    if (!id.endsWith(".png")) {
      return null;
    }

    const buffer = readFileSync(id);
    const data = {
      height: buffer.readUInt32BE(20),
      src: `/${path.basename(id)}`,
      width: buffer.readUInt32BE(16),
    };

    return `export default ${JSON.stringify(data)};`;
  },
  name: "static-image",
});

export default defineConfig({
  plugins: [react(), staticImage()],
  test: {
    env: {
      NEXT_PUBLIC_BASE_URL: "https://774.test",
    },
    environment: "jsdom",
  },
});
