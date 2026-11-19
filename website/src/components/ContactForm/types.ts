import type { FormEventHandler } from "react";

// This must be a type alias rather than an interface so that it is assignable
// to `FieldValues`, which has an index signature.
// oxlint-disable-next-line typescript/consistent-type-definitions
export type FormData = {
  email: string;
  message: string;
  name: string;
};

export type HandleSubmit = FormEventHandler<HTMLFormElement>;
