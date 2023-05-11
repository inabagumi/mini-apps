import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

export type Release = {
  body: string
  date: string
  slug: string
  title: string
}

export async function getAllReleases(): Promise<Release[]> {
  const { data: releases } = await octokit.repos.listReleases({
    owner: 'inabagumi',
    repo: 'animare-shindan'
  })

  return releases.map<Release>((release) => ({
    body: release.body ?? '',
    date: release.created_at,
    slug: release.tag_name,
    title: release.name || release.tag_name
  }))
}

export async function getRecentReleaseTitle(): Promise<string> {
  const {
    data: [release]
  } = await octokit.repos.listReleases({
    owner: 'inabagumi',
    per_page: 1,
    repo: 'animare-shindan'
  })

  return release.name || release.tag_name
}
