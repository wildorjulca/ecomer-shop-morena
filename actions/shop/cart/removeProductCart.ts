"use server"

import { auth } from "@/auth"
import { prisma } from "@/libs"
import { revalidatePath } from "next/cache"

export async function removeProductCart(varianteId: number) {
    const session = await auth()

    if (!session?.user) {
        return { ok: false, message: "No autenticado" }
    }

    const usuarioId = Number(session.user.id)

    try {
        await prisma.carrito.delete({
            where: { usuarioId_varianteId: { usuarioId, varianteId } }
        })

        revalidatePath("/cart")

        return { ok: true, message: "Producto eliminado" }

    } catch (error) {
        console.error("Error al eliminar producto:", error)
        return { ok: false, message: "Error al eliminar el producto" }
    }
}