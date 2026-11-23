// Helpers for the tests that need a database.

import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../lib/generated/prisma/client.ts";

export const testDatabaseURL = process.env.TEST_DATABASE_URL;

if (!testDatabaseURL && process.env.CI) {
  throw new Error("TEST_DATABASE_URL is required to run the tests in CI.");
}

const execFileAsync = promisify(execFile);
const require = createRequire(import.meta.url);

const APP_DIR = fileURLToPath(new URL("..", import.meta.url));

export interface TestDatabase {
  /** Drops the schema and disconnects from the database. */
  dispose: () => Promise<void>;
  prisma: PrismaClient;
  /** Runs the Prisma CLI against the schema. */
  runPrisma: (args: string[]) => Promise<void>;
  schema: string;
}

/**
 * Connects to a schema of its own in the test database, so that the tests do
 * not touch other data. The schema is empty until migrations are applied.
 */
export const createTestDatabase = async (
  prefix: string
): Promise<TestDatabase> => {
  if (!testDatabaseURL) {
    throw new Error("TEST_DATABASE_URL is not set.");
  }

  const schema = `${prefix}_${randomUUID().replaceAll("-", "")}`;
  const url = new URL(testDatabaseURL);
  url.searchParams.set("schema", schema);

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: testDatabaseURL }, { schema }),
  });

  await prisma.$executeRawUnsafe(`CREATE SCHEMA "${schema}"`);

  const runPrisma = async (args: string[]) => {
    await execFileAsync(
      process.execPath,
      [require.resolve("prisma/build/index.js"), ...args],
      {
        cwd: APP_DIR,
        env: {
          ...process.env,
          DATABASE_URL: url.toString(),
          DATABASE_URL_UNPOOLED: url.toString(),
        },
      }
    );
  };

  const dispose = async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA "${schema}" CASCADE`);
    await prisma.$disconnect();
  };

  return { dispose, prisma, runPrisma, schema };
};
