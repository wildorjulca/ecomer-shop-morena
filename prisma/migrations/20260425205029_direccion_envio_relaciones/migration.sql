/*
  Warnings:

  - You are about to drop the column `departamentoId` on the `direccion_envio` table. All the data in the column will be lost.
  - You are about to drop the column `provinciaId` on the `direccion_envio` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `direccion_envio` DROP FOREIGN KEY `direccion_envio_departamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `direccion_envio` DROP FOREIGN KEY `direccion_envio_provinciaId_fkey`;

-- DropIndex
DROP INDEX `direccion_envio_departamentoId_fkey` ON `direccion_envio`;

-- DropIndex
DROP INDEX `direccion_envio_provinciaId_fkey` ON `direccion_envio`;

-- AlterTable
ALTER TABLE `direccion_envio` DROP COLUMN `departamentoId`,
    DROP COLUMN `provinciaId`;
