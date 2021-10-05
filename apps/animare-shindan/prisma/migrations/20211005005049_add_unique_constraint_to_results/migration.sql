/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Result_slug_key` ON `Result`(`slug`);
