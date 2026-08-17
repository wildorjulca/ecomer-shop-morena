'use server'

import { prisma, sleep } from '@/libs'

interface VerifyStockResponse {
    ok: boolean
    message?: string
}

export const verificarStock = async (
    varianteId: number,
    quantity: number
): Promise<VerifyStockResponse> => {

    // await sleep(1)

    // 🔹 Validación básica
    if (!varianteId || quantity <= 0) {
        return {
            ok: false,
            message: 'Datos inválidos'
        }
    }

    try {
        const variante = await prisma.variante_producto.findUnique({
            where: { id: varianteId },
            select: {
                cantidad_stock: true,
            },
        })

        // 🔹 No existe
        if (!variante) {
            return {
                ok: false,
                message: 'Variante no encontrada'
            }
        }

        const stock = variante.cantidad_stock ?? 0

        // 🔹 Comparación correcta
        const inStock = stock >= quantity


        return {
            ok: inStock,
            message: inStock
                ? 'Stock disponible'
                : `Stock insuficiente. Solo quedan ${variante.cantidad_stock ?? 0} unidades disponibles.`
        }

    } catch (error) {
        console.error('[VERIFY_STOCK_ERROR]', error)

        return {
            ok: false,
            message: 'Error al verificar el stock'
        }
    }
}