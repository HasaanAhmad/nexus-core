/*
  Warnings:

  - You are about to drop the `_JsonFormsToOrganization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_JsonFormsToOrganization_B_index";

-- DropIndex
DROP INDEX "_JsonFormsToOrganization_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_JsonFormsToOrganization";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JsonForms" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jsonform" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "JsonForms_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JsonForms" ("createdAt", "createdBy", "id", "jsonform") SELECT "createdAt", "createdBy", "id", "jsonform" FROM "JsonForms";
DROP TABLE "JsonForms";
ALTER TABLE "new_JsonForms" RENAME TO "JsonForms";
CREATE UNIQUE INDEX "JsonForms_organizationId_key" ON "JsonForms"("organizationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
