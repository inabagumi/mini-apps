import type { ReactNode } from "react";

import type { SectionId } from "#/lib/constants";

export default function Section({
  children,
  id,
  title,
}: Readonly<{
  children: ReactNode;
  id: SectionId;
  title: string;
}>) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      // Keep the heading out from under the sticky header.
      className="scroll-mt-14 py-12 sm:py-16"
      id={id}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl" id={`${id}-heading`}>
          {title}
        </h2>

        {children}
      </div>
    </section>
  );
}
