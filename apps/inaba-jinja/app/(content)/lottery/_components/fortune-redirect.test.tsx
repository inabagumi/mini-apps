import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import FortuneRedirect from "./fortune-redirect";

const mocks = vi.hoisted(() => ({
  connection: vi.fn<() => Promise<void>>(async () => {}),
  getAnyFortuneID: vi.fn<() => Promise<string>>(),
  redirect: vi.fn<(props: { idPromise: Promise<string> }) => null>(() => null),
}));

vi.mock(import("next/server"), () => ({ connection: mocks.connection }));

vi.mock(import("#/lib/contentful"), () => ({
  getAnyFortuneID: mocks.getAnyFortuneID,
}));

vi.mock(import("./redirect"), () => ({
  default: mocks.redirect,
}));

describe(FortuneRedirect, () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("waits for an incoming request and passes a fortune ID to the redirect after 2 seconds", async () => {
    vi.useFakeTimers();
    mocks.getAnyFortuneID.mockResolvedValueOnce("fortune-1");

    render(await FortuneRedirect());

    expect(mocks.connection).toHaveBeenCalledOnce();
    expect(mocks.getAnyFortuneID).toHaveBeenCalledOnce();

    const onResolve = vi.fn<(id: string) => void>();
    const idPromise =
      mocks.redirect.mock.lastCall?.[0].idPromise.then(onResolve);

    await vi.advanceTimersByTimeAsync(1999);
    expect(onResolve).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(onResolve).toHaveBeenCalledExactlyOnceWith("fortune-1");

    await idPromise;
  });

  it("does not draw a fortune before an incoming request", async () => {
    const { promise, resolve } = Promise.withResolvers<undefined>();
    mocks.connection.mockReturnValueOnce(promise);
    mocks.getAnyFortuneID.mockResolvedValueOnce("fortune-1");

    const element = FortuneRedirect();
    await Promise.resolve();

    expect(mocks.getAnyFortuneID).not.toHaveBeenCalled();

    resolve(undefined);
    await element;

    expect(mocks.getAnyFortuneID).toHaveBeenCalledOnce();
  });
});
