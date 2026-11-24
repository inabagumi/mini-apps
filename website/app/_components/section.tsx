import type { ReactNode } from "react";

import type { SectionId } from "#/lib/constants";

export default function Section({
  children,
  id,
  lead,
  split = false,
  title,
}: Readonly<{
  children: ReactNode;
  id: SectionId;
  /** The text below the heading. */
  lead?: ReactNode;
  /**
   * Puts the heading and the content side by side on wide screens so that a
   * narrow content such as text does not leave one side of the page empty.
   */
  split?: boolean;
  title: string;
}>) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      // Keep the heading out from under the sticky header.
      className="scroll-mt-14 py-12 sm:py-16"
      id={id}
    >
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 ${split ? "lg:grid lg:grid-cols-5 lg:gap-x-10" : ""}`}
      >
        <div className={split ? "lg:col-span-2" : undefined}>
          <h2 className="text-2xl font-bold" id={`${id}-heading`}>
            {title}
          </h2>

          {lead}
        </div>

        <div className={split ? "mt-6 lg:col-span-3 lg:mt-0" : "mt-2"}>
          {children}
        </div>
      </div>
    </section>
  );
}
