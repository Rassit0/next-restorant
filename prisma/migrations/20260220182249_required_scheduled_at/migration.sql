/*
  Warnings:

  - Made the column `scheduledAt` on table `Orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "scheduledAt" SET NOT NULL;
