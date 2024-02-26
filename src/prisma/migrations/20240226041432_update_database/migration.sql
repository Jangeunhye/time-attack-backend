/*
  Warnings:

  - You are about to drop the column `userId` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `selfIntroduction` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `nickname` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_userId_fkey";

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "description",
ADD COLUMN     "selfIntroduction" TEXT NOT NULL,
ALTER COLUMN "nickname" SET NOT NULL;
