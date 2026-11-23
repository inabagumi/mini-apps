import { cn } from "cn";

interface Props {
  className?: string;
}

export default function Skeleton({ className }: Props) {
  return (
    <span
      className={cn(
        "inline-block animate-pulse rounded-md bg-slate-200",
        className
      )}
    />
  );
}
