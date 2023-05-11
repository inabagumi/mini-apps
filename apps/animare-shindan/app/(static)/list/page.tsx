import { format } from 'date-fns'
import { type Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { getAllReleases } from '@/lib/releases'

import styles from './page.module.css'

export const revalidate = 120

export const metadata: Metadata = {
  alternates: {
    canonical: '/list'
  },
  title: 'お知らせ'
}

export default async function ReleasesPage(): Promise<JSX.Element> {
  const releases = await getAllReleases()

  return (
    <>
      {releases.map((release) => {
        return (
          <section className={styles.release} key={release.slug}>
            <time className={styles.releaseDate} dateTime={release.date}>
              {format(new Date(release.date), 'yyyy.MM.dd')}
            </time>
            <h2 className={styles.releaseTitle}>{release.title}</h2>

            <div className={styles.releaseBody}>
              {/* @ts-expect-error Async Server Component */}
              <MDXRemote source={release.body} />
            </div>
          </section>
        )
      })}
    </>
  )
}
