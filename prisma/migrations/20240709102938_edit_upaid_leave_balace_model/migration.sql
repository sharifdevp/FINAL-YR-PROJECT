-- AlterTable
ALTER TABLE `balances` ADD COLUMN `unpaidAvailable` INTEGER NULL DEFAULT 0,
    ADD COLUMN `unpaidCredit` INTEGER NULL DEFAULT 0;
