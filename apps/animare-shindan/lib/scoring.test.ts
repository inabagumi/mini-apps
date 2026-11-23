import { describe, expect, it } from "vitest";

import { compareTallies, decideResult, tallyScores } from "./scoring";
import type { ScoredAnswer } from "./scoring";

const RESULTS = ["a", "b", "c"];

const answer = (scores: Record<string, number>): ScoredAnswer => ({
  scores: Object.entries(scores).map(([result, score]) => ({ result, score })),
});

describe("tallyScores", () => {
  it("sums up the scores and counts the answers with 3 points", () => {
    expect(
      tallyScores(
        [answer({ a: 3, b: 1 }), answer({ a: 2, c: 3 }), answer({ a: 3 })],
        RESULTS
      )
    ).toStrictEqual([
      { result: "a", strongAnswers: 2, total: 8 },
      { result: "b", strongAnswers: 0, total: 1 },
      { result: "c", strongAnswers: 1, total: 3 },
    ]);
  });

  it("gives 0 points to the results without scores", () => {
    expect(tallyScores([answer({ b: 2 })], RESULTS)).toStrictEqual([
      { result: "a", strongAnswers: 0, total: 0 },
      { result: "b", strongAnswers: 0, total: 2 },
      { result: "c", strongAnswers: 0, total: 0 },
    ]);
  });

  it("ignores the scores for unknown results", () => {
    expect(tallyScores([answer({ a: 1, z: 3 })], RESULTS)).toStrictEqual([
      { result: "a", strongAnswers: 0, total: 1 },
      { result: "b", strongAnswers: 0, total: 0 },
      { result: "c", strongAnswers: 0, total: 0 },
    ]);
  });
});

describe("compareTallies", () => {
  it("orders by the total, the answers with 3 points and then the slug", () => {
    const tallies = [
      { result: "d", strongAnswers: 0, total: 5 },
      { result: "c", strongAnswers: 1, total: 5 },
      { result: "b", strongAnswers: 0, total: 6 },
      { result: "a", strongAnswers: 0, total: 5 },
    ];

    expect(
      tallies.toSorted(compareTallies).map(({ result }) => result)
    ).toStrictEqual(["b", "c", "a", "d"]);
  });
});

describe("decideResult", () => {
  it("chooses the result with the highest total score", () => {
    expect(
      decideResult([answer({ a: 1, b: 2 }), answer({ b: 1, c: 2 })], RESULTS)
    ).toBe("b");
  });

  it("breaks a tie by the number of answers with 3 points", () => {
    // a: 2 + 2 = 4 (no 3 points), c: 3 + 1 = 4 (one 3 points)
    expect(
      decideResult([answer({ a: 2, c: 3 }), answer({ a: 2, c: 1 })], RESULTS)
    ).toBe("c");
  });

  it("breaks a tie by the slug in ascending order", () => {
    expect(
      decideResult([answer({ b: 3, c: 3 }), answer({ b: 1, c: 1 })], RESULTS)
    ).toBe("b");
  });

  it("compares the slugs by code units regardless of the locale", () => {
    // "Z" (U+005A) comes before "a" (U+0061) by code units, while most
    // locales put "a" first.
    expect(decideResult([], ["a", "Z"])).toBe("Z");
  });

  it("does not depend on the order of the answers and the results", () => {
    const answers = [answer({ a: 3 }), answer({ c: 3 }), answer({ b: 1 })];

    expect(decideResult(answers, RESULTS)).toBe("a");
    expect(decideResult(answers.toReversed(), RESULTS.toReversed())).toBe("a");
  });

  it("chooses the first slug when no answer has a score", () => {
    expect(decideResult([], ["c", "b", "a"])).toBe("a");
    expect(decideResult([answer({})], ["c", "b", "a"])).toBe("a");
  });

  it("returns undefined when there are no results", () => {
    expect(decideResult([answer({ a: 3 })], [])).toBeUndefined();
  });
});
