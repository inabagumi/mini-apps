import { clsx } from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { HTMLAttributes, JSX, ReactNode } from "react";

import { getAnalysisResult, getAnalysisResultIDs } from "@/lib/analysis";
import { createTweetURL } from "@/lib/share";
import pkg from "@/package.json";

import nanashiAvatar from "./avatar.svg";
import Graph from "./graph";

import styles from "./page.module.css";

const createYouTubeEmbedURL = (url: string): string => {
  const { pathname, searchParams } = new URL(url);

  const id =
    pathname === "/watch" && searchParams.has("id")
      ? searchParams.get("v")
      : pathname.slice(1);

  if (!id) {
    throw new TypeError("An invalid URL was given as an argument.");
  }

  return `https://www.youtube.com/embed/${id}`;
};

type MessageWindowProps = HTMLAttributes<HTMLDivElement>;

const MessageWindow = ({
  className,
  ...props
}: MessageWindowProps): JSX.Element => (
  <div className={clsx(styles.messageWindow, className)} {...props} />
);

type Props = PageProps<"/s/[slug]">;

interface ShareVisibilityProps {
  children: ReactNode;
  searchParams: Props["searchParams"];
  shared: boolean;
}

/**
 * Renders `children` only when whether the page was opened from a shared
 * link (`?s=true`) matches `shared`. This reads `searchParams`, so it has to
 * be wrapped in `<Suspense>` to keep the rest of the page prerendered.
 */
const ShareVisibility = async ({
  children,
  searchParams,
  shared,
}: ShareVisibilityProps): Promise<ReactNode> => {
  const { s } = await searchParams;
  const sharedParam = (Array.isArray(s) ? s.at(-1) : s) ?? "false";
  const isShared = ["1", "true"].includes(sharedParam);

  return isShared === shared ? children : null;
};

export const generateStaticParams = async (): Promise<
  Awaited<Props["params"]>[]
> => {
  const resultIDs = await getAnalysisResultIDs();

  return resultIDs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const result = await getAnalysisResult(slug);

  if (!result) {
    notFound();
  }

  const title = `${result.talent.name}が選ばれました！`;
  const description = "好みと推しVTuberを無意識から探る！";

  return {
    alternates: {
      canonical: `/s/${result.slug}`,
    },
    description,
    openGraph: {
      description,
      images: [
        {
          height: 630,
          url: `/images/results/${result.slug}.png`,
          width: 1200,
        },
      ],
      title,
      type: "article",
      url: `/s/${result.slug}`,
    },
    title,
    twitter: {
      card: "summary_large_image",
    },
  };
};

const ResultDetails = async ({
  params,
  searchParams,
}: Props): Promise<JSX.Element> => {
  const { slug } = await params;
  const result = await getAnalysisResult(slug);

  if (!result) {
    notFound();
  }

  const shareURL = new URL(`/s/${result.slug}?s=true`, pkg.homepage).toString();

  return (
    <>
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
            {/* oxlint-disable-next-line nextjs/no-img-element */}
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

        <Suspense>
          <ShareVisibility searchParams={searchParams} shared={false}>
            <a
              className={styles.shareButton}
              href={createTweetURL(
                shareURL,
                `アナタは${result.type}系【${result.attribute}好き】です！\n`
              )}
              rel="noopener noreferrer"
              target="_blank"
            >
              診断結果をツイートする
            </a>
            <Link className={styles.retryButton} href="/">
              もう一度診断する
            </Link>
          </ShareVisibility>
        </Suspense>

        <Graph parameters={result.parameters} title="オタクパラメーター" />
      </MessageWindow>

      <Suspense>
        <ShareVisibility searchParams={searchParams} shared>
          <Link className={styles.button} href="/">
            オタクタイプを診断してみる
          </Link>
        </ShareVisibility>
      </Suspense>

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
                    {/* The YouTube player needs both `allow-scripts` and
                        `allow-same-origin`, which the rule disallows. */}
                    {/* oxlint-disable-next-line react/iframe-missing-sandbox */}
                    <iframe
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.movieFrame}
                      height={315}
                      src={createYouTubeEmbedURL(result.recommendedVideo.url)}
                      title={`「${result.talent.name}」のおすすめ動画`}
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
                target="_blank"
              >
                このVTuberに会いに行く!
              </a>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default function ResultPage({
  params,
  searchParams,
}: Props): JSX.Element {
  return (
    <main className={styles.content}>
      <h1 className={styles.title}>オタクタイプ 診断結果</h1>

      {/*
       * Everything that depends on the URL (`params` / `searchParams`) is
       * rendered inside this boundary so that the rest of the page can be
       * part of the App Shell shared by every result.
       */}
      <Suspense>
        <ResultDetails params={params} searchParams={searchParams} />
      </Suspense>

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
            target="_blank"
          >
            YouTube公式ウェブサイト
          </a>
        </MessageWindow>

        <Link className={styles.button} href="/">
          オタクタイプを診断してみる
        </Link>
      </div>
    </main>
  );
}
