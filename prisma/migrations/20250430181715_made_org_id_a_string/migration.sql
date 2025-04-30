/*
  Warnings:

  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "employmentType" TEXT NOT NULL,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attendance_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attendance" ("checkIn", "checkOut", "createdAt", "employmentType", "id", "organizationId", "updatedAt", "userId") SELECT "checkIn", "checkOut", "createdAt", "employmentType", "id", "organizationId", "updatedAt", "userId" FROM "Attendance";
DROP TABLE "Attendance";
ALTER TABLE "new_Attendance" RENAME TO "Attendance";
CREATE TABLE "new_CRM" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CRM_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CRM" ("createdAt", "id", "organizationId") SELECT "createdAt", "id", "organizationId" FROM "CRM";
DROP TABLE "CRM";
ALTER TABLE "new_CRM" RENAME TO "CRM";
CREATE TABLE "new_Chatbot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "knowledgeData" TEXT,
    "avgResponseTime" REAL,
    "queriesAddressed" INTEGER,
    "genAIId" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Chatbot_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chatbot" ("avgResponseTime", "createdAt", "genAIId", "id", "knowledgeData", "organizationId", "queriesAddressed", "updatedAt") SELECT "avgResponseTime", "createdAt", "genAIId", "id", "knowledgeData", "organizationId", "queriesAddressed", "updatedAt" FROM "Chatbot";
DROP TABLE "Chatbot";
ALTER TABLE "new_Chatbot" RENAME TO "Chatbot";
CREATE UNIQUE INDEX "Chatbot_organizationId_key" ON "Chatbot"("organizationId");
CREATE TABLE "new_CommunicationChannel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "assigneeId" INTEGER NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CommunicationChannel_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommunicationChannel_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CommunicationChannel" ("assigneeId", "createdAt", "id", "name", "organizationId", "updatedAt") SELECT "assigneeId", "createdAt", "id", "name", "organizationId", "updatedAt" FROM "CommunicationChannel";
DROP TABLE "CommunicationChannel";
ALTER TABLE "new_CommunicationChannel" RENAME TO "CommunicationChannel";
CREATE TABLE "new_HR" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alerts" JSONB NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HR_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HR" ("alerts", "createdAt", "id", "organizationId") SELECT "alerts", "createdAt", "id", "organizationId" FROM "HR";
DROP TABLE "HR";
ALTER TABLE "new_HR" RENAME TO "HR";
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rules" JSONB NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Inventory_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("createdAt", "id", "organizationId", "rules", "updatedAt") SELECT "createdAt", "id", "organizationId", "rules", "updatedAt" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
CREATE TABLE "new_Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "location" TEXT,
    "servicesAssigned" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Organization" ("createdAt", "description", "id", "location", "logo", "name", "servicesAssigned", "updatedAt") SELECT "createdAt", "description", "id", "location", "logo", "name", "servicesAssigned", "updatedAt" FROM "Organization";
DROP TABLE "Organization";
ALTER TABLE "new_Organization" RENAME TO "Organization";
CREATE TABLE "new_Payroll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "attendance" JSONB NOT NULL,
    "payrollRules" JSONB NOT NULL,
    "taxRules" JSONB NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Payroll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payroll_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payroll" ("attendance", "createdAt", "id", "organizationId", "payrollRules", "taxRules", "updatedAt", "userId") SELECT "attendance", "createdAt", "id", "organizationId", "payrollRules", "taxRules", "updatedAt", "userId" FROM "Payroll";
DROP TABLE "Payroll";
ALTER TABLE "new_Payroll" RENAME TO "Payroll";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "assigneeId" INTEGER NOT NULL,
    "comments" JSONB,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("assigneeId", "comments", "createdAt", "id", "name", "organizationId", "updatedAt") SELECT "assigneeId", "comments", "createdAt", "id", "name", "organizationId", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "billingInformation" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subscription_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subscription" ("billingInformation", "createdAt", "id", "organizationId", "price", "type", "updatedAt") SELECT "billingInformation", "createdAt", "id", "organizationId", "price", "type", "updatedAt" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
CREATE UNIQUE INDEX "Subscription_organizationId_key" ON "Subscription"("organizationId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL DEFAULT 'EMPLOYEE',
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "fullName" TEXT NOT NULL,
    "formData" JSONB,
    "organizationId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "formData", "fullName", "id", "onboardingCompleted", "organizationId", "password", "updatedAt", "userType") SELECT "createdAt", "email", "formData", "fullName", "id", "onboardingCompleted", "organizationId", "password", "updatedAt", "userType" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_organizationId_key" ON "User"("organizationId");
CREATE TABLE "new_WebsiteBuilder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "template" JSONB NOT NULL,
    "userLanding" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "organizationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WebsiteBuilder_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebsiteBuilder" ("createdAt", "id", "organizationId", "published", "template", "updatedAt", "userLanding") SELECT "createdAt", "id", "organizationId", "published", "template", "updatedAt", "userLanding" FROM "WebsiteBuilder";
DROP TABLE "WebsiteBuilder";
ALTER TABLE "new_WebsiteBuilder" RENAME TO "WebsiteBuilder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
