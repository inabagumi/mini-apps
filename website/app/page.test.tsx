import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { sections } from "#/lib/constants";
import products from "#/lib/products";

import Home from "./page";

const renderProduct = (id: string) => {
  const { container } = render(<Home />);
  const section = container.querySelector<HTMLElement>(`#${id}`);

  if (!section) {
    throw new Error("The section is not found.");
  }

  return section;
};

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

  it("lists the apps before the other products", () => {
    render(<Home />);

    expect(
      screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent)
    ).toStrictEqual([
      "ねるカメラ",
      "あにまーれ診断",
      "Haneru Beat!",
      "因幡神社",
      "SHINJU DATE",
    ]);
  });

  it.each(products)("has the section of $title", (product) => {
    const section = renderProduct(product.id);
    const queries = within(section);

    expect(section.tagName).toBe("SECTION");
    expect(
      queries.getByRole("heading", { level: 3, name: product.title }).id
    ).toBe(section.getAttribute("aria-labelledby"));
    expect(queries.getByText(product.category)).toBeDefined();
    expect(queries.getByText(product.description)).toBeDefined();
  });

  it.each(products)("links to the resources of $title", (product) => {
    const section = renderProduct(product.id);
    const getHref = (name: string) =>
      within(section).getByRole("link", { name }).getAttribute("href");
    const releaseDate = section.querySelector("time");

    expect(getHref(new URL(product.website).hostname)).toBe(product.website);
    expect(getHref(product.repository.label)).toBe(product.repository.url);
    expect(releaseDate?.dateTime).toBe(product.releasedOn);
    expect(releaseDate?.closest("a")?.href).toBe(product.releaseAnnouncement);
    expect(
      product.technologies.map((technology) => getHref(technology.name))
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
