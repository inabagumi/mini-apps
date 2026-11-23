// @vitest-environment node

import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { seedData } from "./data.ts";
import type { SeedData } from "./seed.ts";
import { findSeedDataProblems, validateSeedData } from "./validate.ts";

const RESULT_IMAGES_DIR = fileURLToPath(
  new URL("../../public/images/results", import.meta.url)
);

const cloneSeedData = (): SeedData => structuredClone(seedData);

describe("seedData", () => {
  it("has no problems", () => {
    expect(findSeedDataProblems(seedData)).toStrictEqual([]);
  });

  // The result page uses `/images/results/${slug}.png` as its image, and each
  // image is named after the slug of a published result.
  it("has a result for each result image and vice versa", async () => {
    const files = await readdir(RESULT_IMAGES_DIR);
    const imageSlugs = files
      .filter((file) => file.endsWith(".png"))
      .map((file) => file.slice(0, -".png".length));

    expect(
      seedData.results.map((result) => result.slug).toSorted()
    ).toStrictEqual(imageSlugs.toSorted());
  });
});

describe("findSeedDataProblems", () => {
  it("reports duplicate question IDs", () => {
    const data = cloneSeedData();
    data.questions[1].id = data.questions[0].id;

    expect(findSeedDataProblems(data)).toStrictEqual([
      `Duplicate question ID: ${data.questions[0].id}`,
    ]);
  });

  it("reports duplicate answer IDs across the questions", () => {
    const data = cloneSeedData();
    data.questions[1].answers[0].id = data.questions[0].answers[0].id;

    expect(findSeedDataProblems(data)).toStrictEqual([
      `Duplicate answer ID: ${data.questions[0].answers[0].id}`,
    ]);
  });

  it("reports duplicate talent IDs", () => {
    const data = cloneSeedData();
    data.talents.push({ ...data.talents[0], name: "重複したタレント" });

    expect(findSeedDataProblems(data)).toStrictEqual([
      `Duplicate talent ID: ${data.talents[0].id}`,
    ]);
  });

  it("reports duplicate result slugs once for each slug", () => {
    const data = cloneSeedData();
    const [first] = data.results;
    const { slug } = first;
    // Add copies instead of renaming the other results, whose slugs the scores
    // of the answers refer to.
    data.results.push(
      { ...first, catchphrase: "重複した診断結果" },
      { ...first, catchphrase: "もう1つの重複した診断結果" }
    );

    expect(findSeedDataProblems(data)).toStrictEqual([
      `Duplicate result slug: ${slug}`,
    ]);
  });

  it("reports duplicate release slugs", () => {
    const data = cloneSeedData();
    data.releases[1].slug = data.releases[0].slug;

    expect(findSeedDataProblems(data)).toStrictEqual([
      `Duplicate release slug: ${data.releases[0].slug}`,
    ]);
  });

  it("reports results that refer to a missing talent", () => {
    const data = cloneSeedData();
    const [result] = data.results;
    result.talentId = "00000000-0000-7000-8003-ffffffffffff";

    expect(findSeedDataProblems(data)).toStrictEqual([
      `Result ${result.slug} refers to a missing talent: ${result.talentId}`,
    ]);
  });

  it("reports scores for a missing result", () => {
    const data = cloneSeedData();
    const [answer] = data.questions[0].answers;
    answer.scores[0].result = "missing";

    expect(findSeedDataProblems(data)).toStrictEqual([
      `Answer ${answer.id} has a score for a missing result: missing`,
    ]);
  });

  it.each([-1, 4, 1.5, Number.NaN])("reports an invalid score: %d", (score) => {
    const data = cloneSeedData();
    const [answer] = data.questions[0].answers;
    answer.scores[0].score = score;

    expect(findSeedDataProblems(data)).toStrictEqual([
      `Answer ${answer.id} has an invalid score for ${answer.scores[0].result}: ${score}`,
    ]);
  });

  it("reports duplicate scores of an answer for the same result", () => {
    const data = cloneSeedData();
    const [answer] = data.questions[0].answers;
    answer.scores[1].result = answer.scores[0].result;

    expect(findSeedDataProblems(data)).toStrictEqual([
      `Answer ${answer.id} has duplicate scores for ${answer.scores[0].result}`,
    ]);
  });
});

describe("validateSeedData", () => {
  it("does not throw for consistent seed data", () => {
    expect(() => validateSeedData(seedData)).not.toThrow();
  });

  it("throws an error that lists all the problems", () => {
    const data = cloneSeedData();
    data.results[1].slug = data.results[0].slug;
    data.releases[1].slug = data.releases[0].slug;

    expect(() => validateSeedData(data)).toThrow(
      [
        "The seed data is inconsistent:",
        `Duplicate result slug: ${data.results[0].slug}`,
        `Duplicate release slug: ${data.releases[0].slug}`,
      ].join("\n- ")
    );
  });
});
