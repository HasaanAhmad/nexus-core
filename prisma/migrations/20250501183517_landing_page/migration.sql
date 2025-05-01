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
    "landingPage" BOOLEAN NOT NULL DEFAULT false,
    "landingPageHTML" TEXT,
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
