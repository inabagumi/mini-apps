import type { ComponentProps } from "react";

export default function ExternalLink({
  children,
  ...props
}: Readonly<Omit<ComponentProps<"a">, "rel" | "target">>) {
  return (
    <a {...props} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}
