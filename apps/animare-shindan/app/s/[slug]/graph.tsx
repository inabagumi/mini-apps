import { cn } from "cn";
import type { JSX } from "react";

import type { ResultParameter } from "@/lib/analysis";

interface Props {
  parameters: ResultParameter[];
  title: string;
}

export default function Graph({ parameters, title }: Props): JSX.Element {
  return (
    <div className="mb-5">
      <h3 className="-mx-5 mt-7 mb-0 bg-line p-2 text-center text-sm sm:mx-0 sm:text-base">
        {title}
      </h3>

      <dl className="m-0 pt-4 pb-3 sm:pt-9 sm:pb-0">
        {parameters.map((parameter, i) => (
          <div className="flex" key={parameter.label}>
            <dt className="flex w-22 shrink-0 items-center border-r border-line py-2 pr-1 text-xs leading-[1.4] tracking-wide break-auto-phrase">
              <span className="motion-safe:animate-fade-in">
                {parameter.label}
              </span>
            </dt>
            <dd className="m-0 flex min-w-0 grow items-center py-2">
              <span className="sr-only">
                {Math.round(parameter.value * 100)}%
              </span>
              <div
                aria-hidden="true"
                className="h-11"
                style={{ width: `${parameter.value * 100}%` }}
              >
                <div
                  className={cn(
                    "h-full rounded-r-[3px] bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.15),rgb(255_255_255/0.15)_0.75rem,transparent_0.75rem,transparent_1.5rem)] motion-safe:animate-[fade-in_0.4s_linear,grow_1.8s_ease-in]",
                    i === 0 ? "bg-sky" : "bg-bar"
                  )}
                />
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
