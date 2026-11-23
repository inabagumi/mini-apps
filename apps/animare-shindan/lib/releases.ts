import { Octokit } from "@octokit/rest";
import { cacheLife } from "next/cache";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface Release {
  body: string;
  date: string;
  slug: string;
  title: string;
}

export const getAllReleases = async (): Promise<Release[]> => {
  "use cache";
  cacheLife({ revalidate: 120 });

  const { data: releases } = await octokit.repos.listReleases({
    owner: "inabagumi",
    repo: "animare-shindan",
  });

  return releases.map<Release>((release) => ({
    body: release.body ?? "",
    date: release.created_at,
    slug: release.tag_name,
    title: release.name || release.tag_name,
  }));
};

export const getRecentReleaseTitle = async (): Promise<string> => {
  "use cache";
  cacheLife({ revalidate: 120 });

  const {
    data: [release],
  } = await octokit.repos.listReleases({
    owner: "inabagumi",
    per_page: 1,
    repo: "animare-shindan",
  });

  return release.name || release.tag_name;
};
