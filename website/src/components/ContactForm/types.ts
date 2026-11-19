import type { FormEventHandler } from "react";

export interface FormData {
  email: string;
  message: string;
  name: string;
}

export type HandleSubmit = FormEventHandler<HTMLFormElement>;
