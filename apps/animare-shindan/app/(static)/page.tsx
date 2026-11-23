import type { Metadata } from "next";
import type { JSX } from "react";

import { ButtonLink } from "@/components/button";

const description = "好みと推しVTuberを無意識から探る！";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description,
  openGraph: {
    description,
    title: "あなたのオタクタイプ診断 by あにまーれ",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Home(): JSX.Element {
  return (
    <>
      <h1 className="m-0 flex flex-col items-center justify-center text-center leading-heading font-bold tracking-wide">
        <span className="block text-xl sm:text-2xl">アナタの</span>
        <span className="block text-fluid-hero break-keep">
          オタクタイプ診断
        </span>
      </h1>

      <p className="mt-5 text-center text-sm leading-lead tracking-wide break-auto-phrase sm:mt-8 sm:text-base sm:leading-body">
        アナタの隠されたオタクタイプを徹底診断!
        <br />
        アナタにマッチするVTuberの、
        <br />
        オススメ動画も…?
      </p>

      <p className="mt-6 text-center text-base font-black tracking-wide sm:text-lg">
        アナタはどんなオタクタイプ?
      </p>

      <ButtonLink className="mt-3 max-w-95" href="/questions" size="lg">
        診断スタート!
      </ButtonLink>

      <p className="mt-8 text-xs leading-body sm:text-13">
        ※このサービスは
        <a
          className="text-brand-strong underline decoration-1 underline-offset-2 transition-colors hover:text-brand hover:decoration-2"
          href="https://www.live.iriam.com/company"
          rel="noopener noreferrer"
          target="_blank"
        >
          株式会社IRIAM
        </a>
        が提供するアプリである『
        <a
          className="text-brand-strong underline decoration-1 underline-offset-2 transition-colors hover:text-brand hover:decoration-2"
          href="https://www.live.iriam.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          IRIAM
        </a>
        』 の関連サービスとして公開されていた『あなたのオタクタイプ診断 by
        IRIAM』をオリジナルとして、
        <a
          className="text-brand-strong underline decoration-1 underline-offset-2 transition-colors hover:text-brand hover:decoration-2"
          href="https://www.774.ai/"
          rel="noopener noreferrer"
          target="_blank"
        >
          774 inc.
        </a>{" "}
        が運営しているバーチャルYouTuberグループ『有閑喫茶
        あにまーれ』をモチーフにして株式会社IRIAMや774 inc. とは一切関係のない
        <a
          className="text-brand-strong underline decoration-1 underline-offset-2 transition-colors hover:text-brand hover:decoration-2"
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
  );
}
