import Link from "next/link";
import type { LinkProps } from "next/link";
import type { JSX } from "react";

import { getRecentReleaseTitle } from "@/lib/releases";

export default async function ReleaseLink(
  props: LinkProps
): Promise<JSX.Element | null> {
  const title = await getRecentReleaseTitle();

  if (!title) {
    return null;
  }

  return (
    <Link
      className="block rounded-sm text-sm text-ink underline underline-offset-4 hover:text-brand-strong hover:decoration-2"
      {...props}
    >
      {title}
    </Link>
  );
}
