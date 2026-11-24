import type { ChangeEventHandler, FocusEventHandler } from "react";

import type { FieldName } from "./validation";

type Field = HTMLInputElement | HTMLTextAreaElement;

const fieldClassName =
  "block w-full rounded-md border border-muted bg-surface px-3 py-2 font-mono text-base text-foreground placeholder:text-muted/70 focus:border-accent disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:bg-danger-surface aria-invalid:focus:border-accent aria-invalid:focus:bg-surface";

export default function FormControl({
  autoComplete,
  disabled = false,
  error,
  label,
  multiline = false,
  name,
  onBlur,
  onChange,
  placeholder,
  type = "text",
}: Readonly<{
  autoComplete?: string;
  disabled?: boolean;
  error?: string | undefined;
  label: string;
  multiline?: boolean;
  name: FieldName;
  onBlur?: FocusEventHandler<Field>;
  onChange?: ChangeEventHandler<Field>;
  placeholder?: string;
  type?: string;
}>) {
  const fieldProps = {
    "aria-describedby": error ? `${name}-error` : undefined,
    "aria-invalid": error ? true : undefined,
    autoComplete,
    disabled,
    id: name,
    name,
    onBlur,
    onChange,
    placeholder,
    required: true,
  };

  return (
    <div className="mt-2 first:mt-0">
      <dt className="mb-1">
        <label htmlFor={name}>{label}</label>
      </dt>

      <dd>
        {multiline ? (
          <textarea
            {...fieldProps}
            // Grow with the content in the browsers that support
            // `field-sizing`. The other browsers show 10 rows.
            className={`${fieldClassName} field-sizing-content min-h-64 resize-y`}
            rows={10}
          />
        ) : (
          <input {...fieldProps} className={fieldClassName} type={type} />
        )}

        {/* Reserve the height of a line so that an error does not shift the fields below. */}
        <p className="mt-1 ml-2 min-h-5 text-sm leading-5">
          {error ? (
            <span className="text-danger" id={`${name}-error`} role="alert">
              {error}
            </span>
          ) : null}
        </p>
      </dd>
    </div>
  );
}
