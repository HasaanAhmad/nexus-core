/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN "industry" TEXT;
ALTER TABLE "Organization" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");
