/*
  Warnings:

  - You are about to drop the column `titlename` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_titlename_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `titlename`,
    ADD COLUMN `titleId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `OrgnTitle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
