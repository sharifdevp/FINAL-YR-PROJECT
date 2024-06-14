/*
  Warnings:

  - You are about to drop the column `userId` on the `department` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `department` DROP FOREIGN KEY `Department_userId_fkey`;

-- AlterTable
ALTER TABLE `department` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
