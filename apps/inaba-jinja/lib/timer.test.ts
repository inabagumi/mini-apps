import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { delay } from "./timer";

describe(delay, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves after the given number of seconds", async () => {
    const onResolve = vi.fn<() => void>();
    const promise = delay(2).then(onResolve);

    await vi.advanceTimersByTimeAsync(1999);
    expect(onResolve).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(onResolve).toHaveBeenCalledOnce();

    await promise;
  });

  it("resolves after 1 second by default", async () => {
    const onResolve = vi.fn<() => void>();
    const promise = delay().then(onResolve);

    await vi.advanceTimersByTimeAsync(999);
    expect(onResolve).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(onResolve).toHaveBeenCalledOnce();

    await promise;
  });
});
