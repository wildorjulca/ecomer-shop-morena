"use server"

import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

import { prisma } from "@/libs"
import { CartActionResult } from "@/src/interface/cart"

/**
 * Actualiza la cantidad de una variante ya presente en el carrito.
 * Valida que la cantidad sea positiva y que no supere el stock.
 */
export async function updateQuantityCart(
    varianteId: number,
    cantidad: number
): Promise<CartActionResult> {

    const session = await auth()
    if (!session?.user) {
        return { ok: false, message: "No autenticado" }
    }

    if (cantidad <= 0) {
        return { ok: false, message: "Cantidad inválida" }
    }

    const usuarioId = Number(session.user.id)

    try {
        const variante = await prisma.variante_producto.findUnique({
            where: { id: varianteId },
        })

        if (!variante || !variante.activo) {
            return { ok: false, message: "El producto no está disponible" }
        }

        if (cantidad > (variante.cantidad_stock ?? 0)) {
            return { ok: false, message: "No hay suficiente stock" }
        }

        await prisma.carrito.update({
            where: { usuarioId_varianteId: { usuarioId, varianteId } },
            data: { cantidad },
        })

        revalidatePath("/cart")
        return { ok: true, message: "Cantidad actualizada" }
    } catch (error) {
        console.error("[update-quantity] Error al actualizar cantidad:", error)
        return { ok: false, message: "Error al actualizar la cantidad" }
    }
}