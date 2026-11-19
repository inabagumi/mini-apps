import { FormspreeProvider } from "@formspree/react";
import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";

export default function Root({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <FormspreeProvider project="1774341564403809704">
      {children}

      <Analytics />
    </FormspreeProvider>
  );
}
