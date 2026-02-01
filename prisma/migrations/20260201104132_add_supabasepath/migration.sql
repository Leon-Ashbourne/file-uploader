/*
  Warnings:

  - Added the required column `supabasePath` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "supabasePath" TEXT NOT NULL;
