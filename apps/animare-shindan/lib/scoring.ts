// The scoring of the diagnosis, which decides the result from the answers.
//
// This module has no dependencies on the database or the UI, so that it can
// run in the browser and be tested on its own.

/** The highest score that an answer can add to a result. */
export const MAX_SCORE = 3;

/** The lowest score that an answer can add to a result. */
export const MIN_SCORE = 0;

export interface AnswerScore {
  /** The slug of the result. */
  result: string;
  /** The score from {@link MIN_SCORE} to {@link MAX_SCORE}. */
  score: number;
}

export interface ScoredAnswer {
  scores: readonly AnswerScore[];
}

export interface ResultTally {
  /** The slug of the result. */
  result: string;
  /** The number of the answers that added {@link MAX_SCORE} to the result. */
  strongAnswers: number;
  /** The sum of the scores. */
  total: number;
}

/**
 * Sums up the scores of the answers for each of the results.
 *
 * The results that no answer has a score for get 0 points, and the scores for
 * the results that are not in `results` are ignored. The tallies are in the
 * order of `results`.
 */
export const tallyScores = (
  answers: readonly ScoredAnswer[],
  results: readonly string[]
): ResultTally[] => {
  const tallies = new Map<string, ResultTally>(
    results.map((result) => [result, { result, strongAnswers: 0, total: 0 }])
  );

  for (const { scores } of answers) {
    for (const { result, score } of scores) {
      const tally = tallies.get(result);

      if (tally) {
        tally.total += score;

        if (score === MAX_SCORE) {
          tally.strongAnswers += 1;
        }
      }
    }
  }

  return [...tallies.values()];
};

// Compares the slugs by their UTF-16 code units so that the order does not
// depend on the locale of the environment.
const compareSlugs = (a: string, b: string): number => {
  if (a < b) {
    return -1;
  }

  return a > b ? 1 : 0;
};

/**
 * Compares the tallies in the order of priority: the higher total score, the
 * more answers with {@link MAX_SCORE}, and then the slug in ascending order.
 */
export const compareTallies = (a: ResultTally, b: ResultTally): number =>
  b.total - a.total ||
  b.strongAnswers - a.strongAnswers ||
  compareSlugs(a.result, b.result);

/**
 * Decides the result of the diagnosis from the answers.
 *
 * The result is the one with the highest total score. A tie is broken by the
 * number of answers that added {@link MAX_SCORE} to the result, and then by
 * the slug in ascending order, so the same answers always lead to the same
 * result. Returns `undefined` only when `results` is empty.
 */
export const decideResult = (
  answers: readonly ScoredAnswer[],
  results: readonly string[]
): string | undefined => {
  let best: ResultTally | undefined;

  for (const tally of tallyScores(answers, results)) {
    if (!best || compareTallies(tally, best) < 0) {
      best = tally;
    }
  }

  return best?.result;
};
