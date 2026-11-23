// The E2E tests of the diagnosis, which run against the seed data
// (`prisma/seed/data.ts`). See `playwright.config.ts` for the setup.

import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

import { decideResult } from "../lib/scoring.ts";
import { seedData } from "../prisma/seed/data.ts";

const { questions, results, talents } = seedData;
const resultSlugs = results.map(({ slug }) => slug);

const findResult = (slug: string | undefined) => {
  const result = results.find((item) => item.slug === slug);

  if (!result) {
    throw new Error(`The result is not in the seed data: ${slug}`);
  }

  const talent = talents.find(({ id }) => id === result.talentId);

  if (!talent) {
    throw new Error(`The talent is not in the seed data: ${result.talentId}`);
  }

  return { ...result, talent };
};

// Returns the result that the answers (the indexes of the answers of each
// question) lead to.
const decide = (answerIndexes: number[]) =>
  findResult(
    decideResult(
      answerIndexes.map((index, i) => questions[i].answers[index]),
      resultSlugs
    )
  );

const expectQuestion = async (page: Page, index: number) => {
  const count = index + 1;

  await expect(page.getByRole("heading", { level: 2 })).toHaveText(
    questions[index].title
  );
  await expect(
    page.getByRole("progressbar", { name: "診断の進み具合" })
  ).toHaveAttribute("value", String(count));
  await expect(
    page.getByText(
      count === questions.length
        ? "ラスト"
        : `残り${questions.length - index}問`,
      { exact: true }
    )
  ).toBeVisible();
};

const selectAnswer = async (
  page: Page,
  questionIndex: number,
  answerIndex: number
) => {
  await page
    .getByRole("button", {
      exact: true,
      name: questions[questionIndex].answers[answerIndex].value,
    })
    .click();
};

test.describe("diagnosis", () => {
  // The answer to the first question is changed after going back to it.
  const FIRST_ANSWER = 0;
  const ANSWERS = [1, 0, 1, 2];

  test("leads to the result decided from the answers", async ({ page }) => {
    const expected = decide(ANSWERS);

    // Make sure that changing the answer changes the result, so that the test
    // fails if the first answer is not replaced.
    expect(
      decide([FIRST_ANSWER, ...ANSWERS.slice(1)]).slug,
      "The first answer should lead to another result."
    ).not.toBe(expected.slug);

    await page.goto("/");
    await page.getByRole("link", { name: "診断スタート!" }).click();

    await expect(page).toHaveURL("/questions");
    await expectQuestion(page, 0);

    const prevButton = page.getByRole("button", { name: "1つ前に戻る" });

    await expect(prevButton).toBeHidden();

    await selectAnswer(page, 0, FIRST_ANSWER);
    await expectQuestion(page, 1);
    await expect(prevButton).toBeVisible();

    // Go back to the first question and choose another answer.
    await prevButton.click();
    await expectQuestion(page, 0);
    await expect(prevButton).toBeHidden();

    for (const [index, answerIndex] of ANSWERS.entries()) {
      // oxlint-disable-next-line no-await-in-loop
      await expectQuestion(page, index);
      // oxlint-disable-next-line no-await-in-loop
      await selectAnswer(page, index, answerIndex);
    }

    await expect(page.getByRole("status")).toHaveText(
      "あなたのオタクタイプを分析中"
    );
    await expect(page).toHaveURL(`/s/${expected.slug}`);
    await expect(page).toHaveTitle(
      `${expected.talent.name}が選ばれました！ | #あにまーれオタクタイプ診断`
    );

    const main = page.getByRole("main");

    await expect(main).toContainText(`アナタは${expected.type}系の`);
    await expect(main).toContainText(`${expected.attribute}好きです!`);
    await expect(
      page.getByRole("heading", {
        name: `「${expected.talent.name}」のおすすめ動画はこちら!`,
      })
    ).toBeVisible();
  });

  test("can be started again from the result", async ({ page }) => {
    const expected = decide(ANSWERS);

    await page.goto(`/s/${expected.slug}`);

    await expect(
      page.getByRole("link", { name: "診断結果をツイートする" })
    ).toBeVisible();

    await page.getByRole("link", { name: "もう一度診断する" }).click();

    await expect(page).toHaveURL("/");

    await page.getByRole("link", { name: "診断スタート!" }).click();

    await expect(page).toHaveURL("/questions");
    await expectQuestion(page, 0);
  });
});

test.describe("result", () => {
  for (const { slug } of results) {
    test(`shows ${slug}`, async ({ page }) => {
      const result = findResult(slug);

      await page.goto(`/s/${slug}`);

      const main = page.getByRole("main");

      await expect(main).toContainText(`アナタは${result.type}系の`);
      await expect(main).toContainText(`${result.attribute}好きです!`);
      await expect(
        page.getByRole("heading", { name: "オタクパラメーター" })
      ).toBeVisible();

      for (const { label } of result.parameters) {
        // oxlint-disable-next-line no-await-in-loop
        await expect(main).toContainText(label);
      }
    });
  }

  test("hides the share buttons when opened from a shared link", async ({
    page,
  }) => {
    const [{ slug }] = results;

    await page.goto(`/s/${slug}?s=true`);

    await expect(
      page.getByRole("link", { name: "診断結果をツイートする" })
    ).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "もう一度診断する" })
    ).toHaveCount(0);
    // One in the message window and one at the bottom of the page.
    await expect(
      page.getByRole("link", { name: "オタクタイプを診断してみる" })
    ).toHaveCount(2);
  });

  test("shows the not found page for an unknown result", async ({ page }) => {
    await page.goto("/s/unknown");

    await expect(
      page.getByRole("heading", { level: 1, name: "404 Not found" })
    ).toBeVisible();
  });
});
