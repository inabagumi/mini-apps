// @vitest-environment node

import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { PrismaPg } from "@prisma/adapter-pg";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { PrismaClient } from "../../lib/generated/prisma/client.ts";
import { seedData } from "./data.ts";
import { seed } from "./seed.ts";
import type { SeedData } from "./seed.ts";

const databaseURL = process.env.TEST_DATABASE_URL;

if (!databaseURL && process.env.CI) {
  throw new Error("TEST_DATABASE_URL is required to run the tests in CI.");
}

const execFileAsync = promisify(execFile);
const require = createRequire(import.meta.url);

const APP_DIR = fileURLToPath(new URL("../..", import.meta.url));

// The tables in the order that they can be truncated.
const TABLES = [
  "answers",
  "questions",
  "results",
  "recommended_videos",
  "talents",
  "releases",
];

const cloneSeedData = (): SeedData => structuredClone(seedData);

// Gives the last release an invalid date so that the seed fails in the middle,
// after the other records are written. The seed data itself stays consistent,
// so it passes the validation before the transaction.
const breakSeedData = (data: SeedData): SeedData => ({
  ...data,
  releases: data.releases.map((release, index) =>
    index === data.releases.length - 1
      ? { ...release, publishedAt: new Date(Number.NaN) }
      : release
  ),
});

describe.skipIf(!databaseURL)("seed", () => {
  // Use a schema of its own so that the tests do not touch other data.
  const schema = `seed_test_${randomUUID().replaceAll("-", "")}`;
  let prisma: PrismaClient;

  const dump = async () => ({
    answers: await prisma.answer.findMany({ orderBy: { id: "asc" } }),
    questions: await prisma.question.findMany({ orderBy: { id: "asc" } }),
    recommendedVideos: await prisma.recommendedVideo.findMany({
      orderBy: { id: "asc" },
    }),
    releases: await prisma.release.findMany({ orderBy: { slug: "asc" } }),
    results: await prisma.result.findMany({ orderBy: { slug: "asc" } }),
    talents: await prisma.talent.findMany({ orderBy: { id: "asc" } }),
  });

  beforeAll(async () => {
    const url = new URL(databaseURL as string);
    url.searchParams.set("schema", schema);

    await execFileAsync(
      process.execPath,
      [require.resolve("prisma/build/index.js"), "migrate", "deploy"],
      {
        cwd: APP_DIR,
        env: {
          ...process.env,
          DATABASE_URL: url.toString(),
          DATABASE_URL_UNPOOLED: url.toString(),
        },
      }
    );

    prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: databaseURL }, { schema }),
    });
  }, 60_000);

  afterAll(async () => {
    if (!prisma) {
      return;
    }

    await prisma.$executeRawUnsafe(`DROP SCHEMA "${schema}" CASCADE`);
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.$executeRawUnsafe(
      `TRUNCATE ${TABLES.map((table) => `"${schema}"."${table}"`).join(", ")}`
    );
  });

  it("inserts the seed data into an empty database", async () => {
    await seed(prisma);

    const questions = await prisma.question.findMany({
      include: { answers: { orderBy: { id: "asc" } } },
      orderBy: { id: "asc" },
    });

    expect(
      questions.map(({ answers, id, title }) => ({
        answers: answers.map((answer) => ({
          id: answer.id,
          value: answer.value,
        })),
        id,
        title,
      }))
    ).toStrictEqual(seedData.questions);

    const talents = await prisma.talent.findMany({ orderBy: { id: "asc" } });

    expect(talents).toStrictEqual(seedData.talents);

    const results = await prisma.result.findMany({
      include: { recommendedVideo: true },
      orderBy: { slug: "asc" },
    });
    const expectedResults = new Map(
      seedData.results.map((result) => [result.slug, result])
    );

    expect(results).toHaveLength(seedData.results.length);

    for (const {
      recommendedVideo,
      recommendedVideoId,
      id,
      ...result
    } of results) {
      const { recommendedVideoUrl, ...expected } = expectedResults.get(
        result.slug
      ) as (typeof seedData.results)[number];

      expect(result).toStrictEqual(expected);
      expect(recommendedVideo.url).toBe(recommendedVideoUrl);
    }

    const releases = await prisma.release.findMany({
      omit: { id: true },
      orderBy: { slug: "asc" },
    });

    expect(releases).toStrictEqual(
      seedData.releases.toSorted((a, b) => a.slug.localeCompare(b.slug))
    );
  });

  it("does not duplicate the records when it runs again", async () => {
    await seed(prisma);
    const first = await dump();

    await seed(prisma);
    await seed(prisma);

    expect(await dump()).toStrictEqual(first);
  });

  it("reflects the changes of the seed data when it runs again", async () => {
    await seed(prisma);
    const before = await dump();

    const data = cloneSeedData();
    const [question] = data.questions;
    const [answer] = question.answers;
    const [result] = data.results.toReversed();
    const [talent] = data.talents;
    const [release] = data.releases;

    question.title = "変更された質問";
    answer.value = "変更された選択肢";
    result.catchphrase = "変更されたキャッチフレーズ";
    result.parameters = [{ label: "変更", value: 0.5 }];
    result.recommendedVideoUrl = "https://youtu.be/changed";
    talent.twitter = null;
    release.title = "Changed";

    await seed(prisma, data);
    const after = await dump();

    expect(
      await prisma.question.findUniqueOrThrow({ where: { id: question.id } })
    ).toMatchObject({ title: question.title });
    expect(
      await prisma.answer.findUniqueOrThrow({ where: { id: answer.id } })
    ).toMatchObject({ value: answer.value });
    expect(
      await prisma.result.findUniqueOrThrow({
        include: { recommendedVideo: true },
        where: { slug: result.slug },
      })
    ).toMatchObject({
      catchphrase: result.catchphrase,
      parameters: result.parameters,
      recommendedVideo: { url: result.recommendedVideoUrl },
    });
    expect(
      await prisma.talent.findUniqueOrThrow({ where: { id: talent.id } })
    ).toMatchObject({ twitter: null });
    expect(
      await prisma.release.findUniqueOrThrow({ where: { slug: release.slug } })
    ).toMatchObject({ title: release.title });

    // The records are updated in place.
    expect(after.answers).toHaveLength(before.answers.length);
    expect(after.questions).toHaveLength(before.questions.length);
    expect(after.recommendedVideos).toHaveLength(
      before.recommendedVideos.length
    );
    expect(after.releases).toHaveLength(before.releases.length);
    expect(after.results).toHaveLength(before.results.length);
    expect(after.talents).toHaveLength(before.talents.length);
  });

  it("keeps the records that are not in the seed data", async () => {
    const question = await prisma.question.create({
      data: { answers: { create: [{ value: "回答" }] }, title: "追加の質問" },
      include: { answers: true },
    });

    await seed(prisma);

    expect(
      await prisma.question.findUnique({
        include: { answers: true },
        where: { id: question.id },
      })
    ).toStrictEqual(question);
  });

  it("rejects and leaves an empty database unchanged when it fails", async () => {
    await expect(seed(prisma, breakSeedData(seedData))).rejects.toThrow();

    expect(await dump()).toStrictEqual({
      answers: [],
      questions: [],
      recommendedVideos: [],
      releases: [],
      results: [],
      talents: [],
    });
  });

  it("rejects inconsistent seed data without touching the database", async () => {
    await seed(prisma);
    const before = await dump();

    const data = cloneSeedData();
    data.questions[0].title = "変更された質問";
    data.results[1].slug = data.results[0].slug;

    await expect(seed(prisma, data)).rejects.toThrow(
      `Duplicate result slug: ${data.results[0].slug}`
    );

    expect(await dump()).toStrictEqual(before);
  });

  it("rejects and leaves a seeded database unchanged when it fails", async () => {
    await seed(prisma);
    const before = await dump();

    const data = cloneSeedData();
    data.questions[0].title = "変更された質問";

    await expect(seed(prisma, breakSeedData(data))).rejects.toThrow();

    expect(await dump()).toStrictEqual(before);
  });
});
