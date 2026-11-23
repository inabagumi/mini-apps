import { MAX_SCORE, MIN_SCORE } from "../../lib/scoring.ts";
import type { SeedData } from "./seed.ts";

const findDuplicates = (values: Iterable<string>): string[] => {
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

/**
 * Returns the problems of the seed data that would make the seed fail or
 * overwrite one item with another: duplicate IDs and slugs, results that refer
 * to a talent that is not in the seed data, and invalid scores of the answers.
 */
export const findSeedDataProblems = (data: SeedData): string[] => {
  const problems: string[] = [];

  const reportDuplicates = (label: string, values: Iterable<string>) => {
    for (const value of findDuplicates(values)) {
      problems.push(`Duplicate ${label}: ${value}`);
    }
  };

  reportDuplicates(
    "question ID",
    data.questions.map((question) => question.id)
  );
  reportDuplicates(
    "answer ID",
    data.questions.flatMap((question) =>
      question.answers.map((answer) => answer.id)
    )
  );
  reportDuplicates(
    "talent ID",
    data.talents.map((talent) => talent.id)
  );
  reportDuplicates(
    "result slug",
    data.results.map((result) => result.slug)
  );
  reportDuplicates(
    "release slug",
    data.releases.map((release) => release.slug)
  );

  const talentIDs = new Set(data.talents.map((talent) => talent.id));

  for (const result of data.results) {
    if (!talentIDs.has(result.talentId)) {
      problems.push(
        `Result ${result.slug} refers to a missing talent: ${result.talentId}`
      );
    }
  }

  const resultSlugs = new Set(data.results.map((result) => result.slug));

  for (const answer of data.questions.flatMap(({ answers }) => answers)) {
    for (const { result, score } of answer.scores) {
      if (!resultSlugs.has(result)) {
        problems.push(
          `Answer ${answer.id} has a score for a missing result: ${result}`
        );
      }

      if (!Number.isInteger(score) || score < MIN_SCORE || score > MAX_SCORE) {
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

/**
 * Throws an error that lists all the problems of the seed data, if any.
 */
export const validateSeedData = (data: SeedData): void => {
  const problems = findSeedDataProblems(data);

  if (problems.length > 0) {
    throw new Error(
      ["The seed data is inconsistent:", ...problems].join("\n- ")
    );
  }
};
