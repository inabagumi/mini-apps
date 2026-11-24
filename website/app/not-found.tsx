import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ページが見つかりません",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold sm:text-4xl">ページが見つかりません</h1>
      <p className="mt-4 leading-relaxed">
        お探しのページは移動または削除された可能性があります。
      </p>
      <p className="mt-8">
        <Link
          className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
          href="/"
        >
          トップページへ戻る
        </Link>
      </p>
    </div>
  );
}
