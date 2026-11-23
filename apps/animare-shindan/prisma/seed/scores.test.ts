// @vitest-environment node

import { describe, expect, it } from "vitest";

import { decideResult } from "../../lib/scoring.ts";
import { seedData } from "./data.ts";
import type { AnswerSeed } from "./seed.ts";

// Every combination of the answers, one answer for each question.
const combineAnswers = (questions: readonly AnswerSeed[][]): AnswerSeed[][] => {
  let combinations: AnswerSeed[][] = [[]];

  for (const answers of questions) {
    combinations = combinations.flatMap((combination) =>
      answers.map((answer) => [...combination, answer])
    );
  }

  return combinations;
};

const resultSlugs = seedData.results.map((result) => result.slug);
const combinations = combineAnswers(
  seedData.questions.map((question) => question.answers)
);

// How many combinations of the answers lead to each result.
const countResults = (): Map<string, number> => {
  const counts = new Map(resultSlugs.map((slug) => [slug, 0]));

  for (const answers of combinations) {
    const result = decideResult(answers, resultSlugs) as string;
    counts.set(result, (counts.get(result) ?? 0) + 1);
  }

  return counts;
};

describe("the scores of the seed data", () => {
  const counts = countResults();
  const uniform = combinations.length / resultSlugs.length;

  it("covers all the combinations of the answers", () => {
    let expected = 1;
    let total = 0;

    for (const question of seedData.questions) {
      expected *= question.answers.length;
    }

    for (const count of counts.values()) {
      total += count;
    }

    expect(combinations).toHaveLength(expected);
    expect(total).toBe(combinations.length);
  });

  it.each(resultSlugs)("lets %s be reached", (slug) => {
    expect(counts.get(slug)).toBeGreaterThan(0);
  });

  // With the answers chosen at random, each result should be chosen about as
  // often as the others: at least half and at most twice as often as if the
  // results were evenly distributed.
  it.each(resultSlugs)("does not choose %s too rarely or too often", (slug) => {
    const count = counts.get(slug) ?? 0;

    expect(count).toBeGreaterThanOrEqual(uniform / 2);
    expect(count).toBeLessThanOrEqual(uniform * 2);
  });

  it("gives every answer a score for at least one result", () => {
    const answers = seedData.questions.flatMap((question) => question.answers);

    expect(
      answers.filter((answer) =>
        answer.scores.every(({ score }) => score === 0)
      )
    ).toStrictEqual([]);
  });
});
