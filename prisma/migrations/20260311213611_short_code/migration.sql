/*
  Warnings:

  - A unique constraint covering the columns `[shortCode]` on the table `shortened_urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shortened_urls_shortCode_key" ON "shortened_urls"("shortCode");
