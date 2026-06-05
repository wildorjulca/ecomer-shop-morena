/*
  Warnings:

  - You are about to drop the column `direccionId` on the `pedido` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `pedido_direccionId_fkey`;

-- DropIndex
DROP INDEX `pedido_direccionId_fkey` ON `pedido`;

-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `direccionId`;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_direccion_envio_id_fkey` FOREIGN KEY (`direccion_envio_id`) REFERENCES `direccion_envio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
