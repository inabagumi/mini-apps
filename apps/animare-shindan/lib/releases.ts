import { Octokit } from '@octokit/rest'
import { serialize } from 'next-mdx-remote/serialize'

import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

export type Release = {
  contentSource: MDXRemoteSerializeResult
  date: string
  slug: string
  title: string
}

export async function getAllReleases(): Promise<Release[]> {
  const { data: releases } = await octokit.repos.listReleases({
    owner: 'inabagumi',
    repo: 'animare-shindan'
  })

  return Promise.all(
    releases.map<Promise<Release>>((release) =>
      serialize(release.body ?? '').then((contentSource) => ({
        contentSource,
        date: release.created_at,
        slug: release.tag_name,
        title: release.name || release.tag_name
      }))
    )
  )
}
