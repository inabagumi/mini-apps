import { cn } from "cn";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { HTMLAttributes, JSX, ReactNode } from "react";

import { ButtonLink, ExternalButtonLink } from "@/components/button";
import { getAnalysisResult, getAnalysisResultIDs } from "@/lib/analysis";
import { createTweetURL } from "@/lib/share";
import pkg from "@/package.json";

import nanashiAvatar from "./avatar.svg";
import Graph from "./graph";
import nanashiIllust from "./nanashi.svg";

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
  children,
  className,
  ...props
}: MessageWindowProps): JSX.Element => (
  <div
    className={cn(
      "relative mt-16 rounded-window border-3 border-ink bg-white",
      className
    )}
    {...props}
  >
    {/* oxlint-disable-next-line nextjs/no-img-element */}
    <img
      alt=""
      className="pointer-events-none absolute inset-x-0 -top-16 mx-auto h-16 w-auto select-none"
      height={nanashiIllust.height}
      src={nanashiIllust.src}
      width={nanashiIllust.width}
    />
    {children}
  </div>
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
      <MessageWindow className="p-5 sm:p-10">
        <h2 className="m-0 flex flex-col items-center justify-center text-center text-lg font-bold sm:text-22">
          <span className="my-1 block text-base leading-normal">
            アナタは
            <mark className="mr-0.5 bg-transparent bg-linear-to-b from-transparent from-80% to-highlight to-80% text-lg font-black">
              {result.type}
            </mark>
            系の
          </span>
          <span className="block text-balance wrap-anywhere break-auto-phrase">
            <mark className="inline bg-transparent bg-linear-to-b from-transparent from-80% to-highlight to-80% box-decoration-clone text-fluid-result leading-heading font-black tracking-heading">
              {result.attribute}
            </mark>
            好きです!
          </span>
        </h2>

        <div className="mt-5 flex items-start">
          <figure className="m-0 mt-0.5 shrink-0">
            {/* oxlint-disable-next-line nextjs/no-img-element */}
            <img
              alt=""
              className="mx-auto block size-14 rounded-full border-2 border-sky sm:size-20 sm:border-4"
              height={128}
              src={nanashiAvatar.src}
              width={128}
            />
            <figcaption className="mt-1 text-center text-xs leading-tight font-bold text-ink">
              黒猫 ななし
            </figcaption>
          </figure>

          <p className="relative mt-2 ml-4 flex-1 rounded-balloon bg-line p-2.5 after:absolute after:top-4 after:-left-2.5 after:border-y-7 after:border-r-10 after:border-y-transparent after:border-r-line sm:mt-5">
            あにまーれは仲良しです♩
          </p>
        </div>

        <Suspense>
          <ShareVisibility searchParams={searchParams} shared={false}>
            <ExternalButtonLink
              className="mt-10 sm:max-w-80"
              href={createTweetURL(
                shareURL,
                `アナタは${result.type}系【${result.attribute}好き】です！\n`
              )}
              variant="share"
            >
              診断結果をツイートする
            </ExternalButtonLink>
            <ButtonLink className="mt-3 sm:max-w-80" href="/" variant="subtle">
              もう一度診断する
            </ButtonLink>
          </ShareVisibility>
        </Suspense>

        <Graph parameters={result.parameters} title="オタクパラメーター" />
      </MessageWindow>

      <Suspense>
        <ShareVisibility searchParams={searchParams} shared>
          <ButtonLink className="mt-10 max-w-104" href="/" variant="outline">
            オタクタイプを診断してみる
          </ButtonLink>
        </ShareVisibility>
      </Suspense>

      <h2 className="mx-auto mt-11 mb-2 px-2 text-2xl leading-heading font-black tracking-heading text-balance wrap-anywhere break-auto-phrase text-white sm:mt-16 sm:text-4xl">
        総勢約8,000名のVTuberの中から【{result.type}
        好き】のアナタにマッチするVTuberが選ばれました!
      </h2>

      {(result.recommendedVideo || result.talent.youtube) && (
        <section>
          {result.recommendedVideo && (
            <>
              <h2 className="mt-6 mb-0 px-2 text-center text-base text-balance wrap-anywhere break-auto-phrase text-white sm:text-xl">
                「{result.talent.name}」のおすすめ動画はこちら!
              </h2>

              <div className="mx-auto mt-3 w-full max-w-94">
                <header className="rounded-t-window bg-white p-3">
                  <p className="m-0 text-center text-xs leading-heading text-caption">
                    {result.catchphrase}
                  </p>

                  <h3 className="m-0 text-center text-2xl leading-compact font-black text-balance wrap-anywhere break-auto-phrase text-brand-strong">
                    {result.talent.twitter ? (
                      <a
                        className="block rounded-md text-inherit no-underline hover:underline"
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
                  <div className="relative z-1 aspect-video w-full overflow-hidden rounded-b-window bg-black">
                    {/* The YouTube player needs both `allow-scripts` and
                        `allow-same-origin`, which the rule disallows. */}
                    {/* oxlint-disable-next-line react/iframe-missing-sandbox */}
                    <iframe
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 size-full border-0"
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
              <h3 className="mt-5 mb-0 text-center text-lg leading-compact font-black text-balance wrap-anywhere break-auto-phrase text-white sm:text-28">
                YouTubeにアクセスして、
                <br />「{result.talent.name}」と会話しよう!
              </h3>

              <ExternalButtonLink
                className="mt-3 max-w-95"
                href={`https://www.youtube.com/channel/${result.talent.youtube}`}
                size="lg"
                variant="sun"
              >
                このVTuberに会いに行く!
              </ExternalButtonLink>
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
    <main className="mx-auto w-full max-w-narrow pt-5 pb-8 sm:pt-6">
      <h1 className="m-0 p-2 text-center text-xl font-black tracking-heading text-white sm:px-0 sm:pt-0 sm:pb-6 sm:text-2xl">
        オタクタイプ 診断結果
      </h1>

      {/*
       * Everything that depends on the URL (`params` / `searchParams`) is
       * rendered inside this boundary so that the rest of the page can be
       * part of the App Shell shared by every result.
       */}
      <Suspense>
        <ResultDetails params={params} searchParams={searchParams} />
      </Suspense>

      <div className="pt-10">
        <MessageWindow className="mx-auto w-full max-w-104">
          <p className="mx-5 mt-4 mb-0 text-center text-17 leading-compact font-black">
            その他のVTuberや詳しい情報は
            <br />
            YouTubeをチェックしてみてね！
          </p>

          <ExternalButtonLink
            className="mx-5 mt-3 mb-5 w-auto"
            href="https://www.youtube.com/"
            variant="brand"
          >
            YouTube公式ウェブサイト
            <span
              aria-hidden="true"
              className="material-icons text-lg leading-none"
            >
              launch
            </span>
            <span className="sr-only">（新しいタブで開きます）</span>
          </ExternalButtonLink>
        </MessageWindow>

        <ButtonLink className="mt-10 max-w-104" href="/" variant="outline">
          オタクタイプを診断してみる
        </ButtonLink>
      </div>
    </main>
  );
}
