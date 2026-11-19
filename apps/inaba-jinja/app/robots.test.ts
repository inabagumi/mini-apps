import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import robots from "./robots";

describe(robots, () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://inaba-jinja.test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds the sitemap URL from NEXT_PUBLIC_BASE_URL", () => {
    expect(robots()).toStrictEqual({
      rules: {
        allow: "/",
        userAgent: "*",
      },
      sitemap: "https://inaba-jinja.test/sitemap.xml",
    });
  });
});
