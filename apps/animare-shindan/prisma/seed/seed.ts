import type { PrismaClient } from "../../lib/generated/prisma/client.ts";
import { seedData } from "./data.ts";

export interface AnswerSeed {
  id: string;
  value: string;
}

export interface QuestionSeed {
  answers: AnswerSeed[];
  id: string;
  title: string;
}

export interface TalentSeed {
  id: string;
  name: string;
  twitter: string | null;
  youtube: string | null;
}

// A type alias instead of an interface, which has no index signature and is
// not assignable to the JSON type of Prisma.
// oxlint-disable-next-line typescript/consistent-type-definitions
export type ResultParameterSeed = {
  label: string;
  value: number;
};

export interface ResultSeed {
  attribute: string;
  catchphrase: string;
  parameters: ResultParameterSeed[];
  recommendedVideoUrl: string;
  slug: string;
  talentId: string;
  type: string;
}

export interface ReleaseSeed {
  body: string;
  publishedAt: Date;
  slug: string;
  title: string;
}

export interface SeedData {
  questions: QuestionSeed[];
  releases: ReleaseSeed[];
  results: ResultSeed[];
  talents: TalentSeed[];
}

// The seed runs dozens of queries one by one in a transaction, which can take
// longer than the default timeout (5 seconds) over a remote connection.
const TRANSACTION_TIMEOUT = 60_000;

/**
 * Inserts the seed data into the database, or updates the records with the
 * same IDs or slugs to match the seed data.
 *
 * The seed is idempotent and runs in a transaction, so running it again does
 * not duplicate the records, and a failure leaves the database unchanged.
 * Records that are not in the seed data are left as they are, which means
 * removing an item from the seed data does not delete it from the database.
 */
export const seed = async (
  prisma: PrismaClient,
  data: SeedData = seedData
): Promise<void> => {
  await prisma.$transaction(
    async (tx) => {
      // The queries in a transaction are sent one by one anyway, so run them
      // in order to make the failure easy to follow.
      /* oxlint-disable no-await-in-loop */
      for (const { answers, id, title } of data.questions) {
        await tx.question.upsert({
          create: { id, title },
          update: { title },
          where: { id },
        });

        for (const answer of answers) {
          await tx.answer.upsert({
            create: { id: answer.id, questionId: id, value: answer.value },
            update: { questionId: id, value: answer.value },
            where: { id: answer.id },
          });
        }
      }

      for (const { id, name, twitter, youtube } of data.talents) {
        await tx.talent.upsert({
          create: { id, name, twitter, youtube },
          update: { name, twitter, youtube },
          where: { id },
        });
      }

      for (const {
        recommendedVideoUrl,
        slug,
        talentId,
        ...result
      } of data.results) {
        await tx.result.upsert({
          create: {
            ...result,
            recommendedVideo: { create: { url: recommendedVideoUrl } },
            slug,
            talent: { connect: { id: talentId } },
          },
          update: {
            ...result,
            recommendedVideo: { update: { url: recommendedVideoUrl } },
            talent: { connect: { id: talentId } },
          },
          where: { slug },
        });
      }

      for (const { slug, ...release } of data.releases) {
        await tx.release.upsert({
          create: { ...release, slug },
          update: release,
          where: { slug },
        });
      }
      /* oxlint-enable no-await-in-loop */
    },
    { timeout: TRANSACTION_TIMEOUT }
  );
};
