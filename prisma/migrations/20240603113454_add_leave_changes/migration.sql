/*
  Warnings:

  - Added the required column `userId` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leave` ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;
