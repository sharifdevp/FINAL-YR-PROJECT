/*
  Warnings:

  - You are about to drop the column `departmentId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `titleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `title_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_titleId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `departmentId`,
    DROP COLUMN `titleId`,
    DROP COLUMN `title_id`,
    ADD COLUMN `label` VARCHAR(191) NULL,
    ADD COLUMN `titlename` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_titlename_fkey` FOREIGN KEY (`titlename`) REFERENCES `OrgnTitle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_label_fkey` FOREIGN KEY (`label`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
