import { ErrorMessage } from "@hookform/error-message";
import type { RegisterOptions } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import type { FormData } from "./types";

const fieldClassName =
  "block w-full rounded-md border border-muted bg-surface px-3 py-2 font-mono text-base text-foreground placeholder:text-muted/70 focus:border-accent disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:bg-danger-surface aria-invalid:focus:border-accent aria-invalid:focus:bg-surface";

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
    <div className="mt-2">
      <dt className="my-1">
        <label htmlFor={name}>{label}</label>
      </dt>

      <dd>
        {multiline ? (
          <TextareaAutosize
            aria-describedby={isInvalid ? `${name}-error` : undefined}
            aria-invalid={isInvalid || undefined}
            aria-required={isRequired}
            className={`${fieldClassName} resize-none`}
            disabled={disabled}
            id={name}
            minRows={10}
            placeholder={placeholder}
            {...register(name, registerOptions)}
          />
        ) : (
          <input
            aria-describedby={isInvalid ? `${name}-error` : undefined}
            aria-invalid={isInvalid || undefined}
            aria-required={isRequired}
            className={fieldClassName}
            disabled={disabled}
            id={name}
            placeholder={placeholder}
            type={type}
            {...register(name, registerOptions)}
          />
        )}

        {/* Reserve the height of a line so that an error does not shift the fields below. */}
        <p className="mt-1 ml-2 min-h-5 text-sm leading-5">
          <ErrorMessage
            name={name}
            render={({ message }) => (
              <span className="text-danger" id={`${name}-error`} role="alert">
                {message}
              </span>
            )}
          />
        </p>
      </dd>
    </div>
  );
}
