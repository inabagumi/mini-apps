// @vitest-environment node

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { createTestDatabase, testDatabaseURL } from "../prisma/test-database";
import type { TestDatabase } from "../prisma/test-database";
import { findQuestions } from "./questions";

describe.skipIf(!testDatabaseURL)("findQuestions", () => {
  let database: TestDatabase;

  beforeAll(async () => {
    database = await createTestDatabase("questions_test");
    await database.runPrisma(["migrate", "deploy"]);
  }, 60_000);

  afterAll(async () => {
    await database?.dispose();
  });

  beforeEach(async () => {
    const tables = ["answer_scores", "answers", "questions"];

    await database.prisma.$executeRawUnsafe(
      `TRUNCATE ${tables.map((table) => `"${database.schema}"."${table}"`).join(", ")}`
    );
  });

  const createQuestion = async (
    id: string,
    position: number,
    answers: { id: string; position: number }[]
  ) => {
    await database.prisma.question.create({
      data: {
        answers: {
          create: answers.map((answer) => ({
            ...answer,
            value: `選択肢${answer.id.slice(-3)}`,
          })),
        },
        id,
        position,
        title: `質問${id.slice(-3)}`,
      },
    });
  };

  it("sorts the questions and the answers by their positions", async () => {
    // The positions are in the reverse order of the IDs.
    await createQuestion("00000000-0000-7000-8001-000000000001", 1, [
      { id: "00000000-0000-7000-8002-000000000101", position: 2 },
      { id: "00000000-0000-7000-8002-000000000102", position: 0 },
      { id: "00000000-0000-7000-8002-000000000103", position: 1 },
    ]);
    await createQuestion("00000000-0000-7000-8001-000000000002", 0, [
      { id: "00000000-0000-7000-8002-000000000201", position: 1 },
      { id: "00000000-0000-7000-8002-000000000202", position: 0 },
    ]);

    const questions = await findQuestions(database.prisma);

    expect(
      questions.map(({ answers, title }) => ({
        answers: answers.map(({ value }) => value),
        title,
      }))
    ).toStrictEqual([
      { answers: ["選択肢202", "選択肢201"], title: "質問002" },
      { answers: ["選択肢102", "選択肢103", "選択肢101"], title: "質問001" },
    ]);
  });

  it("sorts the items with the same position by their IDs", async () => {
    // Insert the items in the reverse order of the IDs so that the order of
    // the insertion does not decide the order.
    await createQuestion("00000000-0000-7000-8001-000000000003", 0, [
      { id: "00000000-0000-7000-8002-000000000302", position: 0 },
      { id: "00000000-0000-7000-8002-000000000301", position: 0 },
    ]);
    await createQuestion("00000000-0000-7000-8001-000000000002", 0, []);
    await createQuestion("00000000-0000-7000-8001-000000000001", 1, []);

    const questions = await findQuestions(database.prisma);

    expect(questions.map(({ title }) => title)).toStrictEqual([
      "質問002",
      "質問003",
      "質問001",
    ]);
    expect(questions[1].answers.map(({ value }) => value)).toStrictEqual([
      "選択肢301",
      "選択肢302",
    ]);
    expect(await findQuestions(database.prisma)).toStrictEqual(questions);
  });

  it("rejects a negative position in the database", async () => {
    await expect(
      createQuestion("00000000-0000-7000-8001-000000000001", -1, [])
    ).rejects.toThrow();
    await expect(
      createQuestion("00000000-0000-7000-8001-000000000001", 0, [
        { id: "00000000-0000-7000-8002-000000000101", position: -1 },
      ])
    ).rejects.toThrow();
  });
});
