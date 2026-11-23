import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Graph from "./graph";

const TITLE = "オタクパラメーター";

const getRows = (): HTMLElement[] => [
  ...document.querySelectorAll<HTMLElement>("dl > div"),
];

const getBarWidth = (row: HTMLElement): string | undefined =>
  row.querySelector<HTMLElement>("[aria-hidden='true'] > div")?.style.width;

describe(Graph, () => {
  it("shows the label and the value of each parameter in their order", () => {
    render(
      <Graph
        parameters={[
          { label: "メイド", value: 1.05 },
          { label: "お料理", value: 0.83 },
          { label: "清楚", value: 0.61 },
        ]}
        title={TITLE}
      />
    );

    expect(screen.getByRole("heading", { name: TITLE })).toBeInTheDocument();
    expect(
      getRows().map((row) => [
        within(row).getByRole("term").textContent,
        within(row).getByRole("definition").textContent,
      ])
    ).toStrictEqual([
      ["メイド", "105%"],
      ["お料理", "83%"],
      ["清楚", "61%"],
    ]);
  });

  it("scales the bars to the highest value when it exceeds 100%", () => {
    render(
      <Graph
        parameters={[
          { label: "a", value: 1.05 },
          { label: "b", value: 0.21 },
        ]}
        title={TITLE}
      />
    );

    expect(getRows().map((row) => getBarWidth(row))).toStrictEqual([
      "100%",
      "20%",
    ]);
  });

  it("does not scale the bars when no value exceeds 100%", () => {
    render(
      <Graph
        parameters={[
          { label: "a", value: 0.5 },
          { label: "b", value: 0.25 },
        ]}
        title={TITLE}
      />
    );

    expect(getRows().map((row) => getBarWidth(row))).toStrictEqual([
      "50%",
      "25%",
    ]);
  });

  it("renders nothing without parameters", () => {
    const { container } = render(<Graph parameters={[]} title={TITLE} />);

    expect(container).toBeEmptyDOMElement();
  });
});
