/*
  Warnings:

  - You are about to drop the column `departmentId` on the `user` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_departmentId_fkey`;

-- AlterTable
ALTER TABLE `department` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `departmentId`;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
