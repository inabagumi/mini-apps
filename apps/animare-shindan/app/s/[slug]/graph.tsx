import type { JSX } from "react";

import { cn } from "@/lib/cn";
import {
  formatParameterValue,
  getParameterBarRatio,
  getParameterScale,
} from "@/lib/parameters";
import type { ResultParameter } from "@/lib/parameters";

interface Props {
  parameters: ResultParameter[];
  title: string;
}

/**
 * Renders the parameters as a bar graph in their order, with the first one
 * highlighted. Each row shows the label, the bar and the value as a
 * percentage. The bars are scaled by {@link getParameterScale} so that they
 * never overflow the graph. Nothing is rendered without parameters.
 */
export default function Graph({
  parameters,
  title,
}: Props): JSX.Element | null {
  if (parameters.length === 0) {
    return null;
  }

  const scale = getParameterScale(parameters);

  return (
    <div className="mb-5">
      <h3 className="-mx-5 mt-7 mb-0 bg-line p-2 text-center text-sm sm:mx-0 sm:text-base">
        {title}
      </h3>

      <dl className="m-0 pt-4 pb-3 sm:pt-9 sm:pb-0">
        {parameters.map((parameter, i) => (
          <div className="flex" key={parameter.label}>
            <dt className="flex w-22 shrink-0 items-center border-r border-line py-2 pr-1 text-xs leading-snug tracking-wide break-auto-phrase">
              <span className="motion-safe:animate-fade-in">
                {parameter.label}
              </span>
            </dt>
            <dd className="m-0 flex min-w-0 grow items-center gap-2 py-2">
              <div aria-hidden="true" className="h-11 min-w-0 grow">
                <div
                  className="h-full"
                  style={{
                    width: `${getParameterBarRatio(parameter.value, scale) * 100}%`,
                  }}
                >
                  <div
                    className={cn(
                      "h-full rounded-r-sm bg-bar-stripes motion-safe:animate-bar-in",
                      i === 0 ? "bg-sky" : "bg-bar"
                    )}
                  />
                </div>
              </div>
              <span className="w-10 shrink-0 text-right text-xs font-bold tabular-nums motion-safe:animate-fade-in">
                {formatParameterValue(parameter.value)}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
