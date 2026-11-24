"use client";

import { FormspreeProvider } from "@formspree/react";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { FormData } from "./types";

export default function ContactFormProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const methods = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  return (
    <FormspreeProvider project="1774341564403809704">
      <FormProvider {...methods}>{children}</FormProvider>
    </FormspreeProvider>
  );
}
