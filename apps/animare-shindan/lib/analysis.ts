import { cacheLife } from "next/cache";

import prisma from "./prisma";

export interface Question {
  answers: string[];
  title: string;
}

export const getQuestions = async (): Promise<Question[]> => {
  "use cache";
  cacheLife("minutes");

  const questions = await prisma.question.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      answers: {
        orderBy: {
          id: "asc",
        },
        select: {
          value: true,
        },
      },
      title: true,
    },
  });

  return questions.map(({ answers, title }) => ({
    answers: answers.map((answer) => answer.value),
    title,
  }));
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
