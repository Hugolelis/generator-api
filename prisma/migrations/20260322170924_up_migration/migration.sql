/*
  Warnings:

  - A unique constraint covering the columns `[originalUrl]` on the table `shortened_urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shortened_urls_originalUrl_key" ON "shortened_urls"("originalUrl");
