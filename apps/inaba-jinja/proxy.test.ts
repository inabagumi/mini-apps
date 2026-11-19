// @vitest-environment node

import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { proxy } from "./proxy";

const createRequest = (userAgent: string) =>
  new NextRequest("https://inaba-jinja.test/share/fortune-1", {
    headers: { "user-agent": userAgent },
  });

describe(proxy, () => {
  it("redirects non-bot user agents to the top page", () => {
    const response = proxy(
      createRequest(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
      )
    );

    expect(response?.status).toBe(302);
    expect(response?.headers.get("location")).toBe("https://inaba-jinja.test/");
  });

  it.each([
    "Twitterbot/1.0",
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  ])("passes through bot user agents (%s)", (userAgent) => {
    expect(proxy(createRequest(userAgent))).toBeUndefined();
  });
});
