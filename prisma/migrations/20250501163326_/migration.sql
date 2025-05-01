/*
  Warnings:

  - The primary key for the `JsonForms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `JsonForms` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_JsonFormsToOrganization` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JsonForms" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jsonform" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL
);
INSERT INTO "new_JsonForms" ("createdAt", "createdBy", "id", "jsonform") SELECT "createdAt", "createdBy", "id", "jsonform" FROM "JsonForms";
DROP TABLE "JsonForms";
ALTER TABLE "new_JsonForms" RENAME TO "JsonForms";
CREATE TABLE "new__JsonFormsToOrganization" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_JsonFormsToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "JsonForms" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JsonFormsToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__JsonFormsToOrganization" ("A", "B") SELECT "A", "B" FROM "_JsonFormsToOrganization";
DROP TABLE "_JsonFormsToOrganization";
ALTER TABLE "new__JsonFormsToOrganization" RENAME TO "_JsonFormsToOrganization";
CREATE UNIQUE INDEX "_JsonFormsToOrganization_AB_unique" ON "_JsonFormsToOrganization"("A", "B");
CREATE INDEX "_JsonFormsToOrganization_B_index" ON "_JsonFormsToOrganization"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
