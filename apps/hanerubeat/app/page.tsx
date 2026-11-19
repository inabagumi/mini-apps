import type { Metadata } from "next";

import { title } from "#/lib/constants";

import Heartbeat from "./_components/heartbeat";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: {
    absolute: title,
  },
};

export default function Page() {
  return <Heartbeat />;
}
