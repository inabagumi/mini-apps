-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "title" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "question_id" UUID,
    "value" TEXT NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "attribute" TEXT NOT NULL,
    "catchphrase" TEXT NOT NULL,
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "parameters" JSONB NOT NULL,
    "recommended_video_id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "talent_id" UUID NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talents" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "name" TEXT NOT NULL,
    "twitter" TEXT,
    "youtube" TEXT,

    CONSTRAINT "talents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommended_videos" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "url" TEXT NOT NULL,

    CONSTRAINT "recommended_videos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "results_slug_key" ON "results"("slug");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_recommended_video_id_fkey" FOREIGN KEY ("recommended_video_id") REFERENCES "recommended_videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_talent_id_fkey" FOREIGN KEY ("talent_id") REFERENCES "talents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

