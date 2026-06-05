/*
  Warnings:

  - You are about to drop the `direccion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `direccion` DROP FOREIGN KEY `direccion_departamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `direccion` DROP FOREIGN KEY `direccion_distritoId_fkey`;

-- DropForeignKey
ALTER TABLE `direccion` DROP FOREIGN KEY `direccion_provinciaId_fkey`;

-- DropForeignKey
ALTER TABLE `direccion` DROP FOREIGN KEY `direccion_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `direccionId` INTEGER NULL;

-- DropTable
DROP TABLE `direccion`;

-- CreateTable
CREATE TABLE `direccion_envio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `nombres` VARCHAR(100) NOT NULL,
    `apellidos` VARCHAR(200) NOT NULL,
    `telefono` VARCHAR(20) NOT NULL,
    `direccion` TEXT NOT NULL,
    `distrito_id` INTEGER NOT NULL,
    `instrucciones` TEXT NULL,
    `es_principal` BOOLEAN NULL DEFAULT false,
    `activo` BOOLEAN NULL DEFAULT true,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `departamentoId` INTEGER NULL,
    `provinciaId` INTEGER NULL,

    INDEX `idx_distrito`(`distrito_id`),
    INDEX `idx_principal`(`es_principal`),
    INDEX `idx_usuario`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `direccion_envio` ADD CONSTRAINT `direccion_envio_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `direccion_envio` ADD CONSTRAINT `direccion_envio_ibfk_2` FOREIGN KEY (`distrito_id`) REFERENCES `distrito`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `direccion_envio` ADD CONSTRAINT `direccion_envio_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `departamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion_envio` ADD CONSTRAINT `direccion_envio_provinciaId_fkey` FOREIGN KEY (`provinciaId`) REFERENCES `provincia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_direccionId_fkey` FOREIGN KEY (`direccionId`) REFERENCES `direccion_envio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
