import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ShareLinks from "./share-links";

const getShareURL = (): URL => {
  const link = screen.getByRole("link", { name: "Xに共有する" });

  return new URL(link.getAttribute("href") ?? "");
};

describe(ShareLinks, () => {
  it("links to the X share intent with the default hashtags", () => {
    render(
      <ShareLinks text="テキスト" url="https://inaba-jinja.test/share/1" />
    );

    const url = getShareURL();

    expect(`${url.origin}${url.pathname}`).toBe(
      "https://twitter.com/intent/tweet"
    );
    expect(Object.fromEntries(url.searchParams)).toStrictEqual({
      hashtags: "ねるくじ",
      related: "Haneru_Inaba",
      text: "テキスト",
      url: "https://inaba-jinja.test/share/1",
      via: "Inaba_Jinja",
    });
  });

  it("joins the given hashtags with commas", () => {
    render(
      <ShareLinks hashtags={["a", "b"]} url="https://inaba-jinja.test/" />
    );

    expect(getShareURL().searchParams.get("hashtags")).toBe("a,b");
  });

  it("omits the text when it is not given", () => {
    render(<ShareLinks url="https://inaba-jinja.test/" />);

    expect(getShareURL().searchParams.get("text")).toBeNull();
  });

  it("opens the link in a new tab without the opener", () => {
    render(<ShareLinks url="https://inaba-jinja.test/" />);

    const link = screen.getByRole("link", { name: "Xに共有する" });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
