import { compareDesc, formatISO, parseISO } from 'date-fns'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'

export type Release = {
  content: string
  frontmatter: {
    date: string
    title: string
  }
  slug: string
}

const releasesDirectory = path.join(process.cwd(), 'src', 'data', 'releases')

export async function getRelease(slug: string): Promise<Release> {
  const filePath = path.join(releasesDirectory, `${slug}.md`)
  const rawContent = await fs.readFile(filePath, 'utf-8')
  const { content, data } = matter(rawContent)

  return {
    content,
    frontmatter: {
      date: formatISO(data.date),
      title: data.title as string
    },
    slug
  }
}

export async function getAllReleases(): Promise<Release[]> {
  const fileNames = await fs.readdir(releasesDirectory)
  const slugs = fileNames.map((fileName) => fileName.replace(/\.md$/i, ''))
  const releases = await Promise.all(slugs.map((slug) => getRelease(slug)))

  releases.sort((a, b) =>
    compareDesc(parseISO(a.frontmatter.date), parseISO(b.frontmatter.date))
  )

  return releases
}
