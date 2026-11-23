import { describe, expect, it } from "vitest";

import { findContentProblems, findDuplicates } from "./content";
import type { Content, ContentResult } from "./content";

const result = (slug: string, talentId: string): ContentResult => ({
  attribute: `属性${slug}`,
  catchphrase: `キャッチフレーズ${slug}`,
  parameters: [
    { label: "パラメーター1", value: 1.05 },
    { label: "パラメーター2", value: 0.5 },
  ],
  recommendedVideoUrl: "https://youtu.be/testVideo0A",
  slug,
  talentId,
  type: `タイプ${slug}`,
});

// Each of the results a and b can be reached by choosing its answers.
const createContent = () => ({
  questions: [
    {
      answers: [
        {
          id: "answer-1-1",
          scores: [
            { result: "a", score: 3 },
            { result: "b", score: 1 },
          ],
          value: "選択肢1-1",
        },
        {
          id: "answer-1-2",
          scores: [{ result: "b", score: 3 }],
          value: "選択肢1-2",
        },
      ],
      id: "question-1",
      title: "質問1",
    },
    {
      answers: [
        {
          id: "answer-2-1",
          scores: [{ result: "a", score: 2 }],
          value: "選択肢2-1",
        },
        {
          id: "answer-2-2",
          scores: [{ result: "b", score: 2 }],
          value: "選択肢2-2",
        },
      ],
      id: "question-2",
      title: "質問2",
    },
  ],
  results: [result("a", "talent-1"), result("b", "talent-2")],
  talents: [
    { id: "talent-1", name: "タレント1" },
    { id: "talent-2", name: "タレント2" },
  ],
});

describe("findDuplicates", () => {
  it("returns each duplicate value once in the order of appearance", () => {
    expect(findDuplicates(["b", "a", "b", "c", "a", "b"])).toStrictEqual([
      "b",
      "a",
    ]);
  });
});

describe("findContentProblems", () => {
  it("reports no problems for consistent content", () => {
    expect(findContentProblems(createContent())).toStrictEqual([]);
  });

  it("reports content without questions and results", () => {
    expect(
      findContentProblems({ questions: [], results: [], talents: [] })
    ).toStrictEqual(["There are no questions", "There are no results"]);
  });

  it("reports duplicate IDs and slugs", () => {
    const content = createContent();
    const [question] = content.questions;
    content.questions.push({ ...question, answers: [] });
    content.talents.push({ ...content.talents[0] });
    content.results.push({ ...content.results[0] });

    expect(findContentProblems(content)).toStrictEqual([
      "Duplicate question ID: question-1",
      "Duplicate talent ID: talent-1",
      "Duplicate result slug: a",
      "Question question-1 has no answers",
    ]);
  });

  it("reports duplicate answer IDs across the questions", () => {
    const content = createContent();
    content.questions[1].answers[0].id = "answer-1-1";

    expect(findContentProblems(content)).toStrictEqual([
      "Duplicate answer ID: answer-1-1",
    ]);
  });

  it("reports questions that cannot be answered", () => {
    const content = createContent();
    content.questions.push({ answers: [], id: "question-3", title: "質問3" });

    expect(findContentProblems(content)).toStrictEqual([
      "Question question-3 has no answers",
    ]);
  });

  it("reports empty titles of the questions and values of the answers", () => {
    const content = createContent();
    content.questions[0].title = " ";
    content.questions[1].answers[1].value = "";

    expect(findContentProblems(content)).toStrictEqual([
      "Question question-1 has an empty title",
      "Answer answer-2-2 has an empty value",
    ]);
  });

  it.each(["", "a b", "a/b", "結果"])(
    "reports an invalid slug of a result: %j",
    (slug) => {
      const content: Content = {
        ...createContent(),
        results: [...createContent().results, result(slug, "talent-1")],
      };

      expect(findContentProblems(content)).toStrictEqual([
        `Result 2 has an invalid slug: ${JSON.stringify(slug)}`,
        `Result ${slug} cannot be reached with any combination of the answers`,
      ]);
    }
  );

  it("reports empty required fields of a result", () => {
    const content = createContent();
    Object.assign(content.results[0], {
      attribute: "",
      catchphrase: " ",
      type: "\n",
    });

    expect(findContentProblems(content)).toStrictEqual([
      "Result a has an empty attribute",
      "Result a has an empty catchphrase",
      "Result a has an empty type",
    ]);
  });

  it("reports results that refer to a missing talent", () => {
    const content = createContent();
    content.results[0].talentId = "missing";

    expect(findContentProblems(content)).toStrictEqual([
      "Result a refers to a missing talent: missing",
    ]);
  });

  it.each([
    "",
    "not a URL",
    "https://example.com/watch?v=testVideo0A",
    "https://www.youtube.com/watch?v=short",
    "https://www.youtube.com/channel/UCtestTalentA",
  ])("reports an invalid recommended video URL: %j", (url) => {
    const content = createContent();
    content.results[0].recommendedVideoUrl = url;

    expect(findContentProblems(content)).toStrictEqual([
      `Result a has an invalid recommended video URL: ${url}`,
    ]);
  });

  it("reports invalid parameters of a result", () => {
    const content = createContent();
    content.results[0].parameters = [
      { label: "", value: 0.5 },
      { label: "重複", value: 2 },
      { label: "重複", value: 0.5 },
    ];
    content.results[1].parameters = { label: "パラメーター1", value: 1 };

    expect(findContentProblems(content)).toStrictEqual([
      "Result a: Parameter 0 has an invalid label",
      "Result a: Parameter 1 has an invalid value: 2",
      "Result a: Parameter 2 has a duplicate label: 重複",
      "Result b: The parameters are not an array",
    ]);
  });

  it("reports empty names of the talents", () => {
    const content = createContent();
    content.talents[1].name = "";

    expect(findContentProblems(content)).toStrictEqual([
      "Talent talent-2 has an empty name",
    ]);
  });

  it("reports scores for a missing result", () => {
    const content = createContent();
    content.questions[0].answers[0].scores[1].result = "missing";

    expect(findContentProblems(content)).toStrictEqual([
      "Answer answer-1-1 has a score for a missing result: missing",
    ]);
  });

  it("reports duplicate scores of an answer for the same result", () => {
    const content = createContent();
    content.questions[0].answers[0].scores[1].result = "a";

    expect(findContentProblems(content)).toStrictEqual([
      "Answer answer-1-1 has duplicate scores for a",
    ]);
  });

  // The results cannot be decided from invalid scores, so whether they can be
  // reached is not reported until the scores are fixed.
  it.each([-1, 4, 1.5, Number.NaN])("reports an invalid score: %d", (score) => {
    const content = createContent();
    content.questions[0].answers[1].scores[0].score = score;

    expect(findContentProblems(content)).toStrictEqual([
      `Answer answer-1-2 has an invalid score for b: ${score}`,
    ]);
  });

  it("reports results that no combination of the answers leads to", () => {
    const content = createContent();
    content.results.push(result("c", "talent-2"));
    // c gets 3 points from the first question, but b always gets more.
    content.questions[0].answers[1].scores = [
      { result: "b", score: 3 },
      { result: "c", score: 3 },
    ];
    content.questions[1].answers[1].scores = [
      { result: "b", score: 2 },
      { result: "c", score: 1 },
    ];

    expect(findContentProblems(content)).toStrictEqual([
      "Result c cannot be reached with any combination of the answers",
    ]);
  });

  it("reports results that could not be checked within the limit", () => {
    expect(
      findContentProblems(createContent(), { reachabilitySearchLimit: 1 })
    ).toStrictEqual([
      "Result a could not be checked to be reachable within 1 steps",
      "Result b could not be checked to be reachable within 1 steps",
    ]);
  });
});
