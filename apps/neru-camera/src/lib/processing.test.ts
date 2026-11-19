import type { Mock, MockInstance } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import processing from "./processing";

type DrawImage = (image: CanvasImageSource, dx: number, dy: number) => void;
type GetContext = (contextId: "2d") => CanvasRenderingContext2D | null;

const createPixiView = (): HTMLCanvasElement => {
  const pixiView = document.createElement("canvas");

  pixiView.width = 640;
  pixiView.height = 480;

  return pixiView;
};

describe(processing, () => {
  let drawImage: Mock<DrawImage>;
  let getContext: MockInstance<GetContext>;
  let toBlob: MockInstance<HTMLCanvasElement["toBlob"]>;

  beforeEach(() => {
    drawImage = vi.fn<DrawImage>();
    // jsdom does not implement the Canvas API.
    getContext = vi.spyOn(
      HTMLCanvasElement.prototype,
      "getContext"
    ) as unknown as MockInstance<GetContext>;
    getContext.mockReturnValue({
      drawImage,
    } as unknown as CanvasRenderingContext2D);
    toBlob = vi
      .spyOn(HTMLCanvasElement.prototype, "toBlob")
      .mockImplementation((onBlob, type) => {
        onBlob(new Blob(["image"], { type }));
      });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("draws the canvas with a 2D context", async () => {
    const pixiView = createPixiView();

    await processing(pixiView);

    expect(getContext).toHaveBeenCalledExactlyOnceWith("2d");
    expect(drawImage).toHaveBeenCalledExactlyOnceWith(pixiView, 0, 0);
  });

  it("creates a new canvas of the same size", async () => {
    const pixiView = createPixiView();
    const canvases: HTMLCanvasElement[] = [];

    toBlob.mockImplementation(function toBlobMock(
      this: HTMLCanvasElement,
      onBlob
    ) {
      canvases.push(this);
      onBlob(new Blob(["image"]));
    });

    await processing(pixiView);

    expect(canvases).toHaveLength(1);
    expect(canvases[0]).not.toBe(pixiView);
    expect(canvases[0]).toHaveProperty("width", 640);
    expect(canvases[0]).toHaveProperty("height", 480);
  });

  it("resolves with a PNG blob by default", async () => {
    const blob = await processing(createPixiView());

    expect(toBlob).toHaveBeenCalledExactlyOnceWith(
      expect.any(Function),
      "image/png",
      1
    );
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("image/png");
  });

  it("passes the type and quality to canvas.toBlob()", async () => {
    const blob = await processing(createPixiView(), "image/jpeg", 0.8);

    expect(toBlob).toHaveBeenCalledExactlyOnceWith(
      expect.any(Function),
      "image/jpeg",
      0.8
    );
    expect(blob.type).toBe("image/jpeg");
  });

  it("rejects with a TypeError when the 2D context does not exist", async () => {
    getContext.mockReturnValue(null);

    await expect(processing(createPixiView())).rejects.toThrow(
      new TypeError("Canvas context does not exist.")
    );
    expect(toBlob).not.toHaveBeenCalled();
  });

  it("rejects with a TypeError when the blob does not exist", async () => {
    toBlob.mockImplementation((onBlob) => {
      onBlob(null);
    });

    await expect(processing(createPixiView())).rejects.toThrow(
      new TypeError("Blob does not exists.")
    );
  });

  it("rejects with the error thrown while drawing", async () => {
    const error = new Error("The canvas has been tainted.");

    drawImage.mockImplementation(() => {
      throw error;
    });

    await expect(processing(createPixiView())).rejects.toBe(error);
    expect(toBlob).not.toHaveBeenCalled();
  });

  it("rejects with an Error when a non-Error value is thrown", async () => {
    toBlob.mockImplementation(() => {
      // oxlint-disable-next-line no-throw-literal -- Tests a thrown non-Error value.
      throw "unexpected";
    });

    await expect(processing(createPixiView())).rejects.toThrow(
      new Error("An Unexpected Error has occurred.")
    );
  });
});
