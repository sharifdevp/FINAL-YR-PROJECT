/*
  Warnings:

  - You are about to drop the column `healthAvailable` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `healthCredit` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `healthUsed` on the `balances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `balances` DROP COLUMN `healthAvailable`,
    DROP COLUMN `healthCredit`,
    DROP COLUMN `healthUsed`,
    ADD COLUMN `healthSickAvailable` INTEGER NULL DEFAULT 0,
    ADD COLUMN `healthSickCredit` INTEGER NULL DEFAULT 0,
    ADD COLUMN `healthSickUsed` INTEGER NULL DEFAULT 0;
