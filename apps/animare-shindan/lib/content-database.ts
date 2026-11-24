// Reads the content of the diagnosis from the database to validate it (see
// `lib/content.ts`).

import type { Content } from "./content.ts";
import type { PrismaClient } from "./generated/prisma/client.ts";

// The same order as the questions page (see `lib/questions.ts`).
const DISPLAY_ORDER = [{ position: "asc" }, { id: "asc" }] as const;

/**
 * Returns the content in the database: the questions and their answers in the
 * order that they are shown, all the results and all the talents.
 *
 * The answers that do not belong to a question are not shown, so they are
 * left out.
 */
export const findContent = async (prisma: PrismaClient): Promise<Content> => {
  const [questions, results, talents] = await Promise.all([
    prisma.question.findMany({
      orderBy: [...DISPLAY_ORDER],
      select: {
        answers: {
          orderBy: [...DISPLAY_ORDER],
          select: {
            id: true,
            scores: {
              orderBy: { result: { slug: "asc" } },
              select: { result: { select: { slug: true } }, score: true },
            },
            value: true,
          },
        },
        id: true,
        title: true,
      },
    }),
    prisma.result.findMany({
      orderBy: { slug: "asc" },
      select: {
        attribute: true,
        catchphrase: true,
        parameters: true,
        recommendedVideo: { select: { url: true } },
        slug: true,
        talentId: true,
        type: true,
      },
    }),
    prisma.talent.findMany({
      orderBy: { id: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return {
    questions: questions.map(({ answers, id, title }) => ({
      answers: answers.map((answer) => ({
        id: answer.id,
        scores: answer.scores.map(({ result, score }) => ({
          result: result.slug,
          score,
        })),
        value: answer.value,
      })),
      id,
      title,
    })),
    results: results.map(({ recommendedVideo, ...result }) => ({
      ...result,
      recommendedVideoUrl: recommendedVideo.url,
    })),
    talents,
  };
};
