/*
  Warnings:

  - Added the required column `OriginalName` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "OriginalName" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;
