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

  it("draws the bars at the length of their values", () => {
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
      "min(50%, 100% + 0.75rem)",
      "min(25%, 100% + 0.75rem)",
    ]);
  });

  // A bar over 100% overflows the graph, but no more than the padding around
  // it.
  it("lets a bar over 100% overflow the graph by up to 0.75rem", () => {
    render(
      <Graph
        parameters={[
          { label: "a", value: 1.05 },
          { label: "b", value: 0.8 },
        ]}
        title={TITLE}
      />
    );

    expect(getRows().map((row) => getBarWidth(row))).toStrictEqual([
      "min(105%, 100% + 0.75rem)",
      "min(80%, 100% + 0.75rem)",
    ]);
  });

  it("renders nothing without parameters", () => {
    const { container } = render(<Graph parameters={[]} title={TITLE} />);

    expect(container).toBeEmptyDOMElement();
  });
});
