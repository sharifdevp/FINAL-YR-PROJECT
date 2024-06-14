/*
  Warnings:

  - You are about to drop the column `healthSickAvailable` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `healthSickCredit` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `healthSickUsed` on the `balances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `balances` DROP COLUMN `healthSickAvailable`,
    DROP COLUMN `healthSickCredit`,
    DROP COLUMN `healthSickUsed`,
    ADD COLUMN `sickAvailable` INTEGER NULL DEFAULT 0,
    ADD COLUMN `sickCredit` INTEGER NULL DEFAULT 0,
    ADD COLUMN `sickUsed` INTEGER NULL DEFAULT 0;
