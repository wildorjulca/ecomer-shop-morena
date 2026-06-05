-- CreateTable
CREATE TABLE `departamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provincia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `departamentoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `distrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `provinciaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `calle` VARCHAR(255) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `referencia` VARCHAR(255) NULL,
    `distritoId` INTEGER NOT NULL,
    `principal` BOOLEAN NULL DEFAULT false,
    `activo` BOOLEAN NULL DEFAULT true,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `departamentoId` INTEGER NULL,
    `provinciaId` INTEGER NULL,

    INDEX `direccion_usuarioId_idx`(`usuarioId`),
    INDEX `direccion_distritoId_idx`(`distritoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `descripcion` TEXT NULL,
    `imagen` VARCHAR(255) NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `categoria_nombre_key`(`nombre`),
    UNIQUE INDEX `categoria_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `imagen` VARCHAR(255) NULL,
    `descripcion` TEXT NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `subcategoria_slug_key`(`slug`),
    INDEX `subcategoria_categoriaId_idx`(`categoriaId`),
    UNIQUE INDEX `subcategoria_nombre_categoriaId_key`(`nombre`, `categoriaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(20) NOT NULL,
    `slug` VARCHAR(20) NOT NULL,
    `imagen` VARCHAR(255) NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `genero_nombre_key`(`nombre`),
    UNIQUE INDEX `genero_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `imagen` VARCHAR(255) NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `marca_nombre_key`(`nombre`),
    UNIQUE INDEX `marca_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `referencia` VARCHAR(50) NULL,
    `descripcion` TEXT NULL,
    `precio_base_venta` DECIMAL(10, 2) NOT NULL,
    `precio_descuento` DECIMAL(10, 2) NULL,
    `porcentaje_descuento` INTEGER NULL DEFAULT 0,
    `en_oferta` BOOLEAN NULL DEFAULT false,
    `destacado` BOOLEAN NULL DEFAULT false,
    `nuevo` BOOLEAN NULL DEFAULT true,
    `rating_promedio` DOUBLE NULL DEFAULT 0,
    `total_vendidos` INTEGER NULL DEFAULT 0,
    `activo` BOOLEAN NULL DEFAULT true,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `subcategoriaId` INTEGER NOT NULL,
    `generoId` INTEGER NOT NULL,
    `marcaId` INTEGER NULL,
    `tipo_tallaId` INTEGER NULL,

    UNIQUE INDEX `producto_slug_key`(`slug`),
    INDEX `producto_slug_idx`(`slug`),
    INDEX `producto_activo_idx`(`activo`),
    INDEX `producto_subcategoriaId_idx`(`subcategoriaId`),
    INDEX `producto_marcaId_idx`(`marcaId`),
    INDEX `producto_generoId_idx`(`generoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atributo_producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `valor` VARCHAR(255) NOT NULL,
    `orden` INTEGER NULL DEFAULT 0,
    `especificacion` BOOLEAN NULL DEFAULT false,

    INDEX `atributo_producto_productoId_idx`(`productoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `color` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `codigo_hex` VARCHAR(7) NULL DEFAULT '#CCCCCC',
    `activo` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `color_nombre_key`(`nombre`),
    UNIQUE INDEX `color_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_talla` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `activo` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `tipo_talla_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `talla` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` VARCHAR(10) NOT NULL,
    `tipoTallaId` INTEGER NOT NULL,
    `activo` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `talla_valor_tipoTallaId_key`(`valor`, `tipoTallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variante_producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `colorId` INTEGER NOT NULL,
    `tallaId` INTEGER NOT NULL,
    `sku` VARCHAR(255) NULL,
    `codigo_barras` VARCHAR(50) NULL,
    `precio_extra` DECIMAL(8, 2) NULL DEFAULT 0.00,
    `costo_compra` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `cantidad_stock` INTEGER NULL DEFAULT 0,
    `stock_minimo` INTEGER NULL DEFAULT 5,
    `peso` DECIMAL(10, 2) NULL,
    `dimensiones` VARCHAR(100) NULL,
    `ubicacion_almacen` VARCHAR(50) NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `variante_producto_sku_key`(`sku`),
    INDEX `variante_producto_productoId_idx`(`productoId`),
    INDEX `variante_producto_colorId_idx`(`colorId`),
    INDEX `variante_producto_tallaId_idx`(`tallaId`),
    INDEX `variante_producto_cantidad_stock_idx`(`cantidad_stock`),
    INDEX `variante_producto_sku_idx`(`sku`),
    UNIQUE INDEX `variante_producto_productoId_colorId_tallaId_key`(`productoId`, `colorId`, `tallaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historial_stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `varianteId` INTEGER NOT NULL,
    `tipo_movimiento` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `cantidad_anterior` INTEGER NOT NULL,
    `cantidad_nueva` INTEGER NOT NULL,
    `motivo` VARCHAR(255) NULL,
    `usuarioId` INTEGER NULL,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `historial_stock_varianteId_idx`(`varianteId`),
    INDEX `historial_stock_creado_en_idx`(`creado_en`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto_imagen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `colorId` INTEGER NOT NULL,
    `url_imagen` VARCHAR(255) NOT NULL,
    `orden` INTEGER NULL DEFAULT 0,
    `es_principal` BOOLEAN NULL DEFAULT false,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `producto_imagen_productoId_idx`(`productoId`),
    INDEX `producto_imagen_colorId_idx`(`colorId`),
    INDEX `producto_imagen_productoId_colorId_idx`(`productoId`, `colorId`),
    INDEX `producto_imagen_es_principal_idx`(`es_principal`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password_hash` VARCHAR(255) NULL,
    `telefono` VARCHAR(20) NULL,
    `documento_tipo` ENUM('DNI', 'CE', 'PASAPORTE', 'RUC') NULL DEFAULT 'DNI',
    `documento_numero` VARCHAR(20) NULL,
    `genero` ENUM('MASCULINO', 'FEMENINO', 'OTRO', 'PREFIERO_NO_DECIR') NULL,
    `avatar` VARCHAR(255) NULL,
    `rol` ENUM('cliente', 'admin', 'vendedor', 'almacenero') NULL DEFAULT 'cliente',
    `email_verificado` BOOLEAN NULL DEFAULT false,
    `activo` BOOLEAN NULL DEFAULT true,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ultimo_login` TIMESTAMP(0) NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    INDEX `usuario_email_idx`(`email`),
    INDEX `usuario_rol_idx`(`rol`),
    INDEX `usuario_activo_idx`(`activo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `varianteId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,
    `agregado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `productoId` INTEGER NULL,

    INDEX `carrito_usuarioId_idx`(`usuarioId`),
    INDEX `carrito_varianteId_idx`(`varianteId`),
    UNIQUE INDEX `carrito_usuarioId_varianteId_key`(`usuarioId`, `varianteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_pedido` VARCHAR(20) NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `direccion_envio_id` INTEGER NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `costo_envio` DECIMAL(8, 2) NULL DEFAULT 0.00,
    `descuento` DECIMAL(8, 2) NULL DEFAULT 0.00,
    `igv` DECIMAL(8, 2) NULL DEFAULT 0.00,
    `total` DECIMAL(10, 2) NOT NULL,
    `estado` ENUM('pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado') NOT NULL DEFAULT 'pendiente',
    `estado_pago` ENUM('pendiente', 'pagado', 'rechazado', 'reembolsado') NOT NULL DEFAULT 'pendiente',
    `metodo_pago` VARCHAR(50) NULL,
    `tracking` VARCHAR(100) NULL,
    `notas` TEXT NULL,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `actualizado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `pedido_codigo_pedido_key`(`codigo_pedido`),
    INDEX `pedido_codigo_pedido_idx`(`codigo_pedido`),
    INDEX `pedido_usuarioId_idx`(`usuarioId`),
    INDEX `pedido_estado_idx`(`estado`),
    INDEX `pedido_creado_en_idx`(`creado_en`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `varianteId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` DECIMAL(10, 2) NOT NULL,
    `descuento_aplicado` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `productoId` INTEGER NULL,

    INDEX `detalle_pedido_pedidoId_idx`(`pedidoId`),
    INDEX `detalle_pedido_varianteId_idx`(`varianteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historial_pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `estado` VARCHAR(50) NOT NULL,
    `notas` TEXT NULL,
    `usuarioId` INTEGER NULL,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `historial_pedido_pedidoId_idx`(`pedidoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaccion_pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `metodo_pago` VARCHAR(50) NOT NULL,
    `codigo` VARCHAR(100) NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `estado` VARCHAR(50) NOT NULL,
    `respuesta` TEXT NULL,
    `fecha` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `transaccion_pago_pedidoId_idx`(`pedidoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resena` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `pedidoId` INTEGER NULL,
    `calificacion` INTEGER NOT NULL DEFAULT 5,
    `titulo` VARCHAR(150) NULL,
    `comentario` TEXT NULL,
    `ventajas` TEXT NULL,
    `desventajas` TEXT NULL,
    `aprobado` BOOLEAN NULL DEFAULT false,
    `creado_en` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `resena_productoId_idx`(`productoId`),
    INDEX `resena_usuarioId_idx`(`usuarioId`),
    INDEX `resena_aprobado_idx`(`aprobado`),
    INDEX `resena_calificacion_idx`(`calificacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `provincia` ADD CONSTRAINT `provincia_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `departamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distrito` ADD CONSTRAINT `distrito_provinciaId_fkey` FOREIGN KEY (`provinciaId`) REFERENCES `provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion` ADD CONSTRAINT `direccion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion` ADD CONSTRAINT `direccion_distritoId_fkey` FOREIGN KEY (`distritoId`) REFERENCES `distrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion` ADD CONSTRAINT `direccion_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `departamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion` ADD CONSTRAINT `direccion_provinciaId_fkey` FOREIGN KEY (`provinciaId`) REFERENCES `provincia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategoria` ADD CONSTRAINT `subcategoria_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_subcategoriaId_fkey` FOREIGN KEY (`subcategoriaId`) REFERENCES `subcategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `marca`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_tipo_tallaId_fkey` FOREIGN KEY (`tipo_tallaId`) REFERENCES `tipo_talla`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atributo_producto` ADD CONSTRAINT `atributo_producto_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `talla` ADD CONSTRAINT `talla_tipoTallaId_fkey` FOREIGN KEY (`tipoTallaId`) REFERENCES `tipo_talla`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variante_producto` ADD CONSTRAINT `variante_producto_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variante_producto` ADD CONSTRAINT `variante_producto_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variante_producto` ADD CONSTRAINT `variante_producto_tallaId_fkey` FOREIGN KEY (`tallaId`) REFERENCES `talla`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_stock` ADD CONSTRAINT `historial_stock_varianteId_fkey` FOREIGN KEY (`varianteId`) REFERENCES `variante_producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_stock` ADD CONSTRAINT `historial_stock_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producto_imagen` ADD CONSTRAINT `producto_imagen_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producto_imagen` ADD CONSTRAINT `producto_imagen_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carrito` ADD CONSTRAINT `carrito_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carrito` ADD CONSTRAINT `carrito_varianteId_fkey` FOREIGN KEY (`varianteId`) REFERENCES `variante_producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carrito` ADD CONSTRAINT `carrito_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_pedido` ADD CONSTRAINT `detalle_pedido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_pedido` ADD CONSTRAINT `detalle_pedido_varianteId_fkey` FOREIGN KEY (`varianteId`) REFERENCES `variante_producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_pedido` ADD CONSTRAINT `detalle_pedido_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_pedido` ADD CONSTRAINT `historial_pedido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_pedido` ADD CONSTRAINT `historial_pedido_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaccion_pago` ADD CONSTRAINT `transaccion_pago_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resena` ADD CONSTRAINT `resena_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resena` ADD CONSTRAINT `resena_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resena` ADD CONSTRAINT `resena_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedido`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
