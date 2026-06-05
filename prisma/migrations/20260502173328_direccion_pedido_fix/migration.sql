/*
  Warnings:

  - You are about to drop the column `direccion_envio_id` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the `direccion_envio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `direccion_envio` DROP FOREIGN KEY `direccion_envio_ibfk_1`;

-- DropForeignKey
ALTER TABLE `direccion_envio` DROP FOREIGN KEY `direccion_envio_ibfk_2`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `pedido_direccion_envio_id_fkey`;

-- DropIndex
DROP INDEX `pedido_direccion_envio_id_fkey` ON `pedido`;

-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `direccion_envio_id`;

-- DropTable
DROP TABLE `direccion_envio`;

-- CreateTable
CREATE TABLE `direccion_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `distrito_id` INTEGER NOT NULL,
    `instrucciones` VARCHAR(191) NULL,
    `es_principal` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedido_direccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedido_id` INTEGER NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `distrito_id` INTEGER NOT NULL,
    `instrucciones` VARCHAR(191) NULL,

    UNIQUE INDEX `pedido_direccion_pedido_id_key`(`pedido_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `direccion_usuario` ADD CONSTRAINT `direccion_usuario_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion_usuario` ADD CONSTRAINT `direccion_usuario_distrito_id_fkey` FOREIGN KEY (`distrito_id`) REFERENCES `distrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedido_direccion` ADD CONSTRAINT `pedido_direccion_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedido_direccion` ADD CONSTRAINT `pedido_direccion_distrito_id_fkey` FOREIGN KEY (`distrito_id`) REFERENCES `distrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
