/*
  Warnings:

  - You are about to drop the column `label` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `titlename` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_label_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_titlename_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `label`,
    DROP COLUMN `titlename`,
    ADD COLUMN `departmentId` VARCHAR(191) NULL,
    ADD COLUMN `titleId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `OrgnTitle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
