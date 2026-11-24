// Validates the content of the diagnosis in the database of `DATABASE_URL`
// (see `lib/content.ts`) and exits with an error if it has problems.

import nextEnv from "@next/env";

import { findContent } from "../lib/content-database.ts";
import { findContentProblems } from "../lib/content.ts";
import { PrismaClient } from "../lib/generated/prisma/client.ts";
import { createPrismaAdapter } from "../lib/prisma-adapter.ts";

const { loadEnvConfig } = nextEnv;

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const prisma = new PrismaClient({ adapter: createPrismaAdapter() });

try {
  const problems = findContentProblems(await findContent(prisma));

  if (problems.length > 0) {
    console.error(["The content is inconsistent:", ...problems].join("\n- "));
    process.exitCode = 1;
  } else {
    console.log("The content has no problems.");
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
