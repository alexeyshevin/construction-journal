/*
  Warnings:

  - Added the required column `updatedAt` to the `WorkType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkType" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "WorkLog_workDate_idx" ON "WorkLog"("workDate");

-- CreateIndex
CREATE INDEX "WorkLog_workTypeId_idx" ON "WorkLog"("workTypeId");
