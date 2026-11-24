"use client";

import { FormspreeProvider, useSubmit } from "@formspree/react";
import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";

import FormControl from "./form-control";
import { fieldNames, validate, validateField } from "./validation";
import type { ContactFormValues, FieldErrors, FieldName } from "./validation";

type Field = HTMLInputElement | HTMLTextAreaElement;

type Status = "failed" | "idle" | "submitting" | "succeeded";

const isFieldName = (name: string): name is FieldName =>
  fieldNames.some((fieldName) => fieldName === name);

const getValues = (form: HTMLFormElement): ContactFormValues => {
  const formData = new FormData(form);
  const values: ContactFormValues = { email: "", message: "", name: "" };

  for (const name of fieldNames) {
    const value = formData.get(name);

    if (typeof value === "string") {
      values[name] = value;
    }
  }

  return values;
};

const focusField = (form: HTMLFormElement, name: FieldName) => {
  const field = form.elements.namedItem(name);

  if (field instanceof HTMLElement) {
    field.focus();
  }
};

const Form = () => {
  const submit = useSubmit<ContactFormValues>("contact-form");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const isSubmitting = status === "submitting";

  const updateError = (name: FieldName, value: string) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleBlur = ({ currentTarget }: FocusEvent<Field>) => {
    if (isFieldName(currentTarget.name)) {
      updateError(currentTarget.name, currentTarget.value);
    }
  };

  // Once a field has an error, validate it on every change so that the error
  // disappears as soon as it is fixed.
  const handleChange = ({ currentTarget }: ChangeEvent<Field>) => {
    if (isFieldName(currentTarget.name) && errors[currentTarget.name]) {
      updateError(currentTarget.name, currentTarget.value);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const values = getValues(form);
    const nextErrors = validate(values);
    const firstInvalidField = fieldNames.find((name) => nextErrors[name]);

    setErrors(nextErrors);

    if (firstInvalidField) {
      setStatus("idle");
      focusField(form, firstInvalidField);

      return;
    }

    setStatus("submitting");

    try {
      const result = await submit(values);

      if (result.kind === "error") {
        setStatus("failed");

        return;
      }
    } catch {
      setStatus("failed");

      return;
    }

    form.reset();
    setStatus("succeeded");
  };

  return (
    <form aria-label="お問い合わせ" noValidate onSubmit={handleSubmit}>
      <dl>
        <FormControl
          autoComplete="name"
          disabled={isSubmitting}
          error={errors.name}
          label="お名前"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <FormControl
          autoComplete="email"
          disabled={isSubmitting}
          error={errors.email}
          label="メールアドレス"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="you@example.com"
          type="email"
        />

        <FormControl
          disabled={isSubmitting}
          error={errors.message}
          label="本文"
          multiline
          name="message"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </dl>

      <div className="mt-4">
        <button
          className="block w-full rounded-md bg-primary px-4 py-2.5 font-bold text-ink transition-colors hover:bg-primary-light disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "送信中…" : "送信"}
        </button>
      </div>

      {/* Keep the live region mounted so that its changes are announced. */}
      <output className="mt-4 block min-h-6">
        {status === "succeeded"
          ? "お問い合わせを送信しました。ありがとうございます。"
          : null}
      </output>

      {status === "failed" ? (
        <p className="text-danger" role="alert">
          送信に失敗しました。時間をおいてもう一度お試しください。
        </p>
      ) : null}
    </form>
  );
};

export default function ContactForm() {
  return (
    <FormspreeProvider project="1774341564403809704">
      <Form />
    </FormspreeProvider>
  );
}
