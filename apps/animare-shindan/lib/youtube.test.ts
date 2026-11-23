import { describe, expect, it } from "vitest";

import { createYouTubeEmbedURL, parseYouTubeVideoID } from "./youtube";

const VIDEO_ID = "3M7qAnXcuJI";

describe("parseYouTubeVideoID", () => {
  it.each([
    `https://youtu.be/${VIDEO_ID}`,
    `http://youtu.be/${VIDEO_ID}`,
    `https://youtu.be/${VIDEO_ID}?t=42`,
    `https://youtu.be/${VIDEO_ID}?si=abcdef`,
    `https://YOUTU.BE/${VIDEO_ID}`,
    `https://www.youtube.com/watch?v=${VIDEO_ID}`,
    `http://www.youtube.com/watch?v=${VIDEO_ID}`,
    `https://youtube.com/watch?v=${VIDEO_ID}`,
    `https://m.youtube.com/watch?v=${VIDEO_ID}`,
    `https://www.youtube.com/watch?v=${VIDEO_ID}&t=42s`,
    `https://www.youtube.com/watch?list=PL0123456789&v=${VIDEO_ID}`,
    `https://www.youtube.com/watch?v=${VIDEO_ID}#comments`,
  ])("extracts the video ID from %s", (url) => {
    expect(parseYouTubeVideoID(url)).toBe(VIDEO_ID);
  });

  it.each(["Cdf1PF6i_Zw", "-abcdefghij", "_ABCDEFGHIJ"])(
    "accepts the video ID %s",
    (id) => {
      expect(parseYouTubeVideoID(`https://youtu.be/${id}`)).toBe(id);
      expect(parseYouTubeVideoID(`https://www.youtube.com/watch?v=${id}`)).toBe(
        id
      );
    }
  );

  it.each([
    // Not a URL.
    "",
    "not a url",
    VIDEO_ID,
    `youtu.be/${VIDEO_ID}`,
    // Unsupported protocols.
    `ftp://youtu.be/${VIDEO_ID}`,
    `javascript://youtu.be/${VIDEO_ID}`,
    // Credentials and ports.
    `https://user@youtu.be/${VIDEO_ID}`,
    `https://user:pass@www.youtube.com/watch?v=${VIDEO_ID}`,
    `https://youtu.be:8443/${VIDEO_ID}`,
    // Unsupported hosts.
    `https://example.com/${VIDEO_ID}`,
    `https://example.com/watch?v=${VIDEO_ID}`,
    `https://youtu.be.example.com/${VIDEO_ID}`,
    `https://www.youtube.com.example.com/watch?v=${VIDEO_ID}`,
    `https://evil-youtube.com/watch?v=${VIDEO_ID}`,
    `https://music.youtube.com/watch?v=${VIDEO_ID}`,
    // Unsupported paths.
    "https://youtu.be/",
    `https://youtu.be/${VIDEO_ID}/extra`,
    `https://youtu.be/watch?v=${VIDEO_ID}`,
    `https://www.youtube.com/${VIDEO_ID}`,
    `https://www.youtube.com/embed/${VIDEO_ID}`,
    `https://www.youtube.com/watch/${VIDEO_ID}`,
    `https://www.youtube.com/watch?id=${VIDEO_ID}`,
    "https://www.youtube.com/watch",
    "https://www.youtube.com/channel/UC0123456789abcdefghijkl",
    // Invalid video IDs.
    "https://youtu.be/short",
    `https://youtu.be/${VIDEO_ID}x`,
    "https://youtu.be/abc%2Fdefghi",
    "https://youtu.be/abc.defghij",
    "https://www.youtube.com/watch?v=",
    "https://www.youtube.com/watch?v=short",
    `https://www.youtube.com/watch?v=${VIDEO_ID}x`,
    "https://www.youtube.com/watch?v=../../evil",
    "https://www.youtube.com/watch?v=abc%2Fdefghi",
  ])("rejects %s", (url) => {
    expect(parseYouTubeVideoID(url)).toBeNull();
  });
});

describe("createYouTubeEmbedURL", () => {
  it.each([
    `https://youtu.be/${VIDEO_ID}`,
    `https://www.youtube.com/watch?v=${VIDEO_ID}`,
    `https://www.youtube.com/watch?v=${VIDEO_ID}&t=42s`,
  ])("creates the embed URL from %s", (url) => {
    expect(createYouTubeEmbedURL(url)).toBe(
      `https://www.youtube.com/embed/${VIDEO_ID}`
    );
  });

  it.each([
    "not a url",
    `https://example.com/watch?v=${VIDEO_ID}`,
    `https://www.youtube.com/watch?id=${VIDEO_ID}`,
  ])("returns null for %s", (url) => {
    expect(createYouTubeEmbedURL(url)).toBeNull();
  });
});
