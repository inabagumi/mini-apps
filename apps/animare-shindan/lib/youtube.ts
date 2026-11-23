/**
 * Utilities for YouTube video URLs.
 *
 * Supported URL formats:
 *
 * - `https://youtu.be/VIDEO_ID`
 * - `https://youtube.com/watch?v=VIDEO_ID`
 * - `https://www.youtube.com/watch?v=VIDEO_ID`
 * - `https://m.youtube.com/watch?v=VIDEO_ID`
 *
 * Both `http:` and `https:` are accepted, and extra query parameters (such as
 * `t` or `list`) are ignored. URLs with credentials or an explicit port are
 * rejected.
 */

const SHORT_URL_HOSTNAME = "youtu.be";

const WATCH_URL_HOSTNAMES = new Set([
  "m.youtube.com",
  "www.youtube.com",
  "youtube.com",
]);

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * A YouTube video ID consists of 11 characters of the URL-safe Base64
 * alphabet (`A-Z`, `a-z`, `0-9`, `-` and `_`).
 */
const VIDEO_ID_PATTERN = /^[\w-]{11}$/u;

const isValidVideoID = (id: string | null | undefined): id is string =>
  typeof id === "string" && VIDEO_ID_PATTERN.test(id);

const parseURL = (value: string): URL | null => {
  try {
    return new URL(value);
  } catch {
    return null;
  }
};

/**
 * Extracts the video ID from a supported YouTube video URL.
 *
 * Returns `null` when the URL cannot be parsed, is not a supported format or
 * does not contain a valid video ID.
 */
export const parseYouTubeVideoID = (value: string): string | null => {
  const url = parseURL(value);

  if (
    !url ||
    !ALLOWED_PROTOCOLS.has(url.protocol) ||
    url.username !== "" ||
    url.password !== "" ||
    url.port !== ""
  ) {
    return null;
  }

  const hostname = url.hostname.toLowerCase();

  if (hostname === SHORT_URL_HOSTNAME) {
    // The pathname is `/VIDEO_ID`. Anything else, such as additional path
    // segments, is not a video URL.
    const id = url.pathname.slice(1);

    return isValidVideoID(id) ? id : null;
  }

  if (WATCH_URL_HOSTNAMES.has(hostname) && url.pathname === "/watch") {
    const id = url.searchParams.get("v");

    return isValidVideoID(id) ? id : null;
  }

  return null;
};

/**
 * Creates the embed URL for a supported YouTube video URL.
 *
 * Returns `null` when the URL is not a supported YouTube video URL.
 */
export const createYouTubeEmbedURL = (value: string): string | null => {
  const id = parseYouTubeVideoID(value);

  return id ? `https://www.youtube.com/embed/${id}` : null;
};
