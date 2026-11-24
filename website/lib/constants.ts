export const baseUrl = "https://haneru.dev";
export const description =
  "Haneru Developers はバーチャル YouTuber の因幡はねるさんをテーマとしたアプリやサービスの開発を主として行うコミュニティです。";
export const tagline = "ねるねるアプリの世界へようこそ";
export const title = "Haneru Developers";

/**
 * The sections of the top page. Each `id` is the fragment that the navigation
 * and the redirects in `next.config.ts` link to.
 */
export const sections = [
  { id: "about", label: "概要" },
  { id: "products", label: "プロダクト" },
  { id: "contact", label: "お問い合わせ" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
