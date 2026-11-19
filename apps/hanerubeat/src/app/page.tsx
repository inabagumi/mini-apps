import type { Metadata } from "next";

import Heartbeat from "#/components/heartbeat";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: {
    absolute: process.env.NEXT_PUBLIC_TITLE || "",
  },
};

export default function Page() {
  return <Heartbeat />;
}
