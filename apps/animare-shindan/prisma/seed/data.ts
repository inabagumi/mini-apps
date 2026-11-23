// The seed data for development and testing.
//
// The seed data is made up for development and testing and has nothing to do
// with the data in the production database. The values are named after what
// they are (such as "テスト質問1" and "テスト結果A") so that they are not
// mistaken for the production data. Do not copy them to the production
// database, and do not copy the production data here.
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
//
// The results have no images in `public/images/results`, which are only for
// the results in the production database, so the result pages of the seed
// data have no Open Graph images.

import type { SeedData } from "./seed.ts";

const TEST_TALENT_A_ID = "00000000-0000-7000-8003-000000000001";
const TEST_TALENT_B_ID = "00000000-0000-7000-8003-000000000002";

// The slugs of the results, which the scores of the answers refer to.
const RESULT_A = "test-result-a";
const RESULT_B = "test-result-b";
const RESULT_C = "test-result-c";
const RESULT_D = "test-result-d";

export const seedData: SeedData = {
  // Each answer adds 3 points to one result and 1 point to another, and the
  // results that get 3 points differ between the answers of a question.
  questions: [
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000101",
          scores: [
            { result: RESULT_A, score: 3 },
            { result: RESULT_B, score: 1 },
          ],
          value: "テスト選択肢1-1",
        },
        {
          id: "00000000-0000-7000-8002-000000000102",
          scores: [
            { result: RESULT_B, score: 3 },
            { result: RESULT_C, score: 1 },
          ],
          value: "テスト選択肢1-2",
        },
        {
          id: "00000000-0000-7000-8002-000000000103",
          scores: [
            { result: RESULT_C, score: 3 },
            { result: RESULT_D, score: 1 },
          ],
          value: "テスト選択肢1-3",
        },
        {
          id: "00000000-0000-7000-8002-000000000104",
          scores: [
            { result: RESULT_D, score: 3 },
            { result: RESULT_A, score: 1 },
          ],
          value: "テスト選択肢1-4",
        },
      ],
      id: "00000000-0000-7000-8001-000000000001",
      title: "テスト質問1",
    },
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000201",
          scores: [
            { result: RESULT_A, score: 3 },
            { result: RESULT_C, score: 1 },
          ],
          value: "テスト選択肢2-1",
        },
        {
          id: "00000000-0000-7000-8002-000000000202",
          scores: [
            { result: RESULT_B, score: 3 },
            { result: RESULT_D, score: 1 },
          ],
          value: "テスト選択肢2-2",
        },
        {
          id: "00000000-0000-7000-8002-000000000203",
          scores: [
            { result: RESULT_C, score: 3 },
            { result: RESULT_A, score: 1 },
          ],
          value: "テスト選択肢2-3",
        },
        {
          id: "00000000-0000-7000-8002-000000000204",
          scores: [
            { result: RESULT_D, score: 3 },
            { result: RESULT_B, score: 1 },
          ],
          value: "テスト選択肢2-4",
        },
      ],
      id: "00000000-0000-7000-8001-000000000002",
      title: "テスト質問2",
    },
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000301",
          scores: [
            { result: RESULT_A, score: 3 },
            { result: RESULT_D, score: 1 },
          ],
          value: "テスト選択肢3-1",
        },
        {
          id: "00000000-0000-7000-8002-000000000302",
          scores: [
            { result: RESULT_B, score: 3 },
            { result: RESULT_A, score: 1 },
          ],
          value: "テスト選択肢3-2",
        },
        {
          id: "00000000-0000-7000-8002-000000000303",
          scores: [
            { result: RESULT_C, score: 3 },
            { result: RESULT_B, score: 1 },
          ],
          value: "テスト選択肢3-3",
        },
        {
          id: "00000000-0000-7000-8002-000000000304",
          scores: [
            { result: RESULT_D, score: 3 },
            { result: RESULT_C, score: 1 },
          ],
          value: "テスト選択肢3-4",
        },
      ],
      id: "00000000-0000-7000-8001-000000000003",
      title: "テスト質問3",
    },
    {
      answers: [
        {
          id: "00000000-0000-7000-8002-000000000401",
          scores: [
            { result: RESULT_A, score: 3 },
            { result: RESULT_B, score: 1 },
          ],
          value: "テスト選択肢4-1",
        },
        {
          id: "00000000-0000-7000-8002-000000000402",
          scores: [
            { result: RESULT_B, score: 3 },
            { result: RESULT_C, score: 1 },
          ],
          value: "テスト選択肢4-2",
        },
        {
          id: "00000000-0000-7000-8002-000000000403",
          scores: [
            { result: RESULT_C, score: 3 },
            { result: RESULT_D, score: 1 },
          ],
          value: "テスト選択肢4-3",
        },
        {
          id: "00000000-0000-7000-8002-000000000404",
          scores: [
            { result: RESULT_D, score: 3 },
            { result: RESULT_A, score: 1 },
          ],
          value: "テスト選択肢4-4",
        },
      ],
      id: "00000000-0000-7000-8001-000000000004",
      title: "テスト質問4",
    },
  ],
  releases: [
    {
      body: "テスト用のリリースです。",
      publishedAt: new Date("2026-01-01T00:00:00Z"),
      slug: "test-release-1",
      title: "テストリリース1",
    },
    {
      body: [
        "テスト用のリリースです。[リンク](https://example.com/)を含みます。",
        "",
        "- テスト項目1",
        "- テスト項目2",
      ].join("\n"),
      publishedAt: new Date("2026-02-01T00:00:00Z"),
      slug: "test-release-2",
      title: "テストリリース2",
    },
  ],
  results: [
    {
      attribute: "テスト属性A",
      catchphrase: "テスト結果Aのキャッチフレーズ",
      parameters: [
        { label: "テストパラメーター1", value: 1.05 },
        { label: "テストパラメーター2", value: 0.8 },
        { label: "テストパラメーター3", value: 0.3 },
      ],
      recommendedVideoUrl: "https://youtu.be/testVideo0A",
      slug: RESULT_A,
      talentId: TEST_TALENT_A_ID,
      type: "テストタイプA",
    },
    {
      attribute: "テスト属性B",
      catchphrase: "テスト結果Bのキャッチフレーズ",
      parameters: [
        { label: "テストパラメーター1", value: 1.05 },
        { label: "テストパラメーター2", value: 0.6 },
        { label: "テストパラメーター3", value: 0.5 },
      ],
      recommendedVideoUrl: "https://youtu.be/testVideo0B",
      slug: RESULT_B,
      talentId: TEST_TALENT_A_ID,
      type: "テストタイプB",
    },
    {
      attribute: "テスト属性C",
      catchphrase: "テスト結果Cのキャッチフレーズ",
      parameters: [
        { label: "テストパラメーター1", value: 1.05 },
        { label: "テストパラメーター2", value: 0.4 },
        { label: "テストパラメーター3", value: 0.7 },
      ],
      recommendedVideoUrl: "https://youtu.be/testVideo0C",
      slug: RESULT_C,
      talentId: TEST_TALENT_B_ID,
      type: "テストタイプC",
    },
    {
      attribute: "テスト属性D",
      catchphrase: "テスト結果Dのキャッチフレーズ",
      parameters: [
        { label: "テストパラメーター1", value: 1.05 },
        { label: "テストパラメーター2", value: 0.2 },
        { label: "テストパラメーター3", value: 0.9 },
      ],
      recommendedVideoUrl: "https://youtu.be/testVideo0D",
      slug: RESULT_D,
      talentId: TEST_TALENT_B_ID,
      type: "テストタイプD",
    },
  ],
  talents: [
    {
      id: TEST_TALENT_A_ID,
      name: "テストタレントA",
      twitter: "test_talent_a",
      youtube: "UCtestTalentA",
    },
    // A talent without the accounts.
    {
      id: TEST_TALENT_B_ID,
      name: "テストタレントB",
      twitter: null,
      youtube: null,
    },
  ],
};
