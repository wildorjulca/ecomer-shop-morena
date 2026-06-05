/*
  Warnings:

  - You are about to drop the column `tipo_tallaId` on the `producto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `producto` DROP FOREIGN KEY `producto_tipo_tallaId_fkey`;

-- DropIndex
DROP INDEX `producto_tipo_tallaId_fkey` ON `producto`;

-- AlterTable
ALTER TABLE `producto` DROP COLUMN `tipo_tallaId`;
