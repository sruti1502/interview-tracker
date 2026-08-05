/*
  Warnings:

  - You are about to drop the column `deadlineDate` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `recruiterEmail` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `recruiterName` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "deadlineDate",
DROP COLUMN "recruiterEmail",
DROP COLUMN "recruiterName";
