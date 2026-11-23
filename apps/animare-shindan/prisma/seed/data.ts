// The seed data for development and testing.
//
// Each question, answer and talent has a fixed ID so that the seed updates the
// same records when it runs again. Results and releases are identified by
// their unique slugs. The IDs of the questions and the answers increase in the
// order of the arrays because they are sorted by ID.
//
// Each answer has the scores (0 to 3) that it adds to the results, and the
// result with the highest total score is chosen (see `lib/scoring.ts`). A
// result that an answer has no score for gets 0 points. The tests check that
// every result can be reached and that no result is chosen too often or too
// rarely, so check the tests after changing the scores.

import type { SeedData } from "./seed.ts";

const HANERU_INABA_ID = "00000000-0000-7000-8003-000000000001";

// The slugs of the results, which the scores of the answers refer to.
// メイド / お料理
const MAID_RESULT = "3bXvK25U";
// 先生 / メガネ
const TEACHER_RESULT = "4yoyHoB7";
// 書家 / 最速
const CALLIGRAPHER_RESULT = "DAltKHae";
// うさぎ / 清楚
const BUNNY_RESULT = "hUuAaZpw";
// ゲーマー / 努力
const GAMER_RESULT = "jk54nVLu";
// 店員 / 料理上手
const WAITRESS_RESULT = "kJN5x4Vl";
// うさぎ / 3D
const BUNNY_3D_RESULT = "rKAeiUil";
// 彼女 / サンタ
const SANTA_RESULT = "sJEfGEiw";
// アナ / 知性派
const ANNOUNCER_RESULT = "Tm3fKyEP";
// 彼女 / 浴衣
const YUKATA_RESULT = "xGr4nzdz";

export const seedData: SeedData = {
  questions: [
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000101",
          scores: [
            { result: SANTA_RESULT, score: 3 },
            { result: YUKATA_RESULT, score: 2 },
            { result: WAITRESS_RESULT, score: 1 },
          ],
          value: "ショッピング",
        },
        {
          id: "00000000-0000-7000-8002-000000000102",
          scores: [
            { result: ANNOUNCER_RESULT, score: 3 },
            { result: TEACHER_RESULT, score: 2 },
            { result: CALLIGRAPHER_RESULT, score: 1 },
          ],
          value: "勉強",
        },
        {
          id: "00000000-0000-7000-8002-000000000103",
          scores: [
            { result: GAMER_RESULT, score: 3 },
            { result: BUNNY_3D_RESULT, score: 1 },
            { result: CALLIGRAPHER_RESULT, score: 1 },
          ],
          value: "ゲーム",
        },
        {
          id: "00000000-0000-7000-8002-000000000104",
          scores: [
            { result: BUNNY_RESULT, score: 2 },
            { result: BUNNY_3D_RESULT, score: 1 },
            { result: YUKATA_RESULT, score: 2 },
          ],
          value: "睡眠",
        },
      ],
      id: "00000000-0000-7000-8001-000000000001",
      title: "休日はなにをして過ごす?",
    },
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000201",
          scores: [
            { result: WAITRESS_RESULT, score: 3 },
            { result: CALLIGRAPHER_RESULT, score: 1 },
            { result: GAMER_RESULT, score: 1 },
          ],
          value: "中華料理",
        },
        {
          id: "00000000-0000-7000-8002-000000000202",
          scores: [
            { result: MAID_RESULT, score: 2 },
            { result: SANTA_RESULT, score: 2 },
            { result: WAITRESS_RESULT, score: 1 },
          ],
          value: "イタリアン",
        },
        {
          id: "00000000-0000-7000-8002-000000000203",
          scores: [
            { result: MAID_RESULT, score: 3 },
            { result: SANTA_RESULT, score: 1 },
            { result: BUNNY_RESULT, score: 1 },
          ],
          value: "フレンチ",
        },
        {
          id: "00000000-0000-7000-8002-000000000204",
          scores: [
            { result: CALLIGRAPHER_RESULT, score: 3 },
            { result: YUKATA_RESULT, score: 2 },
            { result: MAID_RESULT, score: 1 },
          ],
          value: "和食",
        },
      ],
      id: "00000000-0000-7000-8001-000000000002",
      title: "あなたが好きな食べ物は?",
    },
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000301",
          scores: [
            { result: ANNOUNCER_RESULT, score: 2 },
            { result: GAMER_RESULT, score: 2 },
            { result: TEACHER_RESULT, score: 1 },
          ],
          value: "STEINS;GATE",
        },
        {
          id: "00000000-0000-7000-8002-000000000302",
          scores: [
            { result: BUNNY_RESULT, score: 2 },
            { result: BUNNY_3D_RESULT, score: 1 },
            { result: WAITRESS_RESULT, score: 1 },
          ],
          value: "魔法少女まどか☆マギカ",
        },
        {
          id: "00000000-0000-7000-8002-000000000303",
          scores: [
            { result: TEACHER_RESULT, score: 2 },
            { result: CALLIGRAPHER_RESULT, score: 2 },
          ],
          value: "新世界より",
        },
        {
          id: "00000000-0000-7000-8002-000000000304",
          scores: [
            { result: YUKATA_RESULT, score: 3 },
            { result: SANTA_RESULT, score: 2 },
          ],
          value: "君の名は。",
        },
      ],
      id: "00000000-0000-7000-8001-000000000003",
      title: "あなたが好きなアニメは?",
    },
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000401",
          scores: [
            { result: ANNOUNCER_RESULT, score: 2 },
            { result: WAITRESS_RESULT, score: 2 },
          ],
          value: "銀と金",
        },
        {
          id: "00000000-0000-7000-8002-000000000402",
          scores: [
            { result: BUNNY_3D_RESULT, score: 2 },
            { result: BUNNY_RESULT, score: 1 },
            { result: MAID_RESULT, score: 1 },
          ],
          value: "7SEEDS",
        },
        {
          id: "00000000-0000-7000-8002-000000000403",
          scores: [
            { result: WAITRESS_RESULT, score: 2 },
            { result: CALLIGRAPHER_RESULT, score: 1 },
            { result: ANNOUNCER_RESULT, score: 1 },
          ],
          value: "闇金ウシジマくん",
        },
        {
          id: "00000000-0000-7000-8002-000000000404",
          scores: [
            { result: GAMER_RESULT, score: 2 },
            { result: BUNNY_3D_RESULT, score: 1 },
            { result: MAID_RESULT, score: 1 },
          ],
          value: "SLAM DUNK",
        },
      ],
      id: "00000000-0000-7000-8001-000000000004",
      title: "あなたが好きなマンガは?",
    },
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000501",
          scores: [
            { result: TEACHER_RESULT, score: 3 },
            { result: ANNOUNCER_RESULT, score: 1 },
          ],
          value: "メガネ",
        },
        {
          id: "00000000-0000-7000-8002-000000000502",
          scores: [
            { result: MAID_RESULT, score: 2 },
            { result: TEACHER_RESULT, score: 1 },
            { result: SANTA_RESULT, score: 1 },
          ],
          value: "黒スト",
        },
        {
          id: "00000000-0000-7000-8002-000000000503",
          scores: [
            { result: BUNNY_3D_RESULT, score: 3 },
            { result: BUNNY_RESULT, score: 1 },
          ],
          value: "うさぎ耳",
        },
        {
          id: "00000000-0000-7000-8002-000000000504",
          scores: [
            { result: BUNNY_RESULT, score: 3 },
            { result: YUKATA_RESULT, score: 1 },
            { result: CALLIGRAPHER_RESULT, score: 1 },
          ],
          value: "清楚",
        },
      ],
      id: "00000000-0000-7000-8001-000000000005",
      title: "あなたが好きな異性のタイプは?",
    },
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000601",
          scores: [
            { result: MAID_RESULT, score: 1 },
            { result: WAITRESS_RESULT, score: 1 },
            { result: CALLIGRAPHER_RESULT, score: 1 },
          ],
          value: "好き",
        },
        {
          id: "00000000-0000-7000-8002-000000000602",
          scores: [
            { result: TEACHER_RESULT, score: 1 },
            { result: ANNOUNCER_RESULT, score: 1 },
          ],
          value: "好き",
        },
        {
          id: "00000000-0000-7000-8002-000000000603",
          scores: [
            { result: BUNNY_RESULT, score: 1 },
            { result: BUNNY_3D_RESULT, score: 1 },
            { result: GAMER_RESULT, score: 1 },
          ],
          value: "好き",
        },
        {
          id: "00000000-0000-7000-8002-000000000604",
          scores: [
            { result: SANTA_RESULT, score: 1 },
            { result: YUKATA_RESULT, score: 1 },
          ],
          value: "好き",
        },
      ],
      id: "00000000-0000-7000-8001-000000000006",
      title: "ねるちゃんが……",
    },
  ],
  releases: [
    // Dummy releases for development and testing. The actual releases are stored
    // only in the production database.
    {
      body: "テスト用のリリースです。",
      publishedAt: new Date("2026-01-01T00:00:00Z"),
      slug: "v1.0.0",
      title: "Version 1.0",
    },
    {
      body: [
        "テスト用のリリースです。[リンク](https://example.com/)を含みます。",
        "",
        "- 項目 1",
        "- 項目 2",
      ].join("\n"),
      publishedAt: new Date("2026-02-01T00:00:00Z"),
      slug: "v2.0.0",
      title: "Version 2.0",
    },
  ],
  results: [
    {
      attribute: "メイド",
      catchphrase: "おかえりなさいませ♪ご主人さま！",
      parameters: [
        { label: "メイド", value: 1.05 },
        { label: "お料理", value: 0.83 },
        { label: "清楚", value: 0.61 },
      ],
      recommendedVideoUrl: "https://youtu.be/5iLMsnNWuxY",
      slug: "3bXvK25U",
      talentId: HANERU_INABA_ID,
      type: "お料理",
    },
    {
      attribute: "先生",
      catchphrase: "美人 先生",
      parameters: [
        { label: "先生", value: 1.05 },
        { label: "メガネ", value: 0.64 },
        { label: "色気", value: 0.28 },
      ],
      recommendedVideoUrl: "https://youtu.be/46zn0VIqJ1g",
      slug: "4yoyHoB7",
      talentId: HANERU_INABA_ID,
      type: "メガネ",
    },
    {
      attribute: "書家",
      catchphrase: "新元号令和を最速書道した女！",
      parameters: [
        { label: "書家", value: 1.05 },
        { label: "速度", value: 0.84 },
        { label: "達筆度", value: 0.74 },
      ],
      recommendedVideoUrl: "https://youtu.be/qjkvwHvqWk0",
      slug: "DAltKHae",
      talentId: HANERU_INABA_ID,
      type: "最速",
    },
    {
      attribute: "うさぎ",
      catchphrase: "“ALWAYS WATCHING YOU”",
      parameters: [
        { label: "うさぎ", value: 1.05 },
        { label: "清楚", value: 0.64 },
        { label: "かわいさ", value: 0.34 },
      ],
      recommendedVideoUrl: "https://youtu.be/UxBN_XsU0tU",
      slug: "hUuAaZpw",
      talentId: HANERU_INABA_ID,
      type: "清楚",
    },
    {
      attribute: "ゲーマー",
      catchphrase: "おかえりなさいませ♪ご主人さま！",
      parameters: [
        { label: "努力", value: 1.05 },
        { label: "ゲーマー", value: 0.32 },
        { label: "無邪気さ", value: 0.12 },
      ],
      recommendedVideoUrl: "https://youtu.be/TzdMmvzYtCQ",
      slug: "jk54nVLu",
      talentId: HANERU_INABA_ID,
      type: "努力",
    },
    {
      attribute: "店員",
      catchphrase: "たくさん注文ありがと～♡♡",
      parameters: [
        { label: "料理上手", value: 1.05 },
        { label: "ウェートレス", value: 0.75 },
        { label: "献身さ", value: 0.53 },
      ],
      recommendedVideoUrl: "https://youtu.be/3M7qAnXcuJI",
      slug: "kJN5x4Vl",
      talentId: HANERU_INABA_ID,
      type: "料理上手",
    },
    {
      attribute: "うさぎ",
      catchphrase: "ねるちゃんですよ～！",
      parameters: [
        { label: "うさぎ", value: 1.05 },
        { label: "3D", value: 0.89 },
        { label: "努力", value: 0.54 },
      ],
      recommendedVideoUrl: "https://youtu.be/cjoo08sI76w",
      slug: "rKAeiUil",
      talentId: HANERU_INABA_ID,
      type: "3D",
    },
    {
      attribute: "彼女",
      catchphrase: "イルミネーションを見にいこっか～！",
      parameters: [
        { label: "彼女", value: 1.05 },
        { label: "サンタ", value: 0.38 },
        { label: "真摯度", value: 0.24 },
      ],
      recommendedVideoUrl: "https://youtu.be/eyNz8J_RIJ8",
      slug: "sJEfGEiw",
      talentId: HANERU_INABA_ID,
      type: "サンタ",
    },
    {
      attribute: "アナ",
      catchphrase: "ねるにゅ～の時間ですよー！",
      parameters: [
        { label: "アナウンサー", value: 1.05 },
        { label: "知性", value: 0.45 },
        { label: "かわいさ", value: 0.28 },
      ],
      recommendedVideoUrl: "https://youtu.be/Cdf1PF6i_Zw",
      slug: "Tm3fKyEP",
      talentId: HANERU_INABA_ID,
      type: "知性派",
    },
    {
      attribute: "彼女",
      catchphrase: "今日は私と花火大会デートしよっか？",
      parameters: [
        { label: "彼女", value: 1.05 },
        { label: "浴衣", value: 0.74 },
        { label: "かわいさ", value: 0.68 },
      ],
      recommendedVideoUrl: "https://youtu.be/y6uNpxyqxL8",
      slug: "xGr4nzdz",
      talentId: HANERU_INABA_ID,
      type: "浴衣",
    },
  ],
  talents: [
    {
      id: HANERU_INABA_ID,
      name: "因幡はねる",
      twitter: "Haneru_Inaba",
      youtube: "UC0Owc36U9lOyi9Gx9Ic-4qg",
    },
  ],
};
