/*
  Warnings:

  - Added the required column `parameters` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Result` ADD COLUMN `parameters` JSON NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;
