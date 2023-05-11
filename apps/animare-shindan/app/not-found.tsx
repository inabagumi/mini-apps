import { type Metadata } from 'next'

import Layout from './(static)/layout'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: '404 Not found'
}

export default function NotFound(): JSX.Element {
  return (
    <Layout>
      <h1 className={styles.title}>404 Not found</h1>

      <p className={styles.description}>
        おさがしのページを見つけることができませんでした。
      </p>
    </Layout>
  )
}
