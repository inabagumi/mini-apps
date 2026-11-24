import type { StaticImageData } from "next/image";

import animareShindan from "#/assets/showcase/animare-shindan.jpg";
import hanerubeat from "#/assets/showcase/hanerubeat.jpg";
import inabaJinja from "#/assets/showcase/inaba-jinja.jpg";
import neruCamera from "#/assets/showcase/neru-camera.jpg";
import shinjuDate from "#/assets/showcase/shinju-date.jpg";

const technologies = {
  Contentful: "https://www.contentful.com/",
  "Next.js": "https://nextjs.org/",
  "Node.js": "https://nodejs.org/ja/",
  PixiJS: "https://www.pixijs.com/",
  React: "https://ja.react.dev/",
  Supabase: "https://supabase.com/",
  "Tailwind CSS": "https://tailwindcss.com/",
  TypeScript: "https://www.typescriptlang.org/",
  "YouTube Data API":
    "https://developers.google.com/youtube/v3/getting-started?hl=ja",
} as const;

type TechnologyName = keyof typeof technologies;

export interface Technology {
  name: TechnologyName;
  url: string;
}

export interface Product {
  description: string;
  id: string;
  preview: StaticImageData;
  /** The post that announced the release. */
  releaseAnnouncement: string;
  /** The date of the release in the ISO 8601 format (`YYYY-MM-DD`). */
  releasedOn: string;
  source: string;
  technologies: Technology[];
  title: string;
  website: string;
}

const toTechnologies = (names: TechnologyName[]): Technology[] =>
  names.map((name) => ({ name, url: technologies[name] }));

const products: Product[] = [
  {
    description:
      "因幡はねるさんと一緒に写真が撮れるアプリです。ねるちゃんとの幸せなひとときをあなたに。",
    id: "neru-camera",
    preview: neruCamera,
    releaseAnnouncement: "https://x.com/ykzts/status/1056572968375992320",
    releasedOn: "2018-10-29",
    source: "https://github.com/inabagumi/mini-apps/tree/main/apps/neru-camera",
    technologies: toTechnologies([
      "Node.js",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "PixiJS",
      "Contentful",
    ]),
    title: "ねるカメラ",
    website: "https://neru.camera/",
  },
  {
    description:
      "好みと推しVTuberを無意識から探るためのアプリです。アナタはどんなオタクタイプ?",
    id: "animare-shindan",
    preview: animareShindan,
    releaseAnnouncement: "https://x.com/ykzts/status/1076925017240231937",
    releasedOn: "2018-12-24",
    source:
      "https://github.com/inabagumi/mini-apps/tree/main/apps/animare-shindan",
    technologies: toTechnologies(["Node.js", "TypeScript", "React", "Next.js"]),
    title: "あにまーれ診断",
    website: "https://shindan.animare.cafe/",
  },
  {
    description:
      "因幡はねるさんの鼓動を感じるためのアプリです。因幡はねるさんの鼓動を感じて、因幡はねるさんに包まれて眠りましょう。",
    id: "hanerubeat",
    preview: hanerubeat,
    releaseAnnouncement: "https://x.com/ykzts/status/1102276038569033729",
    releasedOn: "2019-03-04",
    source: "https://github.com/inabagumi/mini-apps/tree/main/apps/hanerubeat",
    technologies: toTechnologies([
      "Node.js",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ]),
    title: "Haneru Beat!",
    website: "https://hanerubeat.app/",
  },
  {
    description: "774 inc. 所属タレントの動画を検索できるウェブサービスです。",
    id: "shinju-date",
    preview: shinjuDate,
    releaseAnnouncement: "https://x.com/ykzts/status/1134745553273643009",
    releasedOn: "2019-06-01",
    source: "https://github.com/inabagumi/shinju-date",
    technologies: toTechnologies([
      "Node.js",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "YouTube Data API",
    ]),
    title: "SHINJU DATE",
    website: "https://shinju.date/",
  },
  {
    description: "因幡神社は東京都北区赤羽のどこかにある神社です。",
    id: "inaba-jinja",
    preview: inabaJinja,
    releaseAnnouncement: "https://x.com/ykzts/status/1213981122595414016",
    releasedOn: "2020-01-06",
    source: "https://github.com/inabagumi/mini-apps/tree/main/apps/inaba-jinja",
    technologies: toTechnologies([
      "Node.js",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Contentful",
    ]),
    title: "因幡神社",
    website: "https://inaba-jinja.com/",
  },
];

export default products;
