"use client";

import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

interface Props {
  idPromise: Promise<string>;
}

export default function Redirect({ idPromise }: Props) {
  const router = useRouter();
  const id = use(idPromise);

  useEffect(() => {
    router.push(`/kuji/${id}`);
  }, [router, id]);

  return null;
}
