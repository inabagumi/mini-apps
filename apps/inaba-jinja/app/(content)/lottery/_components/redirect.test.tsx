import { act, render } from "@testing-library/react";
import type { useRouter } from "next/navigation";
import { Suspense } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Redirect from "./redirect";

type Router = ReturnType<typeof useRouter>;

const mocks = vi.hoisted(() => ({
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

  it("redirects to the fortune once the ID is resolved", async () => {
    await renderRedirect(Promise.resolve("fortune-1"));

    expect(mocks.push).toHaveBeenCalledExactlyOnceWith("/kuji/fortune-1");
  });

  it("waits for the fortune ID before redirecting", async () => {
    const fortuneID = Promise.withResolvers<string>();

    await renderRedirect(fortuneID.promise);

    expect(mocks.push).not.toHaveBeenCalled();

    await act(async () => {
      fortuneID.resolve("fortune-2");
      await fortuneID.promise;
    });

    expect(mocks.push).toHaveBeenCalledExactlyOnceWith("/kuji/fortune-2");
  });
});
