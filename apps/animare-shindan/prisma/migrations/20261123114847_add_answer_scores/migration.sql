-- CreateTable
CREATE TABLE "answer_scores" (
    "answer_id" UUID NOT NULL,
    "result_id" UUID NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "answer_scores_pkey" PRIMARY KEY ("answer_id","result_id"),
    -- Prisma cannot express a CHECK constraint, so it is added by hand.
    CONSTRAINT "answer_scores_score_check" CHECK ("score" BETWEEN 0 AND 3)
);

-- CreateIndex
CREATE INDEX "answer_scores_result_id_idx" ON "answer_scores"("result_id");

-- AddForeignKey
ALTER TABLE "answer_scores" ADD CONSTRAINT "answer_scores_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_scores" ADD CONSTRAINT "answer_scores_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
