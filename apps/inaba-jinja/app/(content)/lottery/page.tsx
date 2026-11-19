import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";

import { title as siteName, twitterAccount } from "#/lib/constants";
import { getAnyFortuneID } from "#/lib/contentful";
import { delay } from "#/lib/timer";

import Redirect from "./_components/redirect";
import kujiImage from "./kuji.png";

const title = "おみくじを引いています...";

export const metadata = {
  alternates: {
    canonical: "/lottery",
  },
  openGraph: {
    title,
    url: "/lottery",
  },
  robots: {
    follow: true,
    index: false,
  },
  title,
  twitter: {
    site: `@${twitterAccount}`,
    title: `${title} - ${siteName}`,
  },
} satisfies Metadata;

export default async function LotteryPage() {
  await connection();

  // Create the promise here rather than in `Redirect`: a promise created in a
  // Client Component is recreated on every render, so it never settles while
  // the component is suspended.
  const idPromise = Promise.all([getAnyFortuneID(), delay(2)]).then(
    ([id]) => id
  );

  return (
    <div className="mt-8 mb-4 flex h-full flex-col items-center justify-center">
      <Suspense fallback={null}>
        <Redirect idPromise={idPromise} />
      </Suspense>

      <div className="mx-auto max-w-full animate-shake">
        <Image
          alt="くじ引き中..."
          className="h-auto max-w-full"
          height={kujiImage.height / 2}
          priority
          quality={80}
          src={kujiImage}
          width={kujiImage.width / 2}
        />
      </div>
    </div>
  );
}
