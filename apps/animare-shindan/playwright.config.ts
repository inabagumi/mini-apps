import { defineConfig, devices } from "@playwright/test";

import { getE2EDatabaseURL } from "./e2e/database.ts";

// A port other than the one of `next dev` so that the tests do not reuse the
// server for development, which is connected to another database.
const PORT = 3105;
const baseURL = `http://localhost:${PORT}`;
const databaseURL = getE2EDatabaseURL();

export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  retries: process.env.CI ? 2 : 0,
  testDir: "e2e",
  use: {
    baseURL,
    // The service worker caches the pages, which would hide the changes
    // between the tests.
    serviceWorkers: "block",
    trace: "on-first-retry",
  },
  webServer: {
    // Test the production build, which prerenders the pages with the seed
    // data.
    command: `node e2e/prepare-database.ts && next build && next start --port ${PORT}`,
    env: {
      DATABASE_ADAPTER: "pg",
      // Override the variables in `.env.local`, if any, so that the server
      // never connects to the database for development.
      DATABASE_URL: databaseURL,
      DATABASE_URL_UNPOOLED: databaseURL,
    },
    reuseExistingServer: false,
    stdout: "pipe",
    timeout: 300_000,
    url: baseURL,
  },
});
