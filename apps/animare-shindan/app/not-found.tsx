import type { Metadata } from "next";
import type { JSX } from "react";

import { ButtonLink } from "@/components/button";

import Layout from "./(static)/layout";

export const metadata: Metadata = {
  title: "404 Not found",
};

export default function NotFound(): JSX.Element {
  return (
    <Layout>
      <h1 className="m-0 text-center text-2xl font-black sm:text-3xl">
        404 Not found
      </h1>

      <p className="mt-3 text-center text-sm break-auto-phrase sm:text-base">
        おさがしのページを見つけることができませんでした。
      </p>

      <ButtonLink className="mt-6 max-w-95" href="/">
        トップページに戻る
      </ButtonLink>
    </Layout>
  );
}
