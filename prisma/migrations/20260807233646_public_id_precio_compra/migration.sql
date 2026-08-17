/*
  Warnings:

  - You are about to drop the column `costo_compra` on the `variante_producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `producto` ADD COLUMN `precio_compra` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `producto_imagen` ADD COLUMN `publicId` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `variante_producto` DROP COLUMN `costo_compra`;
