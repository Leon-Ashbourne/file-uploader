/*
  Warnings:

  - A unique constraint covering the columns `[fileName]` on the table `Files` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_foldersId_fkey";

-- AlterTable
ALTER TABLE "Files" ALTER COLUMN "foldersId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Folders" ALTER COLUMN "name" SET DEFAULT 'New folder';

-- CreateIndex
CREATE UNIQUE INDEX "Files_fileName_key" ON "Files"("fileName");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_foldersId_fkey" FOREIGN KEY ("foldersId") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
