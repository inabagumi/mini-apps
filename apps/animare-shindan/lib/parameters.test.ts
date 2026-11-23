import { describe, expect, it } from "vitest";

import {
  MAX_PARAMETER_VALUE,
  MIN_PARAMETER_VALUE,
  findParameterProblems,
  formatParameterValue,
  getParameterBarRatio,
  getParameterScale,
  isValidParameterValue,
  parseParameters,
} from "./parameters";

describe("isValidParameterValue", () => {
  it.each([MIN_PARAMETER_VALUE, 0.5, 1, 1.05, MAX_PARAMETER_VALUE])(
    "accepts %d",
    (value) => {
      expect(isValidParameterValue(value)).toBe(true);
    }
  );

  it.each([
    -0.01,
    MAX_PARAMETER_VALUE + 0.01,
    105,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    "0.5",
    null,
    undefined,
  ])("rejects %s", (value) => {
    expect(isValidParameterValue(value)).toBe(false);
  });
});

describe("findParameterProblems", () => {
  it("reports no problems for valid parameters", () => {
    expect(
      findParameterProblems([
        { label: "メイド", value: 1.05 },
        { label: "お料理", value: 0.83 },
      ])
    ).toStrictEqual([]);
  });

  it("reports parameters that are not an array", () => {
    expect(findParameterProblems({ label: "メイド", value: 1 })).toStrictEqual([
      "The parameters are not an array",
    ]);
  });

  it("reports every invalid entry", () => {
    expect(
      findParameterProblems([
        null,
        { label: " ", value: 0.5 },
        { label: "メイド", value: Number.NaN },
        { label: "メイド", value: 0.5 },
        { value: 0.5 },
      ])
    ).toStrictEqual([
      "Parameter 0 is not an object",
      "Parameter 1 has an invalid label",
      "Parameter 2 has an invalid value: NaN",
      "Parameter 3 has a duplicate label: メイド",
      "Parameter 4 has an invalid label",
    ]);
  });
});

describe("parseParameters", () => {
  it("keeps valid parameters in their order", () => {
    expect(
      parseParameters([
        { label: "メイド", value: 1.05 },
        { label: "お料理", value: 0.83 },
        { label: "清楚", value: 0.61 },
      ])
    ).toStrictEqual([
      { label: "メイド", value: 1.05 },
      { label: "お料理", value: 0.83 },
      { label: "清楚", value: 0.61 },
    ]);
  });

  it("drops extra properties", () => {
    expect(
      parseParameters([{ extra: true, label: "メイド", value: 1 }])
    ).toStrictEqual([{ label: "メイド", value: 1 }]);
  });

  it("skips invalid entries and duplicate labels", () => {
    expect(
      parseParameters([
        "メイド",
        [],
        { label: "", value: 0.5 },
        { label: 1, value: 0.5 },
        { label: "負", value: -0.1 },
        { label: "過大", value: 105 },
        { label: "文字列", value: "0.5" },
        { label: "メイド", value: 0.5 },
        { label: "メイド", value: 0.8 },
      ])
    ).toStrictEqual([{ label: "メイド", value: 0.5 }]);
  });

  it.each([null, undefined, "[]", 1, { label: "メイド", value: 1 }])(
    "returns no parameters for %s",
    (json) => {
      expect(parseParameters(json)).toStrictEqual([]);
    }
  );
});

describe("getParameterScale", () => {
  it("is 100% when no value exceeds 100%", () => {
    expect(
      getParameterScale([
        { label: "a", value: 0.8 },
        { label: "b", value: 1 },
      ])
    ).toBe(1);
  });

  it("is the highest value when a value exceeds 100%", () => {
    expect(
      getParameterScale([
        { label: "a", value: 1.05 },
        { label: "b", value: 0.8 },
      ])
    ).toBe(1.05);
  });

  it("is 100% without parameters", () => {
    expect(getParameterScale([])).toBe(1);
  });

  it("ignores invalid values", () => {
    expect(
      getParameterScale([
        { label: "a", value: Number.POSITIVE_INFINITY },
        { label: "b", value: 105 },
        { label: "c", value: 0.5 },
      ])
    ).toBe(1);
  });
});

describe("getParameterBarRatio", () => {
  it("divides the value by the scale", () => {
    expect(getParameterBarRatio(0.5, 1)).toBe(0.5);
    expect(getParameterBarRatio(1.05, 1.05)).toBe(1);
  });

  it("clamps the ratio from 0 to 1", () => {
    expect(getParameterBarRatio(-0.5, 1)).toBe(0);
    expect(getParameterBarRatio(105, 1.05)).toBe(1);
  });

  it.each([
    [Number.NaN, 1],
    [Number.POSITIVE_INFINITY, 1],
    [0.5, 0],
    [0.5, -1],
    [0.5, Number.NaN],
  ])("is 0 for the value %d and the scale %d", (value, scale) => {
    expect(getParameterBarRatio(value, scale)).toBe(0);
  });
});

describe("formatParameterValue", () => {
  it.each([
    [0, "0%"],
    [0.3, "30%"],
    [0.834, "83%"],
    [1, "100%"],
    [1.05, "105%"],
  ])("formats %d as %s", (value, expected) => {
    expect(formatParameterValue(value)).toBe(expected);
  });
});
