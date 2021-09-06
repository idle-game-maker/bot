/*
  Warnings:

  - You are about to drop the column `user` on the `Ping` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Ping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ping" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "gameId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.userId_unique" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "Ping" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
