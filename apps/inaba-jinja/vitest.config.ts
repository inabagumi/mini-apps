import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

// Next.js turns static image imports into `StaticImageData`, but Vite turns
// them into URL strings. Mimic Next.js so that `next/image` can be rendered.
const staticImage = (): Plugin => ({
  enforce: "pre",
  load(id) {
    if (!/\.(?:jpe?g|png)$/u.test(id)) {
      return null;
    }

    const data = {
      blurDataURL:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      height: 630,
      src: `/${path.basename(id)}`,
      width: 1200,
    };

    return `export default ${JSON.stringify(data)};`;
  },
  name: "static-image",
});

export default defineConfig({
  plugins: [react(), staticImage()],
  resolve: {
    alias: [
      {
        find: /^.+\.svg$/u,
        replacement: fileURLToPath(
          new URL("__mocks__/svg-mock.tsx", import.meta.url)
        ),
      },
    ],
  },
  test: {
    env: {
      NEXT_PUBLIC_BASE_URL: "https://inaba-jinja.test",
    },
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        url: "https://inaba-jinja.test",
      },
    },
    passWithNoTests: true,
    setupFiles: ["vitest.setup.ts"],
  },
});
