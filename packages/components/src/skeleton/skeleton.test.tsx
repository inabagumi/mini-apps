import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Skeleton from "./skeleton.js";

describe(Skeleton, () => {
  it("renders an empty span with the default classes", () => {
    const { container } = render(<Skeleton />);
    const element = container.firstElementChild;

    expect(element?.tagName).toBe("SPAN");
    expect(element?.childNodes).toHaveLength(0);
    expect(element?.className).toBe(
      "inline-block animate-pulse rounded-md bg-slate-200"
    );
  });

  it("appends the given className", () => {
    const { container } = render(<Skeleton className="h-4 w-24" />);

    expect(container.firstElementChild?.className).toBe(
      "inline-block animate-pulse rounded-md bg-slate-200 h-4 w-24"
    );
  });

  it("overrides conflicting default classes with the given className", () => {
    const { container } = render(
      <Skeleton className="block rounded-full bg-slate-300" />
    );

    expect(container.firstElementChild?.className).toBe(
      "animate-pulse block rounded-full bg-slate-300"
    );
  });
});
