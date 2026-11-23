import Link, { type LinkProps } from 'next/link'
import { type JSX } from 'react'

import { getRecentReleaseTitle } from '@/lib/releases'

import styles from './release-link.module.css'

export default async function ReleaseLink(
  props: LinkProps
): Promise<JSX.Element> {
  const title = await getRecentReleaseTitle()

  return (
    <Link className={styles.releaseLink} {...props}>
      {title}
    </Link>
  )
}
