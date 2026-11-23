import { cacheLife } from "next/cache";

import prisma from "./prisma";
import { findQuestions } from "./questions";
import type { Question } from "./questions";

export const getQuestions = async (): Promise<Question[]> => {
  "use cache";
  cacheLife("minutes");

  return await findQuestions(prisma);
};

export interface Talent {
  name: string;
  twitter?: string | null;
  youtube?: string | null;
}

export interface RecommendedVideo {
  url: string;
}

export interface ResultParameter {
  label: string;
  value: number;
}

export interface Result {
  attribute: string;
  catchphrase: string;
  parameters: ResultParameter[];
  recommendedVideo: RecommendedVideo;
  slug: string;
  talent: Talent;
  type: string;
}

export const getAnalysisResult = async (
  slug: string
): Promise<Result | null> => {
  "use cache";
  cacheLife("minutes");

  const result = await prisma.result.findFirst({
    select: {
      attribute: true,
      catchphrase: true,
      parameters: true,
      recommendedVideo: {
        select: {
          url: true,
        },
      },
      slug: true,
      talent: {
        select: {
          name: true,
          twitter: true,
          youtube: true,
        },
      },
      type: true,
    },
    where: {
      slug,
    },
  });

  return result
    ? {
        ...result,
        parameters: result.parameters as unknown as ResultParameter[],
      }
    : null;
};

export const getAnalysisResultIDs = async (): Promise<string[]> => {
  "use cache";
  cacheLife("minutes");

  const results = await prisma.result.findMany({
    select: {
      slug: true,
    },
  });

  return results.map((result) => result.slug);
};
