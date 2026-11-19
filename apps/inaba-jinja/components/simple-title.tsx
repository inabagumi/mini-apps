import type { ReactNode } from "react";

export default function SimpleTitle({ children }: { children: ReactNode }) {
  return <h1 className="mb-8 text-2xl leading-6 font-bold">{children}</h1>;
}
