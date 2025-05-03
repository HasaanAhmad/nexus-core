-- CreateTable
CREATE TABLE "FormResponses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "formId" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "submittedBy" TEXT,
    CONSTRAINT "FormResponses_formId_fkey" FOREIGN KEY ("formId") REFERENCES "JsonForms" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "FormResponses_formId_idx" ON "FormResponses"("formId");
