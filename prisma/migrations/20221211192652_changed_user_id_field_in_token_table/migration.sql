/*
  Warnings:

  - You are about to drop the column `usersId` on the `tokens` table. All the data in the column will be lost.
  - Added the required column `userId` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_usersId_fkey";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "usersId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
