import Link from 'next/link'
import { type ReactNode } from 'react'

import { createLineShareURL, createTweetURL } from '@/lib/share'
import pkg from '@/package.json'

import styles from './layout.module.css'
import lineLogo from './line.svg'
import twitterLogo from './twitter.svg'

type Props = {
  children: ReactNode
}

export default function StaticLayout({ children }: Props): JSX.Element {
  return (
    <>
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          ANiMARE
        </Link>

        <nav>
          <ul className={styles.navigationList}>
            <li className={styles.navigationItem}>
              <a
                className={styles.shareButton}
                href={createTweetURL(new URL('/', pkg.homepage).toString())}
                rel="noopener noreferrer"
                target="_blank"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Twitter"
                  className={styles.shareIcon}
                  height="24"
                  src={twitterLogo.src}
                  width="24"
                />
              </a>
            </li>
            <li className={styles.navigationItem}>
              <a
                className={styles.shareButton}
                href={createLineShareURL(new URL('/', pkg.homepage).toString())}
                rel="noopener noreferrer"
                target="_blank"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Line"
                  className={styles.shareIcon}
                  height="24"
                  src={lineLogo.src}
                  width="24"
                />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.content}>
        <div className={styles.message}>{children}</div>
      </main>
    </>
  )
}
