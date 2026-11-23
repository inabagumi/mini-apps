-- CreateTable
CREATE TABLE "releases" (
    "body" TEXT NOT NULL,
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "published_at" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "releases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "releases_slug_key" ON "releases"("slug");
