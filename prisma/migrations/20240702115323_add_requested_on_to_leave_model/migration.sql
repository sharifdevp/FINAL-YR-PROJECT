-- AlterTable
ALTER TABLE "Leave" ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "leaveTypeId" TEXT,
ADD COLUMN     "requestedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onLeave" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_leaveTypeId_fkey" FOREIGN KEY ("leaveTypeId") REFERENCES "LeaveType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
