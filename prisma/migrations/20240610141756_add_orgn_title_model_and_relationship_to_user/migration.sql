/*
  Warnings:

  - You are about to drop the column `title` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `title`,
    ADD COLUMN `titleId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `OrgnTitle` (
    `id` VARCHAR(191) NOT NULL,
    `titlename` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `OrgnTitle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
