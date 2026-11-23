import { format } from "date-fns";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { JSX } from "react";

import { getAllReleases } from "@/lib/releases";

export const metadata: Metadata = {
  alternates: {
    canonical: "/list",
  },
  title: "お知らせ",
};

const components: MDXRemoteProps["components"] = {
  a: ({ children, ...props }) => (
    <a
      className="break-all text-brand-strong underline underline-offset-2 hover:decoration-2"
      {...props}
    >
      {children}
    </a>
  ),
  li: ({ children, ...props }) => (
    <li className="m-0 flex items-start p-0" {...props}>
      <span
        aria-hidden="true"
        className="material-icons -ml-1.5 shrink-0 text-xl/body text-brand"
      >
        arrow_right
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  ),
  p: (props) => <p className="my-3 text-sm leading-relaxed" {...props} />,
  ul: (props) => (
    <ul
      className="m-0 mt-3 grid list-none grid-cols-1 gap-x-4 p-0 text-base xs:grid-cols-2 sm:mt-4.5"
      {...props}
    />
  ),
};

export default async function ReleasesPage(): Promise<JSX.Element> {
  const releases = await getAllReleases();

  return (
    <>
      <h1 className="sr-only">お知らせ</h1>

      {releases.map((release) => (
        <section
          className="mx-auto max-w-narrow border-line not-first-of-type:mt-8 not-first-of-type:border-t-2 not-first-of-type:pt-8 sm:not-first-of-type:mt-12 sm:not-first-of-type:pt-12"
          key={release.slug}
        >
          <time
            className="block text-sm leading-none sm:text-base"
            dateTime={release.date}
          >
            {format(new Date(release.date), "yyyy.MM.dd")}
          </time>

          <h2 className="mt-2 mb-1.5 text-fluid-title leading-snug font-black tracking-wide text-balance wrap-anywhere break-auto-phrase text-brand-strong sm:mb-3">
            {release.title}
          </h2>
          <div className="min-w-0">
            <MDXRemote components={components} source={release.body} />
          </div>
        </section>
      ))}
    </>
  );
}
