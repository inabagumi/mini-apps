import { twitterAccount } from "#/lib/constants";

const DEFAULT_HASHTAGS = ["ねるくじ"];

interface ShareLinkOptions {
  text?: string;
  url: string;
  hashtags?: string[];
}

const generateTweetShareURL = ({
  hashtags = DEFAULT_HASHTAGS,
  text,
  url,
}: ShareLinkOptions): string => {
  const tweetShareURL = new URL("https://x.com/intent/post");
  tweetShareURL.searchParams.append("hashtags", hashtags.join(","));
  tweetShareURL.searchParams.append("related", "Haneru_Inaba");

  if (text) {
    tweetShareURL.searchParams.append("text", text);
  }

  tweetShareURL.searchParams.append("url", url);
  tweetShareURL.searchParams.append("via", twitterAccount);

  return tweetShareURL.toString();
};

export default function ShareLinks({
  hashtags,
  text,
  url,
}: {
  hashtags?: string[];
  text?: string;
  url: string;
}) {
  const tweetShereURL = generateTweetShareURL({ hashtags, text, url });

  return (
    <nav className="mt-12">
      <ul className="flex items-center justify-center">
        <li>
          <a
            className="inline-block rounded-full bg-x px-6 py-2 text-sm font-semibold tracking-wide text-white"
            href={tweetShereURL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Xに共有する
          </a>
        </li>
      </ul>
    </nav>
  );
}
