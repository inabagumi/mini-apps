// @vitest-environment node

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { afterEach, describe, expect, it, vi } from "vitest";

import { createPrismaAdapter, getDatabaseAdapter } from "./prisma-adapter";

const CONNECTION_STRING = "postgres://user:password@localhost:5432/database";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getDatabaseAdapter", () => {
  it.each([undefined, "", "neon"])("returns neon for %o", (value) => {
    expect(getDatabaseAdapter(value)).toBe("neon");
  });

  it("returns pg for pg", () => {
    expect(getDatabaseAdapter("pg")).toBe("pg");
  });

  it("rejects an unknown adapter", () => {
    expect(() => getDatabaseAdapter("mysql")).toThrow(
      'DATABASE_ADAPTER must be "neon" or "pg", but got "mysql".'
    );
  });

  it("reads DATABASE_ADAPTER by default", () => {
    vi.stubEnv("DATABASE_ADAPTER", "pg");

    expect(getDatabaseAdapter()).toBe("pg");
  });
});

describe("createPrismaAdapter", () => {
  it("uses Neon when DATABASE_ADAPTER is not set", () => {
    vi.stubEnv("DATABASE_ADAPTER", undefined);

    expect(createPrismaAdapter(CONNECTION_STRING)).toBeInstanceOf(PrismaNeon);
  });

  it("uses node-postgres when DATABASE_ADAPTER is pg", () => {
    vi.stubEnv("DATABASE_ADAPTER", "pg");

    expect(createPrismaAdapter(CONNECTION_STRING)).toBeInstanceOf(PrismaPg);
  });
});
