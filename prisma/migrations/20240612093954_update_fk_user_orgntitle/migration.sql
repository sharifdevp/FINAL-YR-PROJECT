/*
  Warnings:

  - You are about to drop the column `titleId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_titleId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `titleId`,
    ADD COLUMN `titlename` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_titlename_fkey` FOREIGN KEY (`titlename`) REFERENCES `OrgnTitle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
