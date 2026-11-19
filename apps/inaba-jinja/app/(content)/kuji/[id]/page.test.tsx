import { render, screen } from "@testing-library/react";
import type { Asset } from "contentful";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { FortuneEntry } from "#/lib/contentful";

import Page, { generateMetadata, generateStaticParams } from "./page";

class NotFoundError extends Error {
  constructor() {
    super("not found");
    this.name = "NotFoundError";
  }
}

const mocks = vi.hoisted(() => ({
  getFortune: vi.fn<(id?: string) => Promise<FortuneEntry>>(),
  getFortuneIDs: vi.fn<() => Promise<string[]>>(),
}));

vi.mock(import("#/lib/contentful"), () => ({
  getFortune: mocks.getFortune,
  getFortuneIDs: mocks.getFortuneIDs,
}));

vi.mock(import("next/navigation"), () => ({
  notFound: () => {
    throw new NotFoundError();
  },
}));

type FortuneAsset = Asset<"WITHOUT_UNRESOLVABLE_LINKS">;

const createAsset = (
  url: string,
  image?: { height: number; width: number }
): FortuneAsset =>
  ({
    fields: {
      file: {
        details: { image, size: 0 },
        url,
      },
    },
  }) as FortuneAsset;

const createFortune = ({
  card = createAsset("//images.ctfassets.net/space/card.png", {
    height: 600,
    width: 1000,
  }),
  paper = createAsset("//images.ctfassets.net/space/paper.png", {
    height: 1000,
    width: 500,
  }),
}: {
  card?: FortuneAsset;
  paper?: FortuneAsset;
} = {}) =>
  ({
    fields: {
      blessing: "大吉",
      card,
      description: "説明",
      number: 1,
      paper,
      prePaper: "data:image/gif;base64,R0lGODlhAQABAAAAACw=",
    },
    sys: { id: "fortune-1" },
  }) as unknown as FortuneEntry;

const createProps = (id = "fortune-1") => ({
  params: Promise.resolve({ id }),
});

describe("kuji/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe(generateStaticParams, () => {
    it("returns the params for all fortunes", async () => {
      mocks.getFortuneIDs.mockResolvedValueOnce(["a", "b"]);

      await expect(generateStaticParams()).resolves.toStrictEqual([
        { id: "a" },
        { id: "b" },
      ]);
    });
  });

  describe(generateMetadata, () => {
    it("builds the metadata from the fortune", async () => {
      mocks.getFortune.mockResolvedValueOnce(createFortune());

      const metadata = await generateMetadata(createProps());

      expect(mocks.getFortune).toHaveBeenCalledWith("fortune-1");
      expect(metadata).toStrictEqual({
        alternates: {
          canonical: "/kuji/fortune-1",
        },
        description: "説明",
        openGraph: {
          description: "説明",
          images: [
            {
              height: 600,
              url: "https://images.ctfassets.net/space/card.png",
              width: 1000,
            },
          ],
          siteName: "因幡神社",
          title: "因幡はねるくじ 第1番『大吉』",
          type: "article",
          url: "/kuji/fortune-1",
        },
        title: "因幡はねるくじ 第1番『大吉』",
        twitter: {
          card: "summary_large_image",
          site: "@Inaba_Jinja",
          title: "因幡はねるくじ 第1番『大吉』 - 因幡神社",
        },
      });
    });

    it("falls back to the default image size", async () => {
      mocks.getFortune.mockResolvedValueOnce(
        createFortune({
          card: createAsset("//images.ctfassets.net/space/card.png"),
        })
      );

      const metadata = await generateMetadata(createProps());

      expect(metadata?.openGraph?.images).toStrictEqual([
        {
          height: 630,
          url: "https://images.ctfassets.net/space/card.png",
          width: 1200,
        },
      ]);
    });

    it("calls notFound when the fortune is not found", async () => {
      mocks.getFortune.mockRejectedValueOnce(new Error("not found"));

      await expect(generateMetadata(createProps())).rejects.toThrow(
        NotFoundError
      );
    });

    it("calls notFound when the card has no file", async () => {
      mocks.getFortune.mockResolvedValueOnce(
        createFortune({ card: { fields: {} } as FortuneAsset })
      );

      await expect(generateMetadata(createProps())).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe(Page, () => {
    it("renders the name and the paper of the fortune", async () => {
      mocks.getFortune.mockResolvedValueOnce(createFortune());

      render(await Page(createProps()));

      expect(
        screen.getByRole("heading", { level: 1, name: "第1番『大吉』" })
      ).toBeInTheDocument();

      const image = screen.getByRole("img", { name: "第1番『大吉』" });

      expect(image).toHaveAttribute("width", "250");
      expect(image).toHaveAttribute("height", "500");
      expect(image.getAttribute("src")).toContain(
        encodeURIComponent("https://images.ctfassets.net/space/paper.png")
      );
    });

    it("falls back to the default paper size", async () => {
      mocks.getFortune.mockResolvedValueOnce(
        createFortune({
          paper: createAsset("//images.ctfassets.net/space/paper.png"),
        })
      );

      render(await Page(createProps()));

      const image = screen.getByRole("img", { name: "第1番『大吉』" });

      expect(image).toHaveAttribute("width", "254");
      expect(image).toHaveAttribute("height", "540");
    });

    it("shares the share URL of the fortune", async () => {
      mocks.getFortune.mockResolvedValueOnce(createFortune());

      render(await Page(createProps()));

      const shareURL = new URL(
        screen
          .getByRole("link", { name: "Xに共有する" })
          .getAttribute("href") ?? ""
      );

      expect(shareURL.searchParams.get("url")).toBe(
        "https://inaba-jinja.test/share/fortune-1"
      );
      expect(shareURL.searchParams.get("text")).toBe(
        "わたしの運勢は『大吉』でした！ あなたもおみくじを引いてみてね"
      );
    });

    it("calls notFound when the fortune is not found", async () => {
      mocks.getFortune.mockRejectedValueOnce(new Error("not found"));

      await expect(Page(createProps())).rejects.toThrow(NotFoundError);
    });

    it("calls notFound when the paper has no file", async () => {
      mocks.getFortune.mockResolvedValueOnce(
        createFortune({ paper: { fields: {} } as FortuneAsset })
      );

      await expect(Page(createProps())).rejects.toThrow(NotFoundError);
    });
  });
});
