// The questions of the diagnosis and the order that they are shown in.
//
// This module does not use the cache of Next.js, so that the query can be
// tested against a database on its own (see `lib/analysis.ts` for the cached
// version).

import type { PrismaClient } from "./generated/prisma/client";
import type { AnswerScore } from "./scoring";

export interface Answer {
  id: string;
  /** The scores that the answer adds to the results. */
  scores: AnswerScore[];
  value: string;
}

export interface Question {
  answers: Answer[];
  title: string;
}

// The items are shown in the order of their positions. The positions do not
// have to be unique, so the IDs break the ties to keep the order the same for
// the same data.
const DISPLAY_ORDER = [{ position: "asc" }, { id: "asc" }] as const;

/**
 * Returns the questions and their answers in the order that they are shown.
 */
export const findQuestions = async (
  prisma: PrismaClient
): Promise<Question[]> => {
  const questions = await prisma.question.findMany({
    orderBy: [...DISPLAY_ORDER],
    select: {
      answers: {
        orderBy: [...DISPLAY_ORDER],
        select: {
          id: true,
          scores: {
            select: {
              result: {
                select: {
                  slug: true,
                },
              },
              score: true,
            },
          },
          value: true,
        },
      },
      title: true,
    },
  });

  return questions.map(({ answers, title }) => ({
    answers: answers.map(({ id, scores, value }) => ({
      id,
      scores: scores.map(({ result, score }) => ({
        result: result.slug,
        score,
      })),
      value,
    })),
    title,
  }));
};
