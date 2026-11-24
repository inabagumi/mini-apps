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

/** The default number of the steps that {@link canReachResult} can take. */
export const DEFAULT_REACHABILITY_SEARCH_LIMIT = 1_000_000;

interface ScoredAnswerVector {
  strongAnswers: number[];
  totals: number[];
}

const toVector = (
  answer: ScoredAnswer,
  results: readonly string[]
): ScoredAnswerVector => {
  const tallies = tallyScores([answer], results);

  return {
    strongAnswers: tallies.map((tally) => tally.strongAnswers),
    totals: tallies.map((tally) => tally.total),
  };
};

// The answers that give the same scores lead to the same results, so only one
// of them has to be tried.
const uniqueVectors = (
  vectors: readonly ScoredAnswerVector[]
): ScoredAnswerVector[] => [
  ...new Map(
    vectors.map((vector) => [
      JSON.stringify([vector.totals, vector.strongAnswers]),
      vector,
    ])
  ).values(),
];

/**
 * Whether some combination of the answers, one answer for each question,
 * leads to the result (see {@link decideResult}).
 *
 * The questions without answers are ignored, since no combination of the
 * answers can be made for them. The scores are expected to be integers from
 * {@link MIN_SCORE} to {@link MAX_SCORE}.
 *
 * The combinations are searched with pruning, so the search usually ends
 * quickly, but it can take exponential time in the number of the questions.
 * Returns `undefined` when the search takes more than `limit` steps without
 * finding the answer.
 */
export const canReachResult = (
  questions: readonly (readonly ScoredAnswer[])[],
  results: readonly string[],
  target: string,
  limit: number = DEFAULT_REACHABILITY_SEARCH_LIMIT
): boolean | undefined => {
  const slugs = [...new Set(results)];
  const targetIndex = slugs.indexOf(target);

  if (targetIndex === -1) {
    return false;
  }

  // How much the answer puts the target ahead of each result.
  const gains = (vector: ScoredAnswerVector): number[] =>
    vector.totals.map((total) => vector.totals[targetIndex] - total);

  const vectors = questions
    .filter((answers) => answers.length > 0)
    .map((answers) =>
      uniqueVectors(answers.map((answer) => toVector(answer, slugs)))
        // Try the answers that favor the target first, which finds a
        // combination that leads to the target sooner.
        .map((vector) => ({ minGain: Math.min(...gains(vector)), vector }))
        .toSorted((a, b) => b.minGain - a.minGain)
        .map(({ vector }) => vector)
    );

  // The most that the questions from each index onward can put the target
  // ahead of each result, which is used to give up on the combinations that
  // can no longer lead to the target.
  const remainingGains: number[][] = [slugs.map(() => 0)];

  for (const answers of vectors.toReversed()) {
    const [next] = remainingGains;
    const best = slugs.map((_, i) =>
      Math.max(...answers.map((vector) => gains(vector)[i]))
    );

    remainingGains.unshift(next.map((gain, i) => gain + best[i]));
  }

  const totals = slugs.map(() => 0);
  const strongAnswers = slugs.map(() => 0);
  let steps = 0;

  const isTargetChosen = (): boolean => {
    const tallies = slugs.map((result, i) => ({
      result,
      strongAnswers: strongAnswers[i],
      total: totals[i],
    }));
    const targetTally = tallies[targetIndex];

    return tallies.every(
      (tally, i) => i === targetIndex || compareTallies(targetTally, tally) < 0
    );
  };

  const canStillWin = (index: number): boolean =>
    slugs.every(
      (_, i) => totals[targetIndex] - totals[i] + remainingGains[index][i] >= 0
    );

  const search = (index: number): boolean | undefined => {
    steps += 1;

    if (steps > limit) {
      return undefined;
    }

    if (index === vectors.length) {
      return isTargetChosen();
    }

    if (!canStillWin(index)) {
      return false;
    }

    for (const vector of vectors[index]) {
      for (const [i, total] of vector.totals.entries()) {
        totals[i] += total;
        strongAnswers[i] += vector.strongAnswers[i];
      }

      const found = search(index + 1);

      for (const [i, total] of vector.totals.entries()) {
        totals[i] -= total;
        strongAnswers[i] -= vector.strongAnswers[i];
      }

      if (found !== false) {
        return found;
      }
    }

    return false;
  };

  return search(0);
};
