import { cacheLife } from "next/cache";

import prisma from "./prisma";

export interface Release {
  body: string;
  date: string;
  slug: string;
  title: string;
}

export const getAllReleases = async (): Promise<Release[]> => {
  "use cache";
  cacheLife("minutes");

  const releases = await prisma.release.findMany({
    orderBy: {
      publishedAt: "desc",
    },
    select: {
      body: true,
      publishedAt: true,
      slug: true,
      title: true,
    },
  });

  return releases.map<Release>((release) => ({
    body: release.body,
    date: release.publishedAt.toISOString(),
    slug: release.slug,
    title: release.title,
  }));
};

export const getRecentReleaseTitle = async (): Promise<string | null> => {
  "use cache";
  cacheLife("minutes");

  const release = await prisma.release.findFirst({
    orderBy: {
      publishedAt: "desc",
    },
    select: {
      title: true,
    },
  });

  return release?.title ?? null;
};
