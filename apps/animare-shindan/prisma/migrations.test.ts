// @vitest-environment node

import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { findQuestions } from "../lib/questions.ts";
import { createTestDatabase, testDatabaseURL } from "./test-database.ts";
import type { TestDatabase } from "./test-database.ts";

const MIGRATIONS_DIR = fileURLToPath(new URL("migrations", import.meta.url));

const listMigrations = async (): Promise<string[]> => {
  const entries = await readdir(MIGRATIONS_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted();
};

describe.skipIf(!testDatabaseURL)("20261123130000_add_positions", () => {
  const MIGRATION = "20261123130000_add_positions";

  let database: TestDatabase;

  // Applies the migrations by hand, without recording them, so that the data
  // can be inserted between them.
  const applyMigrations = async (names: string[]) => {
    for (const name of names) {
      // oxlint-disable-next-line no-await-in-loop
      await database.runPrisma([
        "db",
        "execute",
        "--file",
        `${MIGRATIONS_DIR}/${name}/migration.sql`,
      ]);
    }
  };

  // The questions in the order of the insertion, which differs from the order
  // of the IDs.
  const QUESTIONS = [
    {
      answers: [
        "00000000-0000-7000-8002-000000000203",
        "00000000-0000-7000-8002-000000000201",
        "00000000-0000-7000-8002-000000000202",
      ],
      id: "00000000-0000-7000-8001-000000000002",
    },
    {
      answers: [
        "00000000-0000-7000-8002-000000000102",
        "00000000-0000-7000-8002-000000000101",
      ],
      id: "00000000-0000-7000-8001-000000000001",
    },
    {
      answers: [
        "00000000-0000-7000-8002-000000000301",
        "00000000-0000-7000-8002-000000000302",
      ],
      id: "00000000-0000-7000-8001-000000000003",
    },
  ];
  // An answer that belongs to no question.
  const ORPHAN_ANSWER = "00000000-0000-7000-8002-000000000001";

  beforeAll(async () => {
    database = await createTestDatabase("migrations_test");

    const migrations = await listMigrations();
    const index = migrations.indexOf(MIGRATION);

    await applyMigrations(migrations.slice(0, index));

    // The raw queries do not use the schema of the client, so the tables are
    // qualified with the schema. The generated client does not know the
    // tables without the positions either, so raw queries are used.
    const { schema } = database;

    for (const { answers, id } of QUESTIONS) {
      // oxlint-disable-next-line no-await-in-loop
      await database.prisma.$executeRawUnsafe(
        `INSERT INTO "${schema}"."questions" ("id", "title") VALUES ($1::uuid, $1)`,
        id
      );

      for (const answer of answers) {
        // oxlint-disable-next-line no-await-in-loop
        await database.prisma.$executeRawUnsafe(
          `INSERT INTO "${schema}"."answers" ("id", "question_id", "value") VALUES ($1::uuid, $2::uuid, $1)`,
          answer,
          id
        );
      }
    }

    await database.prisma.$executeRawUnsafe(
      `INSERT INTO "${schema}"."answers" ("id", "value") VALUES ($1::uuid, $1)`,
      ORPHAN_ANSWER
    );

    await applyMigrations(migrations.slice(index));
  }, 60_000);

  afterAll(async () => {
    await database?.dispose();
  });

  it("keeps the order that the questions and the answers were shown in", async () => {
    // Before the migration, the questions were shown in the descending order
    // of their IDs and the answers in the ascending order of their IDs.
    const expected = QUESTIONS.toSorted((a, b) => b.id.localeCompare(a.id)).map(
      ({ answers, id }) => ({
        answers: answers.toSorted((a, b) => a.localeCompare(b)),
        title: id,
      })
    );

    const questions = await findQuestions(database.prisma);

    expect(
      questions.map(({ answers, title }) => ({
        answers: answers.map(({ value }) => value),
        title,
      }))
    ).toStrictEqual(expected);
  });

  it("numbers the positions from 0 without ties", async () => {
    const questions = await database.prisma.question.findMany({
      orderBy: { position: "asc" },
      select: {
        answers: {
          orderBy: { position: "asc" },
          select: { position: true },
        },
        position: true,
      },
    });

    expect(questions.map(({ position }) => position)).toStrictEqual([0, 1, 2]);
    expect(
      questions.map(({ answers }) => answers.map(({ position }) => position))
    ).toStrictEqual([
      [0, 1],
      [0, 1, 2],
      [0, 1],
    ]);
    expect(
      await database.prisma.answer.findUniqueOrThrow({
        where: { id: ORPHAN_ANSWER },
      })
    ).toMatchObject({ position: 0, questionId: null });
  });
});
