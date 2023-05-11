import clsx from 'clsx'
import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type HTMLAttributes } from 'react'

import { getAnalysisResult, getAnalysisResultIDs } from '@/lib/analysis'
import { createTweetURL } from '@/lib/share'
import pkg from '@/package.json'

import nanashiAvatar from './avatar.svg'
import Graph from './graph'
import styles from './page.module.css'

export const revalidate = 60

function createYouTubeEmbedURL(url: string): string {
  const { pathname, searchParams } = new URL(url)

  let id: string | null = null

  if (pathname === '/watch' && searchParams.has('id')) {
    id = searchParams.get('v')
  } else {
    id = pathname.slice(1)
  }

  if (!id) {
    throw new TypeError('An invalid URL was given as an argument.')
  }

  return `https://www.youtube.com/embed/${id}`
}

type MessageWindowProps = HTMLAttributes<HTMLDivElement>

function MessageWindow({
  className,
  ...props
}: MessageWindowProps): JSX.Element {
  return <div className={clsx(styles.messageWindow, className)} {...props} />
}

type Params = {
  slug: string
}

export async function generateStaticParams(): Promise<Params[]> {
  const resultIDs = await getAnalysisResultIDs()

  return resultIDs.map((slug) => ({ slug }))
}

type SearchParams = {
  s?: string[] | string
}

type Props = {
  params: Params
  searchParams: SearchParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getAnalysisResult(params.slug)

  if (!result) {
    notFound()
  }

  const title = `${result.talent.name}が選ばれました！`
  const description = '好みと推しVTuberを無意識から探る！'

  return {
    alternates: {
      canonical: `/s/${result.slug}`
    },
    description,
    openGraph: {
      description,
      images: [
        {
          height: 630,
          url: `/images/results/${result.slug}.png`,
          width: 1200
        }
      ],
      title,
      type: 'article',
      url: `/s/${result.slug}`
    },
    title,
    twitter: {
      card: 'summary_large_image'
    }
  }
}

export default async function ResultPage({
  params,
  searchParams
}: Props): Promise<JSX.Element> {
  const result = await getAnalysisResult(params.slug)

  if (!result) {
    notFound()
  }

  const sharedParam =
    (Array.isArray(searchParams.s) ? searchParams.s.at(-1) : searchParams.s) ??
    'false'
  const isShared = ['1', 'true'].includes(sharedParam)
  const shareURL = new URL(`/s/${result.slug}?s=true`, pkg.homepage).toString()

  return (
    <main className={styles.content}>
      <h1 className={styles.title}>オタクタイプ 診断結果</h1>

      <MessageWindow className={styles.messageBox}>
        <h2 className={styles.messageTitle}>
          <span className={styles.messageTitleLine}>
            アナタは
            <mark className={styles.messageTitleMark}>{result.type}</mark>
            系の
          </span>
          <span className={styles.messageTitleLine}>
            <mark className={styles.messageTitleMark}>{result.attribute}</mark>
            好きです!
          </span>
        </h2>

        <div className={styles.evaluation}>
          <figure className={styles.evaluationAvatar}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className={styles.avatar}
              height={128}
              src={nanashiAvatar.src}
              width={128}
            />
            <figcaption className={styles.evaluationCaption}>
              黒猫 ななし
            </figcaption>
          </figure>

          <p className={styles.evaluationComment}>あにまーれは仲良しです♩</p>
        </div>

        {!isShared && (
          <>
            <a
              className={styles.shareButton}
              href={createTweetURL(
                shareURL,
                `アナタは${result.type}系【${result.attribute}好き】です！\n`
              )}
              rel="noopener noreferrer"
              role="button"
              target="_blank"
            >
              診断結果をツイートする
            </a>
            <Link className={styles.retryButton} href="/" role="button">
              もう一度診断する
            </Link>
          </>
        )}

        <Graph parameters={result.parameters} title="オタクパラメーター" />
      </MessageWindow>

      {isShared && (
        <Link className={styles.button} href="/" role="button">
          オタクタイプを診断してみる
        </Link>
      )}

      <h2 className={styles.subtitle}>
        総勢約8,000名のVTuberの中から【{result.type}
        好き】のアナタにマッチするVTuberが選ばれました!
      </h2>

      {(result.recommendedVideo || result.talent.youtube) && (
        <section>
          {result.recommendedVideo && (
            <>
              <h2 className={styles.detailTitle}>
                「{result.talent.name}」のおすすめ動画はこちら!
              </h2>

              <div className={styles.detailContent}>
                <header className={styles.profile}>
                  <p className={styles.catchphrase}>{result.catchphrase}</p>

                  <h3 className={styles.profileName}>
                    {result.talent.twitter ? (
                      <a
                        className={styles.profileNameLink}
                        href={`https://twitter.com/${result.talent.twitter}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {result.talent.name}
                      </a>
                    ) : (
                      result.talent.name
                    )}
                  </h3>
                </header>

                <div>
                  <div className={styles.movie}>
                    <iframe
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.movieFrame}
                      height={315}
                      src={createYouTubeEmbedURL(result.recommendedVideo.url)}
                      width={560}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {result.talent.youtube && (
            <>
              <h4 className={styles.headline}>
                YouTubeにアクセスして、
                <br />「{result.talent.name}」と会話しよう!
              </h4>

              <a
                className={styles.detailButton}
                href={`https://www.youtube.com/channel/${result.talent.youtube}`}
                rel="noopener noreferrer"
                role="button"
                target="_blank"
              >
                このVTuberに会いに行く!
              </a>
            </>
          )}
        </section>
      )}

      <div className={styles.footer}>
        <MessageWindow className={styles.message}>
          <p className={styles.messageParagraph}>
            その他のVTuberや詳しい情報は
            <br />
            YouTubeをチェックしてみてね！
          </p>

          <a
            className={styles.messageButton}
            href="https://www.youtube.com/"
            rel="noreferrer noopener"
            role="button"
            target="_blank"
          >
            YouTube公式ウェブサイト
          </a>
        </MessageWindow>

        <Link className={styles.button} href="/" role="button">
          オタクタイプを診断してみる
        </Link>
      </div>
    </main>
  )
}
