// Prepares the database for the E2E tests: creates the database again on the
// server of `TEST_DATABASE_URL`, applies the migrations and inserts the seed
// data (`prisma/seed/data.ts`), so that the tests never depend on the data of
// the production database.
//
// Playwright starts the web server before the global setup, so this runs as a
// part of the command of the web server (see `playwright.config.ts`) instead.

import { execFile } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../lib/generated/prisma/client.ts";
import { E2E_DATABASE_NAME, getE2EDatabaseURL } from "./database.ts";

const execFileAsync = promisify(execFile);
const require = createRequire(import.meta.url);

const APP_DIR = fileURLToPath(new URL("..", import.meta.url));

const databaseURL = getE2EDatabaseURL();

const recreateDatabase = async () => {
  // Connect to the database of `TEST_DATABASE_URL`, since a database cannot
  // be dropped while connected to it.
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.TEST_DATABASE_URL }),
  });

  try {
    await prisma.$executeRawUnsafe(
      `DROP DATABASE IF EXISTS "${E2E_DATABASE_NAME}" WITH (FORCE)`
    );
    await prisma.$executeRawUnsafe(`CREATE DATABASE "${E2E_DATABASE_NAME}"`);
  } finally {
    await prisma.$disconnect();
  }
};

const runPrisma = async (args: string[]) => {
  const { stderr, stdout } = await execFileAsync(
    process.execPath,
    [require.resolve("prisma/build/index.js"), ...args],
    {
      cwd: APP_DIR,
      env: {
        ...process.env,
        DATABASE_ADAPTER: "pg",
        // Override the variables in `.env.local`, if any, so that the
        // commands never touch the database for development.
        DATABASE_URL: databaseURL,
        DATABASE_URL_UNPOOLED: databaseURL,
      },
    }
  );

  process.stdout.write(stdout);
  process.stderr.write(stderr);
};

await recreateDatabase();
await runPrisma(["migrate", "deploy"]);
await runPrisma(["db", "seed"]);
