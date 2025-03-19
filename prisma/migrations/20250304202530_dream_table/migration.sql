-- CreateEnum
CREATE TYPE "Category" AS ENUM ('sweet', 'sour');

-- CreateTable
CREATE TABLE "Dream" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'sweet',
    "date" TIMESTAMP(3) NOT NULL,
    "dream" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Dream_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dream" ADD CONSTRAINT "Dream_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
