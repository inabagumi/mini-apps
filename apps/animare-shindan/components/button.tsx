import { cn } from "cn";
import Link from "next/link";
import type { ComponentProps, JSX } from "react";

const variants = {
  /** A filled blue button on a white surface. */
  brand:
    "border-brand bg-brand text-white hover:border-brand-strong hover:bg-brand-strong",
  /** Sky blue outline used for secondary calls to action. */
  outline: "border-4 border-sky bg-white text-brand-strong hover:bg-sky-tint",
  /** The main call to action. */
  primary: "border-4 border-ink bg-brand text-white hover:bg-brand-strong",
  /** A less prominent action such as "try again" or "back". */
  secondary: "border-brand bg-white text-brand-strong hover:bg-brand-tint",
  /** Sharing to social networks. */
  share:
    "border-share bg-share text-white hover:border-brand-strong hover:bg-brand-strong",
  /** Calls to action on the brand blue background. */
  sun: "border-sun bg-sun font-black text-ink hover:border-sun-strong hover:bg-sun-strong",
  /** A neutral action on a white surface. */
  subtle: "border-line bg-white text-muted hover:border-bar hover:bg-line-tint",
} as const;

const sizes = {
  lg: "min-h-14 text-lg/snug sm:min-h-18 sm:text-2xl/snug",
  md: "min-h-14 text-base/snug sm:text-lg/snug",
  sm: "min-h-11 px-5 py-1 text-sm/snug sm:text-base/snug",
} as const;

export interface ButtonVariantProps {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
}

/**
 * Returns the class names of a button. Every button in the site shares the
 * same shape and interaction feedback, and variants only change colors.
 */
export const buttonVariants = ({
  className,
  size = "md",
  variant = "primary",
}: ButtonVariantProps & { className?: string } = {}): string =>
  cn(
    "mx-auto flex w-full items-center justify-center gap-1 rounded-full border-3 border-solid px-6 py-2 text-center font-bold no-underline transition-[background-color,border-color,color,box-shadow,opacity,visibility] duration-150 ease-out hover:shadow-raised active:shadow-pressed disabled:cursor-default disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );

type ButtonProps = ComponentProps<"button"> & ButtonVariantProps;

export const Button = ({
  className,
  size,
  type = "button",
  variant,
  ...props
}: ButtonProps): JSX.Element => (
  <button
    className={buttonVariants({ className, size, variant })}
    // oxlint-disable-next-line react/button-has-type
    type={type}
    {...props}
  />
);

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonVariantProps;

export const ButtonLink = ({
  className,
  size,
  variant,
  ...props
}: ButtonLinkProps): JSX.Element => (
  <Link className={buttonVariants({ className, size, variant })} {...props} />
);

type ExternalButtonLinkProps = ComponentProps<"a"> & ButtonVariantProps;

/** A button-styled link that opens an external site in a new tab. */
export const ExternalButtonLink = ({
  children,
  className,
  size,
  variant,
  ...props
}: ExternalButtonLinkProps): JSX.Element => (
  <a
    className={buttonVariants({ className, size, variant })}
    rel="noopener noreferrer"
    target="_blank"
    {...props}
  >
    {children}
  </a>
);
