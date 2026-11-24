import type { useForm as useFormspree } from "@formspree/react";
import { act, renderHook } from "@testing-library/react";
import type { FormEvent, ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useHandleSubmit } from "./hooks";
import type { FormData } from "./types";

const mocks = vi.hoisted(() => ({
  sendEmail: vi.fn<ReturnType<typeof useFormspree>[1]>(),
  useForm: vi.fn<typeof useFormspree>(),
}));

vi.mock(import("@formspree/react"), () => ({ useForm: mocks.useForm }));

const defaultValues: FormData = {
  email: "",
  message: "",
  name: "",
};

const submissionData: FormData = {
  email: "you@example.com",
  message: "こんにちは",
  name: "因幡はねる",
};

const createEvent = () =>
  ({
    persist: vi.fn<() => void>(),
    preventDefault: vi.fn<() => void>(),
  }) as unknown as FormEvent<HTMLFormElement>;

const renderUseHandleSubmit = () => {
  let methods: UseFormReturn<FormData> | undefined;

  const Wrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
    methods = useForm<FormData>({ defaultValues });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  const { result } = renderHook(() => useHandleSubmit("contact-form"), {
    wrapper: Wrapper,
  });

  if (!methods) {
    throw new Error("The form methods are not initialized.");
  }

  return { methods, result };
};

const fillForm = (methods: UseFormReturn<FormData>) => {
  act(() => {
    methods.setValue("email", submissionData.email);
    methods.setValue("message", submissionData.message);
    methods.setValue("name", submissionData.name);
  });
};

describe(useHandleSubmit, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.useForm.mockReturnValue([
      { errors: null, result: null, submitting: false, succeeded: false },
      mocks.sendEmail,
      vi.fn<() => void>(),
    ]);
  });

  it("uses the given form key", () => {
    renderUseHandleSubmit();

    expect(mocks.useForm).toHaveBeenCalledWith("contact-form");
  });

  it("sends the submission data and resets the form when it succeeds", async () => {
    mocks.sendEmail.mockResolvedValueOnce();

    const { methods, result } = renderUseHandleSubmit();
    fillForm(methods);

    const [, handleSubmit] = result.current;
    await act(async () => {
      await handleSubmit(createEvent());
    });

    expect(mocks.sendEmail).toHaveBeenCalledExactlyOnceWith(submissionData);
    expect(methods.getValues()).toStrictEqual(defaultValues);
  });

  it("does not reset the form when it fails", async () => {
    mocks.sendEmail.mockRejectedValueOnce(
      new Error("Failed to send the email.")
    );

    const { methods, result } = renderUseHandleSubmit();
    fillForm(methods);

    const [, handleSubmit] = result.current;
    await act(async () => {
      await handleSubmit(createEvent());
    });

    expect(mocks.sendEmail).toHaveBeenCalledExactlyOnceWith(submissionData);
    expect(methods.getValues()).toStrictEqual(submissionData);
  });
});
