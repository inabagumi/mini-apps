import type { UniformGroup } from "pixi.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ChromaKeyFilter } from "./filters";

const getKeyColorUniform = (filter: ChromaKeyFilter): Float32Array =>
  (
    filter.resources.chromaKeyUniforms as UniformGroup<{
      uKeyColor: { type: "vec3<f32>"; value: Float32Array };
    }>
  ).uniforms.uKeyColor;

describe(ChromaKeyFilter, () => {
  beforeEach(() => {
    // jsdom does not implement WebGL. Pixi.js falls back to the default
    // shader precision when it cannot get a WebGL context.
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses green as the key color by default", () => {
    const filter = new ChromaKeyFilter();

    expect(filter.keyColor).toBe("#00ff00");
    expect(getKeyColorUniform(filter)).toStrictEqual(
      new Float32Array([0, 1, 0])
    );
  });

  it("uses the key color passed to the constructor", () => {
    const filter = new ChromaKeyFilter("#0000ff");

    expect(filter.keyColor).toBe("#0000ff");
    expect(getKeyColorUniform(filter)).toStrictEqual(
      new Float32Array([0, 0, 1])
    );
  });

  it("returns the key color that has been set", () => {
    const filter = new ChromaKeyFilter();

    filter.keyColor = "#ff0000";

    expect(filter.keyColor).toBe("#ff0000");
    expect(getKeyColorUniform(filter)).toStrictEqual(
      new Float32Array([1, 0, 0])
    );
  });

  it("normalizes the key color to a hex string", () => {
    const filter = new ChromaKeyFilter("rgb(255, 128, 0)");

    expect(filter.keyColor).toBe("#ff8000");
  });
});
