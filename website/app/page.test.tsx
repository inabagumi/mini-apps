import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { sections } from "#/lib/constants";
import products from "#/lib/products";

import Home from "./page";

describe(Home, () => {
  it("shows the title of the website as the top-level heading", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Haneru Developers"
    );
  });

  it.each(sections)("has the $id section", ({ id }) => {
    const { container } = render(<Home />);

    const section = container.querySelector(`#${id}`);

    expect(section?.tagName).toBe("SECTION");
    expect(section?.querySelector("h2")?.id).toBe(
      section?.getAttribute("aria-labelledby")
    );
  });

  it.each(products)("shows the details of $title", (product) => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      level: 3,
      name: product.title,
    });
    const card = heading.closest("li");

    if (!card) {
      throw new Error("The card is not found.");
    }

    const links = within(card);

    expect(
      links.getByRole("link", { name: "ウェブサイト" }).getAttribute("href")
    ).toBe(product.website);
    expect(
      links.getByRole("link", { name: "ソースコード" }).getAttribute("href")
    ).toBe(product.source);
    expect(card.querySelector("time")?.dateTime).toBe(product.releasedOn);
    expect(
      product.technologies.map((technology) =>
        links.getByRole("link", { name: technology.name }).getAttribute("href")
      )
    ).toStrictEqual(product.technologies.map((technology) => technology.url));
  });

  it("formats the release date in Japanese", () => {
    render(<Home />);

    expect(screen.getByText("2018年10月29日").tagName).toBe("TIME");
  });

  it("shows the contact form", () => {
    render(<Home />);

    expect(screen.getByRole("form", { name: "お問い合わせ" })).toBeDefined();
  });
});
