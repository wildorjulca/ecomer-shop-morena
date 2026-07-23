"use server";

import { prisma } from "@/libs";


/**
 * Obtiene estadísticas del módulo de productos
 * (server-only)
 */
export async function getProductosStats() {
    const [
        total,
        activos,
        sinStock,
        enOferta,
    ] = await Promise.all([
        prisma.producto.count(),
        prisma.producto.count({
            where: { activo: true },
        }),
        prisma.variante_producto.count({
            where: {
                cantidad_stock: {
                    lte: 0,
                },
            },
        }),
        prisma.producto.count({
            where: {
                en_oferta: true,
            },
        }),
    ]);

    return {
        total,
        activos,
        sinStock,
        enOferta,
    };
}