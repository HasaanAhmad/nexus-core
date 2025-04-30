/*
  Warnings:

  - You are about to alter the column `location` on the `Organization` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - Made the column `industry` on table `Organization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Organization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamSize` on table `Organization` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "location" JSONB,
    "servicesAssigned" TEXT,
    "slug" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "teamSize" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Organization" ("createdAt", "description", "id", "industry", "location", "logo", "name", "servicesAssigned", "slug", "teamSize", "updatedAt") SELECT "createdAt", "description", "id", "industry", "location", "logo", "name", "servicesAssigned", "slug", "teamSize", "updatedAt" FROM "Organization";
DROP TABLE "Organization";
ALTER TABLE "new_Organization" RENAME TO "Organization";
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
