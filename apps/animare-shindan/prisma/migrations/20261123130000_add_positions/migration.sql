-- AlterTable
-- The columns are added as nullable first so that the existing rows can be
-- given their positions before the NOT NULL constraints are added.
ALTER TABLE "questions" ADD COLUMN "position" INTEGER;

-- AlterTable
ALTER TABLE "answers" ADD COLUMN "position" INTEGER;

-- Keep the order that the questions and the answers were shown in before:
-- the questions in the descending order of their IDs and the answers of each
-- question in the ascending order of their IDs.
UPDATE "questions"
SET "position" = "ordered"."position"
FROM (
    SELECT "id", ROW_NUMBER() OVER (ORDER BY "id" DESC) - 1 AS "position"
    FROM "questions"
) AS "ordered"
WHERE "questions"."id" = "ordered"."id";

UPDATE "answers"
SET "position" = "ordered"."position"
FROM (
    SELECT
        "id",
        ROW_NUMBER() OVER (PARTITION BY "question_id" ORDER BY "id" ASC) - 1 AS "position"
    FROM "answers"
) AS "ordered"
WHERE "answers"."id" = "ordered"."id";

-- AlterTable
-- Prisma cannot express a CHECK constraint, so it is added by hand.
ALTER TABLE "questions"
    ALTER COLUMN "position" SET NOT NULL,
    ADD CONSTRAINT "questions_position_check" CHECK ("position" >= 0);

-- AlterTable
ALTER TABLE "answers"
    ALTER COLUMN "position" SET NOT NULL,
    ADD CONSTRAINT "answers_position_check" CHECK ("position" >= 0);

-- CreateIndex
CREATE INDEX "questions_position_idx" ON "questions"("position");

-- CreateIndex
CREATE INDEX "answers_question_id_position_idx" ON "answers"("question_id", "position");
