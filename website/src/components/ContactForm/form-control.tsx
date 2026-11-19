import { ErrorMessage } from "@hookform/error-message";
import TextField from "@site/src/components/text-field";
import { clsx } from "clsx";
import type { RegisterOptions } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import type { FormData } from "./types";

import styles from "./form-control.module.css";

export default function FormControl<Name extends keyof FormData>({
  disabled = false,
  label,
  multiline = false,
  name,
  placeholder,
  registerOptions,
  type = "text",
}: Readonly<{
  disabled?: boolean;
  label: string;
  multiline?: boolean;
  name: Name;
  placeholder?: string;
  registerOptions?: RegisterOptions<FormData, Name>;
  type?: string;
}>) {
  const {
    formState: { errors },
    register,
  } = useFormContext<FormData>();

  let isRequired = false;
  if (registerOptions && "required" in registerOptions) {
    isRequired =
      typeof registerOptions.required === "object"
        ? (registerOptions.required.value ?? false)
        : registerOptions.required !== false;
  }
  const isInvalid = name in errors;

  return (
    <div className="margin-top--sm">
      <dt className="margin-vert--xs">
        <label htmlFor={name}>{label}</label>
      </dt>

      <dd className="margin--none">
        {multiline ? (
          <TextareaAutosize
            aria-describedby={isInvalid ? `${name}-error` : undefined}
            aria-invalid={isInvalid || undefined}
            aria-required={isRequired}
            className={styles.textarea}
            disabled={disabled}
            id={name}
            minRows={10}
            placeholder={placeholder}
            {...register(name, registerOptions)}
          />
        ) : (
          <TextField
            aria-describedby={isInvalid ? `${name}-error` : undefined}
            aria-invalid={isInvalid || undefined}
            aria-required={isRequired}
            block
            disabled={disabled}
            id={name}
            placeholder={placeholder}
            type={type}
            {...register(name, registerOptions)}
          />
        )}

        <p
          className={clsx(
            "margin-bottom--none",
            "margin-left--sm",
            "margin-top--xs",
            styles.notice
          )}
        >
          <ErrorMessage
            name={name}
            render={({ message }) => (
              <span className="text--danger" id={`${name}-error`} role="alert">
                {message}
              </span>
            )}
          />
        </p>
      </dd>
    </div>
  );
}
