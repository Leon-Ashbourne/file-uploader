/*
  Warnings:

  - You are about to drop the column `libId` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `libId` on the `Folders` table. All the data in the column will be lost.
  - You are about to drop the `Library` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Made the column `foldersId` on table `Files` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `authorId` to the `Folders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_foldersId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_libId_fkey";

-- DropForeignKey
ALTER TABLE "Folders" DROP CONSTRAINT "Folders_libId_fkey";

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_authorId_fkey";

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "libId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ALTER COLUMN "foldersId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Folders" DROP COLUMN "libId",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Library";

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_foldersId_fkey" FOREIGN KEY ("foldersId") REFERENCES "Folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
