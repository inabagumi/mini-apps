import type { useForm as useFormspree } from "@formspree/react";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import ContactForm from "./contact-form";
import type { FormData } from "./types";

vi.mock(import("@formspree/react"), () => ({
  useForm: vi.fn<typeof useFormspree>(() => [
    { errors: null, result: null, submitting: false, succeeded: false },
    vi.fn<ReturnType<typeof useFormspree>[1]>(),
    vi.fn<() => void>(),
  ]),
}));

// Use the same options as `src/pages/contact/index.tsx`.
const Wrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
  const methods = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const renderContactForm = () => {
  const { container } = render(<ContactForm />, { wrapper: Wrapper });
  const message = container.querySelector<HTMLTextAreaElement>(
    "textarea[name='message']"
  );

  if (!message) {
    throw new Error("The message field is not found.");
  }

  return {
    email: screen.getByRole("textbox", { name: "メールアドレス" }),
    form: screen.getByRole("form", { name: "お問い合わせ" }),
    message,
    name: screen.getByRole("textbox", { name: "お名前" }),
  };
};

describe(ContactForm, () => {
  it("does not show any errors initially", () => {
    renderContactForm();

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });

  it.each([
    ["name", "お名前の入力は必須です。"],
    ["email", "メールアドレスは必須です。"],
    ["message", "本文の入力は必須です。"],
  ] as const)(
    "shows an error when the %s field is left empty",
    async (field, errorMessage) => {
      const fields = renderContactForm();

      fireEvent.blur(fields[field]);

      const alert = await screen.findByRole("alert");

      expect(alert.textContent).toBe(errorMessage);
      expect(alert.id).toBe(`${field}-error`);
      expect(fields[field].getAttribute("aria-invalid")).toBe("true");
      expect(fields[field].getAttribute("aria-describedby")).toBe(
        `${field}-error`
      );
    }
  );

  it("shows errors for all empty fields when the form is submitted", async () => {
    const { form } = renderContactForm();

    fireEvent.submit(form);

    const alerts = await screen.findAllByRole("alert");

    expect(alerts.map((alert) => alert.textContent)).toStrictEqual([
      "お名前の入力は必須です。",
      "メールアドレスは必須です。",
      "本文の入力は必須です。",
    ]);
  });

  it("shows an error when the email address is invalid", async () => {
    const { email } = renderContactForm();

    fireEvent.change(email, { target: { value: "you.example.com" } });
    fireEvent.blur(email);

    const alert = await screen.findByRole("alert");

    expect(alert.textContent).toBe("メールアドレスには@が必要です。");
    expect(alert.id).toBe("email-error");
    expect(email.getAttribute("aria-invalid")).toBe("true");
  });

  it("does not show an error when the email address is valid", async () => {
    const { email, name } = renderContactForm();

    fireEvent.change(email, { target: { value: "you@example.com" } });
    fireEvent.blur(email);
    // Trigger validation of another field to wait for the email field to be
    // validated.
    fireEvent.blur(name);

    const alert = await screen.findByRole("alert");

    expect(alert.id).toBe("name-error");
    expect(email.getAttribute("aria-invalid")).toBeNull();
  });
});
