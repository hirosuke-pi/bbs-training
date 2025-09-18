/*
  Warnings:

  - Made the column `anonId` on table `AnonymousUser` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AnonymousUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "username" TEXT,
    "anonId" TEXT NOT NULL
);
INSERT INTO "new_AnonymousUser" ("anonId", "email", "id", "username") SELECT "anonId", "email", "id", "username" FROM "AnonymousUser";
DROP TABLE "AnonymousUser";
ALTER TABLE "new_AnonymousUser" RENAME TO "AnonymousUser";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
