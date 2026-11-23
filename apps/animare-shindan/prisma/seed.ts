import nextEnv from "@next/env";
import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "../lib/generated/prisma/client.ts";
import { seed } from "./seed/seed.ts";

const { loadEnvConfig } = nextEnv;

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }),
});

try {
  console.log("Start seeding ...");
  await seed(prisma);
  console.log("Seeding finished.");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
