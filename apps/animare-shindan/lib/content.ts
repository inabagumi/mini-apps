// The validation of the content of the diagnosis: the questions, the answers,
// the results and the talents.
//
// The content is validated in the same way wherever it comes from, such as the
// seed data (`prisma/seed/validate.ts`) and the database
// (`lib/content-database.ts`), so that inconsistent content is found before it
// breaks the diagnosis.
//
// This module has no dependencies on the database or the UI, so that it can
// be tested on its own.

import { findParameterProblems } from "./parameters.ts";
import {
  MAX_SCORE,
  MIN_SCORE,
  canReachResult,
  DEFAULT_REACHABILITY_SEARCH_LIMIT,
} from "./scoring.ts";
import type { AnswerScore } from "./scoring.ts";
import { parseYouTubeVideoID } from "./youtube.ts";

export interface ContentAnswer {
  id: string;
  /** The scores that the answer adds to the results. */
  scores: readonly AnswerScore[];
  value: string;
}

export interface ContentQuestion {
  /** The answers in the order that they are shown. */
  answers: readonly ContentAnswer[];
  id: string;
  title: string;
}

export interface ContentResult {
  attribute: string;
  catchphrase: string;
  /** The JSON of the parameters (see `lib/parameters.ts`). */
  parameters: unknown;
  recommendedVideoUrl: string;
  slug: string;
  talentId: string;
  type: string;
}

export interface ContentTalent {
  id: string;
  name: string;
}

export interface Content {
  /** The questions in the order that they are shown. */
  questions: readonly ContentQuestion[];
  results: readonly ContentResult[];
  talents: readonly ContentTalent[];
}

export interface ContentValidationOptions {
  /**
   * The number of the steps that the search for the combinations of the
   * answers can take for each result (see `canReachResult`).
   */
  reachabilitySearchLimit?: number;
}

/**
 * The slug of a result is a part of the URL of the result page and the name
 * of its image, so it consists of URL-safe characters only.
 */
const SLUG_PATTERN = /^[\w-]+$/u;

const isBlank = (value: string): boolean => value.trim() === "";

const isValidScore = (score: number): boolean =>
  Number.isInteger(score) && score >= MIN_SCORE && score <= MAX_SCORE;

export const findDuplicates = (values: Iterable<string>): string[] => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates];
};

const findDuplicateProblems = (content: Content): string[] => {
  const problems: string[] = [];

  const reportDuplicates = (label: string, values: Iterable<string>) => {
    for (const value of findDuplicates(values)) {
      problems.push(`Duplicate ${label}: ${value}`);
    }
  };

  reportDuplicates(
    "question ID",
    content.questions.map((question) => question.id)
  );
  reportDuplicates(
    "answer ID",
    content.questions.flatMap((question) =>
      question.answers.map((answer) => answer.id)
    )
  );
  reportDuplicates(
    "talent ID",
    content.talents.map((talent) => talent.id)
  );
  reportDuplicates(
    "result slug",
    content.results.map((result) => result.slug)
  );

  return problems;
};

const findQuestionProblems = (content: Content): string[] => {
  const problems: string[] = [];

  if (content.questions.length === 0) {
    problems.push("There are no questions");
  }

  for (const question of content.questions) {
    if (isBlank(question.title)) {
      problems.push(`Question ${question.id} has an empty title`);
    }

    // A question without answers cannot be answered, which stops the
    // diagnosis at the question.
    if (question.answers.length === 0) {
      problems.push(`Question ${question.id} has no answers`);
    }

    for (const answer of question.answers) {
      if (isBlank(answer.value)) {
        problems.push(`Answer ${answer.id} has an empty value`);
      }
    }
  }

  return problems;
};

const REQUIRED_RESULT_FIELDS = ["attribute", "catchphrase", "type"] as const;

const findResultProblems = (content: Content): string[] => {
  const problems: string[] = [];
  const talentIDs = new Set(content.talents.map((talent) => talent.id));

  if (content.results.length === 0) {
    problems.push("There are no results");
  }

  for (const [index, result] of content.results.entries()) {
    if (!SLUG_PATTERN.test(result.slug)) {
      problems.push(
        `Result ${index} has an invalid slug: ${JSON.stringify(result.slug)}`
      );
    }

    for (const field of REQUIRED_RESULT_FIELDS) {
      if (isBlank(result[field])) {
        problems.push(`Result ${result.slug} has an empty ${field}`);
      }
    }

    if (!talentIDs.has(result.talentId)) {
      problems.push(
        `Result ${result.slug} refers to a missing talent: ${result.talentId}`
      );
    }

    // A video URL that is not supported is not embedded in the result page.
    if (parseYouTubeVideoID(result.recommendedVideoUrl) === null) {
      problems.push(
        `Result ${result.slug} has an invalid recommended video URL: ${result.recommendedVideoUrl}`
      );
    }

    for (const problem of findParameterProblems(result.parameters)) {
      problems.push(`Result ${result.slug}: ${problem}`);
    }
  }

  return problems;
};

const findTalentProblems = (content: Content): string[] =>
  content.talents
    .filter((talent) => isBlank(talent.name))
    .map((talent) => `Talent ${talent.id} has an empty name`);

const findScoreProblems = (content: Content): string[] => {
  const problems: string[] = [];
  const resultSlugs = new Set(content.results.map((result) => result.slug));

  for (const answer of content.questions.flatMap(({ answers }) => answers)) {
    for (const { result, score } of answer.scores) {
      if (!resultSlugs.has(result)) {
        problems.push(
          `Answer ${answer.id} has a score for a missing result: ${result}`
        );
      }

      if (!isValidScore(score)) {
        problems.push(
          `Answer ${answer.id} has an invalid score for ${result}: ${score}`
        );
      }
    }

    for (const result of findDuplicates(
      answer.scores.map((score) => score.result)
    )) {
      problems.push(`Answer ${answer.id} has duplicate scores for ${result}`);
    }
  }

  return problems;
};

const findReachabilityProblems = (
  content: Content,
  limit: number
): string[] => {
  const answers = content.questions.flatMap((question) => question.answers);

  // The results cannot be decided correctly from invalid scores, so they are
  // checked after the scores are fixed.
  if (
    answers.some((answer) =>
      answer.scores.some(({ score }) => !isValidScore(score))
    )
  ) {
    return [];
  }

  const questions = content.questions.map((question) => question.answers);
  const slugs = [...new Set(content.results.map((result) => result.slug))];
  const problems: string[] = [];

  for (const slug of slugs) {
    const reachable = canReachResult(questions, slugs, slug, limit);

    if (reachable === false) {
      problems.push(
        `Result ${slug} cannot be reached with any combination of the answers`
      );
    } else if (reachable === undefined) {
      problems.push(
        `Result ${slug} could not be checked to be reachable within ${limit} steps`
      );
    }
  }

  return problems;
};

/**
 * Returns the problems of the content that would break the diagnosis or its
 * results, each of which names the record and the cause:
 *
 * - Duplicate IDs of the questions, the answers and the talents, and duplicate
 *   slugs of the results.
 * - No questions or no results, questions without answers, and empty titles
 *   of the questions and values of the answers.
 * - Invalid slugs, empty required fields, missing talents, invalid
 *   recommended video URLs and invalid parameters of the results.
 * - Empty names of the talents.
 * - Scores out of range, for missing results, or for the same result twice.
 * - Results that no combination of the answers leads to.
 */
export const findContentProblems = (
  content: Content,
  {
    reachabilitySearchLimit = DEFAULT_REACHABILITY_SEARCH_LIMIT,
  }: ContentValidationOptions = {}
): string[] => [
  ...findDuplicateProblems(content),
  ...findQuestionProblems(content),
  ...findResultProblems(content),
  ...findTalentProblems(content),
  ...findScoreProblems(content),
  ...findReachabilityProblems(content, reachabilitySearchLimit),
];
