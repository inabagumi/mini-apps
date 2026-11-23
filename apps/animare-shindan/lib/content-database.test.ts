// @vitest-environment node

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { seedData } from "../prisma/seed/data";
import { seed } from "../prisma/seed/seed";
import { createTestDatabase, testDatabaseURL } from "../prisma/test-database";
import type { TestDatabase } from "../prisma/test-database";
import { findContentProblems } from "./content";
import { findContent } from "./content-database";

// The tables in the order that they can be truncated.
const TABLES = [
  "answer_scores",
  "answers",
  "questions",
  "results",
  "recommended_videos",
  "talents",
  "releases",
];

describe.skipIf(!testDatabaseURL)("findContent", () => {
  let database: TestDatabase;

  beforeAll(async () => {
    database = await createTestDatabase("content_test");
    await database.runPrisma(["migrate", "deploy"]);
  }, 60_000);

  afterAll(async () => {
    await database?.dispose();
  });

  beforeEach(async () => {
    await database.prisma.$executeRawUnsafe(
      `TRUNCATE ${TABLES.map((table) => `"${database.schema}"."${table}"`).join(", ")}`
    );
    await seed(database.prisma);
  });

  it("reads the content in the same shape as the seed data", async () => {
    const content = await findContent(database.prisma);

    expect(content).toStrictEqual({
      questions: seedData.questions.map(({ answers, id, title }) => ({
        answers: answers.map((answer) => ({
          ...answer,
          scores: answer.scores.toSorted((a, b) =>
            a.result.localeCompare(b.result)
          ),
        })),
        id,
        title,
      })),
      results: seedData.results.toSorted((a, b) =>
        a.slug.localeCompare(b.slug)
      ),
      talents: seedData.talents
        .map(({ id, name }) => ({ id, name }))
        .toSorted((a, b) => a.id.localeCompare(b.id)),
    });
    expect(findContentProblems(content)).toStrictEqual([]);
  });

  it("reports the problems of the content in the database", async () => {
    const [result] = seedData.results;

    await database.prisma.question.create({
      data: {
        id: "00000000-0000-7000-8001-ffffffffffff",
        position: 99,
        title: "回答できない質問",
      },
    });
    await database.prisma.recommendedVideo.updateMany({
      data: { url: "https://example.com/" },
      where: { Result: { some: { slug: result.slug } } },
    });

    expect(
      findContentProblems(await findContent(database.prisma))
    ).toStrictEqual([
      "Question 00000000-0000-7000-8001-ffffffffffff has no answers",
      `Result ${result.slug} has an invalid recommended video URL: https://example.com/`,
    ]);
  });

  it("leaves out the answers that do not belong to a question", async () => {
    await database.prisma.answer.create({
      data: {
        id: "00000000-0000-7000-8002-ffffffffffff",
        position: 0,
        value: "",
      },
    });

    const content = await findContent(database.prisma);

    expect(
      content.questions.flatMap((question) =>
        question.answers.map((answer) => answer.id)
      )
    ).not.toContain("00000000-0000-7000-8002-ffffffffffff");
    expect(findContentProblems(content)).toStrictEqual([]);
  });
});
