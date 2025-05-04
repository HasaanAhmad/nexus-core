-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormResponses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "formId" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "submittedBy" TEXT,
    CONSTRAINT "FormResponses_formId_fkey" FOREIGN KEY ("formId") REFERENCES "JsonForms" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FormResponses" ("createdAt", "formId", "id", "response", "submittedBy", "updatedAt") SELECT "createdAt", "formId", "id", "response", "submittedBy", "updatedAt" FROM "FormResponses";
DROP TABLE "FormResponses";
ALTER TABLE "new_FormResponses" RENAME TO "FormResponses";
CREATE INDEX "FormResponses_formId_idx" ON "FormResponses"("formId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
