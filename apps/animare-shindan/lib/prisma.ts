import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "./generated/prisma/client";

const createPrismaClient = (): PrismaClient => {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  });

  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
