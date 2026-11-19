/// <reference types="@testing-library/jest-dom/vitest" />

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, mergeConfig } from "vitest/config";
import type { Plugin, ViteUserConfig } from "vitest/config";

interface ImageSize {
  height: number;
  width: number;
}

// The width and height are stored in the IHDR chunk, which always comes
// first in a PNG file.
const getPngSize = (buffer: Buffer): ImageSize => ({
  height: buffer.readUInt32BE(20),
  width: buffer.readUInt32BE(16),
});

// SOF (start of frame) markers other than DHT (0xc4), JPG (0xc8) and DAC
// (0xcc).
const JPEG_SOF_MARKERS = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

// The width and height are stored in the SOF segment, so skip the segments
// before it.
const getJpegSize = (buffer: Buffer): ImageSize | null => {
  // Skip the SOI (start of image) marker.
  let offset = 2;

  while (offset + 9 <= buffer.length) {
    if (buffer.readUInt8(offset) !== 0xff) {
      return null;
    }

    const marker = buffer.readUInt8(offset + 1);

    // Skip fill bytes.
    if (marker === 0xff) {
      offset += 1;
      continue;
    }

    if (JPEG_SOF_MARKERS.has(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + buffer.readUInt16BE(offset + 2);
  }

  return null;
};

// Next.js generates a blurred image as `blurDataURL`. Use a transparent GIF
// instead so that `placeholder="blur"` can be rendered.
const BLUR_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

// Next.js turns static image imports into `StaticImageData`, but Vite turns
// them into URL strings. Mimic Next.js by reading the width and height from
// the image file.
const staticImage = (): Plugin => ({
  enforce: "pre",
  load(id) {
    if (!/\.(?:jpe?g|png)$/iu.test(id)) {
      return null;
    }

    const buffer = readFileSync(id);
    const size = /\.png$/iu.test(id) ? getPngSize(buffer) : getJpegSize(buffer);

    if (!size) {
      throw new Error(`Failed to read the size of ${id}.`);
    }

    const data = {
      blurDataURL: BLUR_DATA_URL,
      height: size.height,
      src: `/${path.basename(id)}`,
      width: size.width,
    };

    return `export default ${JSON.stringify(data)};`;
  },
  name: "static-image",
});

const sharedConfig = defineConfig({
  plugins: [react(), staticImage()],
  test: {
    environment: "jsdom",
    passWithNoTests: true,
    setupFiles: [fileURLToPath(new URL("setup.ts", import.meta.url))],
  },
});

/**
 * Creates a Vitest config with the settings shared by all packages.
 *
 * The given config is merged with the shared settings by `mergeConfig`, so
 * package-specific plugins, aliases and test options can be added without
 * losing them.
 */
export const defineVitestConfig = (
  config: ViteUserConfig = {}
): ViteUserConfig => mergeConfig(sharedConfig, config);
