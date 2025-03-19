/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Dream` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dream" ALTER COLUMN "slug" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Dream_slug_key" ON "Dream"("slug");
