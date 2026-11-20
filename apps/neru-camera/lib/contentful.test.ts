import type { createClient as createContentfulClient } from "contentful";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createClient } from "./contentful";

const mocks = vi.hoisted(() => ({
  createClient: vi.fn<
    (params: { accessToken: string; space: string }) => object
  >(() => ({})),
}));

vi.mock(import("contentful"), () => ({
  createClient: mocks.createClient as unknown as typeof createContentfulClient,
}));

describe(createClient, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN", "access-token");
    vi.stubEnv("NEXT_PUBLIC_CONTENTFUL_SPACE_ID", "space-id");
    vi.stubEnv("CONTENTFUL_HOST", "");
    vi.stubEnv("CONTENTFUL_INSECURE", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("creates a client with the access token and space ID", () => {
    const client = createClient();

    expect(mocks.createClient).toHaveBeenCalledExactlyOnceWith({
      accessToken: "access-token",
      space: "space-id",
    });
    expect(client).toBe(mocks.createClient.mock.results[0]?.value);
  });

  it("connects to the host given by CONTENTFUL_HOST", () => {
    vi.stubEnv("CONTENTFUL_HOST", "localhost:4000");
    vi.stubEnv("CONTENTFUL_INSECURE", "true");

    createClient();

    expect(mocks.createClient).toHaveBeenCalledExactlyOnceWith({
      accessToken: "access-token",
      host: "localhost:4000",
      insecure: true,
      space: "space-id",
    });
  });

  it("uses HTTPS unless CONTENTFUL_INSECURE is true", () => {
    vi.stubEnv("CONTENTFUL_HOST", "preview.contentful.com");

    createClient();

    expect(mocks.createClient).toHaveBeenCalledExactlyOnceWith({
      accessToken: "access-token",
      host: "preview.contentful.com",
      insecure: false,
      space: "space-id",
    });
  });

  it("throws a TypeError when the access token is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN", "");

    expect(() => createClient()).toThrow(
      new TypeError("The access token is required.")
    );
    expect(mocks.createClient).not.toHaveBeenCalled();
  });

  it("throws a TypeError when the space ID is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTENTFUL_SPACE_ID", "");

    expect(() => createClient()).toThrow(
      new TypeError("The space ID is required.")
    );
    expect(mocks.createClient).not.toHaveBeenCalled();
  });
});
