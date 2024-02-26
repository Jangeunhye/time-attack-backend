/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `tweetId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_tweetId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "tweetId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_nickname_key" ON "UserProfile"("nickname");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
