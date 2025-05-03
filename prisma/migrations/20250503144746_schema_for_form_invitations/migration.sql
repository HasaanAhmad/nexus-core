-- CreateTable
CREATE TABLE "FormInvitation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "formId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasResponded" BOOLEAN NOT NULL DEFAULT false,
    "respondedAt" DATETIME,
    CONSTRAINT "FormInvitation_formId_fkey" FOREIGN KEY ("formId") REFERENCES "JsonForms" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "FormInvitation_formId_idx" ON "FormInvitation"("formId");

-- CreateIndex
CREATE INDEX "FormInvitation_email_idx" ON "FormInvitation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FormInvitation_formId_email_key" ON "FormInvitation"("formId", "email");
