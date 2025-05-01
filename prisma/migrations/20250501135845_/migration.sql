-- CreateTable
CREATE TABLE "JsonForms" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jsonform" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_JsonFormsToOrganization" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_JsonFormsToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "JsonForms" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JsonFormsToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_JsonFormsToOrganization_AB_unique" ON "_JsonFormsToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_JsonFormsToOrganization_B_index" ON "_JsonFormsToOrganization"("B");
