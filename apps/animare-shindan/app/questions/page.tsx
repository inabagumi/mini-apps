import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import type { JSX } from "react";

import { getAnalysisResultIDs, getQuestions } from "@/lib/analysis";

import Analysis, { AnswerList, Header, PrevButton } from "./analysis";

export const metadata: Metadata = {
  alternates: {
    canonical: "/questions",
  },
  title: "診断中...",
};

export default async function QuestionsPage(): Promise<JSX.Element> {
  const [questions, resultIDs] = await Promise.all([
    getQuestions(),
    getAnalysisResultIDs(),
  ]);

  return (
    <Analysis questions={questions} resultIDs={resultIDs}>
      <main className="mx-auto w-full max-w-narrow pt-7 pb-24 sm:pb-50">
        <h1 className="sr-only">オタクタイプ診断</h1>

        <Header />

        <div className="overflow-x-hidden">
          <AnswerList className="flex -translate-x-[calc(100%*(var(--answer-count)-1))] flex-row motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out" />
        </div>

        <PrevButton
          className="mt-5 ml-1 w-fit pr-5 pl-2"
          size="sm"
          variant="secondary"
        >
          <ChevronLeft aria-hidden="true" className="size-6 shrink-0" />
          1つ前に戻る
        </PrevButton>
      </main>
    </Analysis>
  );
}
