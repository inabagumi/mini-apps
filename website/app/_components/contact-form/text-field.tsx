import { cn } from "cn";
import type { ComponentProps } from "react";

type Props =
  | (ComponentProps<"input"> & { multiline?: false })
  | (ComponentProps<"textarea"> & { multiline: true });

export default function TextField(props: Props) {
  const className = cn(
    "block w-full rounded-md border border-muted bg-surface px-3 py-2 font-mono text-base text-foreground placeholder:text-muted/70 focus:border-accent disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:bg-danger-surface aria-invalid:focus:border-accent aria-invalid:focus:bg-surface",
    // Grow with the content in the browsers that support `field-sizing`.
    props.multiline && "field-sizing-content resize-y",
    props.className
  );

  if (props.multiline) {
    const { multiline, ...textareaProps } = props;

    return <textarea {...textareaProps} className={className} />;
  }

  const { multiline, ...inputProps } = props;

  return <input type="text" {...inputProps} className={className} />;
}
