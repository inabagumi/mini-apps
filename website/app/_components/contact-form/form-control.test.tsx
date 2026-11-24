import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";

import FormControl from "./form-control";
import type { FormData } from "./types";

const Wrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
  const methods = useForm<FormData>();

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe(FormControl, () => {
  it.each([
    ["single-line", false],
    ["multiline", true],
  ] as const)("associates the label with the %s field", (_, multiline) => {
    render(<FormControl label="本文" multiline={multiline} name="message" />, {
      wrapper: Wrapper,
    });

    const field = screen.getByRole("textbox", { name: "本文" });

    expect(field.id).toBe("message");
  });

  it.each([
    ["single-line", false],
    ["multiline", true],
  ] as const)("disables the %s field", (_, multiline) => {
    render(
      <FormControl
        disabled
        label="本文"
        multiline={multiline}
        name="message"
      />,
      { wrapper: Wrapper }
    );

    expect(screen.getByRole("textbox", { name: "本文" })).toHaveProperty(
      "disabled",
      true
    );
  });
});
