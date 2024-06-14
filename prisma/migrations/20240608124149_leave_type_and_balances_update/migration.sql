/*
  Warnings:

  - You are about to drop the column `familyAvailable` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `familyCredit` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `familyUsed` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `studyAvailable` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `studyCredit` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `studyUsed` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `leavetype` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `balances` DROP COLUMN `familyAvailable`,
    DROP COLUMN `familyCredit`,
    DROP COLUMN `familyUsed`,
    DROP COLUMN `studyAvailable`,
    DROP COLUMN `studyCredit`,
    DROP COLUMN `studyUsed`,
    ADD COLUMN `compensationAvailable` INTEGER NULL DEFAULT 0,
    ADD COLUMN `compensationCredit` INTEGER NULL DEFAULT 0,
    ADD COLUMN `compensationUsed` INTEGER NULL DEFAULT 0,
    ADD COLUMN `emergencyAvailable` INTEGER NULL DEFAULT 0,
    ADD COLUMN `emergencyCredit` INTEGER NULL DEFAULT 0,
    ADD COLUMN `emergencyUsed` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `leavetype` DROP COLUMN `category`;
