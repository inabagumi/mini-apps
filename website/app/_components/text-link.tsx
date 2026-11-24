import type { ComponentProps } from "react";

import ExternalLink from "./external-link";

/**
 * A link to an external website in body text.
 */
export default function TextLink(
  props: Readonly<Omit<ComponentProps<typeof ExternalLink>, "className">>
) {
  return (
    <ExternalLink
      {...props}
      className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
    />
  );
}
