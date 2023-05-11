import { type Metadata } from 'next'
import Link from 'next/link'

import styles from './page.module.css'

export const revalidate = 60

const description = '好みと推しVTuberを無意識から探る！'

export const metadata: Metadata = {
  alternates: {
    canonical: '/'
  },
  description,
  openGraph: {
    description,
    title: 'あなたのオタクタイプ診断 by あにまーれ',
    type: 'website',
    url: '/'
  },
  twitter: {
    card: 'summary_large_image'
  }
}

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>
        <span className={styles.titleLine}>アナタの</span>
        <span className={styles.titleLine}>オタクタイプ診断</span>
      </h1>

      <p className={styles.description}>
        アナタの隠されたオタクタイプを徹底診断!
        <br />
        アナタにマッチするVTuberの、
        <br />
        オススメ動画も…?
      </p>

      <p className={styles.intro}>アナタはどんなオタクタイプ?</p>

      <Link className={styles.button} href="/questions" role="button">
        診断スタート!
      </Link>

      <p className={styles.disclaimer}>
        ※このサービスは
        <a
          className={styles.disclaimerLink}
          href="https://www.live.iriam.com/company"
          rel="noopener noreferrer"
          target="_blank"
        >
          株式会社IRIAM
        </a>
        が提供するアプリである『
        <a
          className={styles.disclaimerLink}
          href="https://www.live.iriam.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          IRIAM
        </a>
        』 の関連サービスとして公開されていた『あなたのオタクタイプ診断 by
        IRIAM』をオリジナルとして、
        <a
          className={styles.disclaimerLink}
          href="https://www.774.ai/"
          rel="noopener noreferrer"
          target="_blank"
        >
          774 inc.
        </a>{' '}
        が運営しているバーチャルYouTuberグループ『有閑喫茶
        あにまーれ』をモチーフにして株式会社IRIAMや774 inc. とは一切関係のない
        <a
          className={styles.disclaimerLink}
          href="https://haneru.dev/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Haneru Developers
        </a>
        によって開発と運営が行われている非公式のサービスになります。
        <br />
        このサービスに関するお問い合わせをHaneru
        Developers以外の団体や個人に対して行うのはお止めください。
      </p>
    </>
  )
}
