// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

import type { FortuneEntry } from "@/lib/contentful";

import { GET } from "./route";

const mocks = vi.hoisted(() => ({
  getFortune: vi.fn<(id?: string) => Promise<FortuneEntry>>(),
}));

vi.mock(import("@/lib/contentful"), () => ({ getFortune: mocks.getFortune }));

const callGET = (id: string) =>
  GET(new Request(`https://inaba-jinja.test/share/${id}`), {
    params: Promise.resolve({ id }),
  });

describe("GET /share/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to the fortune page when the fortune exists", async () => {
    mocks.getFortune.mockResolvedValueOnce({
      sys: { id: "fortune-1" },
    } as FortuneEntry);

    const response = await callGET("fortune-1");

    expect(mocks.getFortune).toHaveBeenCalledWith("fortune-1");
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      "https://inaba-jinja.test/kuji/fortune-1"
    );
  });

  it("returns 404 when the fortune is not found", async () => {
    mocks.getFortune.mockRejectedValueOnce(new Error("not found"));

    const response = await callGET("unknown");

    expect(response.status).toBe(404);
  });
});
