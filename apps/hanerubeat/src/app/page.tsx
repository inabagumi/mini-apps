import Heartbeat from "components/heartbeat";
import type { Metadata } from "next";

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
