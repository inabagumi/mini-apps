import { act, render } from "@testing-library/react";
import type { useRouter } from "next/navigation";
import { Suspense } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Redirect from "./redirect";

type Router = ReturnType<typeof useRouter>;

const mocks = vi.hoisted(() => ({
  delay: vi.fn<(seconds?: number) => Promise<void>>(),
  push: vi.fn<Router["push"]>(),
}));

vi.mock(import("next/navigation"), () => ({
  useRouter: (): Router => ({
    back: vi.fn<Router["back"]>(),
    bfcacheId: "bfcache-id",
    forward: vi.fn<Router["forward"]>(),
    prefetch: vi.fn<Router["prefetch"]>(),
    push: mocks.push,
    refresh: vi.fn<Router["refresh"]>(),
    replace: vi.fn<Router["replace"]>(),
  }),
}));

// `Redirect` creates a new promise with `delay` on every render, so a real
// timer never settles while it is suspended (see #4744). Return the same
// promise from `delay` to test the redirect itself.
vi.mock(import("@/lib/timer"), () => ({ delay: mocks.delay }));

const renderRedirect = async (idPromise: Promise<string>) => {
  await act(() => {
    render(
      <Suspense fallback={null}>
        <Redirect idPromise={idPromise} />
      </Suspense>
    );
  });
};

describe(Redirect, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("waits for 2 seconds before redirecting", async () => {
    const delayed = Promise.withResolvers<undefined>();
    mocks.delay.mockReturnValue(delayed.promise);

    await renderRedirect(Promise.resolve("fortune-1"));

    expect(mocks.delay).toHaveBeenCalledWith(2);
    expect(mocks.push).not.toHaveBeenCalled();

    await act(async () => {
      delayed.resolve(undefined);
      await delayed.promise;
    });

    expect(mocks.push).toHaveBeenCalledExactlyOnceWith("/kuji/fortune-1");
  });

  it("waits for the fortune ID before redirecting", async () => {
    const fortuneID = Promise.withResolvers<string>();
    mocks.delay.mockResolvedValue();

    await renderRedirect(fortuneID.promise);

    expect(mocks.push).not.toHaveBeenCalled();

    await act(async () => {
      fortuneID.resolve("fortune-2");
      await fortuneID.promise;
    });

    expect(mocks.push).toHaveBeenCalledExactlyOnceWith("/kuji/fortune-2");
  });
});
