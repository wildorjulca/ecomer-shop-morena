// "use server"

// import { auth } from "@/auth"
// import { prisma } from "@/libs"
// import { revalidatePath } from "next/cache"

// interface MergeCartProduct {
//     varianteId: number
//     cantidad: number
// }

// export async function mergeCart(products: MergeCartProduct[]) {
//     const session = await auth()

//     if (!session?.user) {
//         return { ok: false, message: "No autenticado" }
//     }

//     if (!products || products.length === 0) {
//         return { ok: true, message: "No hay productos para sincronizar" }
//     }

//     const usuarioId = Number(session.user.id)

//     try {
//         await prisma.$transaction(async (tx) => {
//             for (const product of products) {

//                 const variante = await tx.variante_producto.findUnique({
//                     where: { id: product.varianteId }
//                 })

//                 if (!variante || !variante.activo) continue

//                 const existente = await tx.carrito.findUnique({
//                     where: {
//                         usuarioId_varianteId: {
//                             usuarioId,
//                             varianteId: product.varianteId
//                         }
//                     }
//                 })

//                 // Si ya existía en la BD, se suman las cantidades (invitado + BD)
//                 const cantidadDeseada = existente
//                     ? existente.cantidad + product.cantidad
//                     : product.cantidad

//                 const cantidadFinal = Math.min(cantidadDeseada, variante.cantidad_stock ?? 0)

//                 if (cantidadFinal <= 0) continue

//                 await tx.carrito.upsert({
//                     where: {
//                         usuarioId_varianteId: {
//                             usuarioId,
//                             varianteId: product.varianteId
//                         }
//                     },
//                     update: { cantidad: cantidadFinal },
//                     create: {
//                         usuarioId,
//                         varianteId: product.varianteId,
//                         productoId: variante.productoId,
//                         cantidad: cantidadFinal
//                     }
//                 })
//             }
//         })

//         revalidatePath("/cart")

//         return { ok: true, message: "Carrito sincronizado" }

//     } catch (error) {
//         console.error("Error al sincronizar el carrito:", error)
//         return { ok: false, message: "Error al sincronizar el carrito" }
//     }
// }


"use server"

import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

// import { CartLineInput, CartActionResult } from "@/src/types/cart"
import { prisma } from "@/libs"
import { CartActionResult, CartLineInput } from "@/src/interface/cart"

/**
 * Fusiona un carrito de invitado (localStorage) con el carrito que el
 * usuario ya tenía guardado en BD. Se usa una única vez, justo después
 * de que el usuario inicia sesión.
 *
 * Regla de negocio: si una variante ya existía en la BD, las cantidades
 * se SUMAN (invitado + BD). El resultado siempre se recorta al stock
 * disponible para no vender de más.
 */
export async function mergeCart(lineas: CartLineInput[]): Promise<CartActionResult> {
    const session = await auth()
    if (!session?.user) {
        return { ok: false, message: "No autenticado" }
    }

    if (!lineas || lineas.length === 0) {
        return { ok: true, message: "No hay productos para sincronizar" }
    }

    const usuarioId = Number(session.user.id)

    try {
        await prisma.$transaction(async (tx) => {
            for (const linea of lineas) {
                const variante = await tx.variante_producto.findUnique({
                    where: { id: linea.varianteId },
                })

                // Producto ya no existe o fue desactivado: se ignora en el merge.
                if (!variante || !variante.activo) continue

                const lineaExistente = await tx.carrito.findUnique({
                    where: {
                        usuarioId_varianteId: { usuarioId, varianteId: linea.varianteId },
                    },
                })

                // Usamos el máximo entre lo que había en BD y lo que trajo el
                // invitado, en vez de sumar ambos. Esto hace que el merge sea
                // idempotente: si se ejecuta dos veces no duplica cantidades.
                // Ejemplo: BD=0, invitado=1 → max(0,1)=1 ✓
                //          BD=1, invitado=1 → max(1,1)=1 ✓ (no suma a 2)
                //          BD=2, invitado=1 → max(2,1)=2 ✓ (respeta la BD si tiene más)
                const cantidadDeseada = Math.max(lineaExistente?.cantidad ?? 0, linea.cantidad)
                const cantidadFinal = Math.min(cantidadDeseada, variante.cantidad_stock ?? 0)

                // Si no queda stock, no se crea/actualiza la línea.
                if (cantidadFinal <= 0) continue

                await tx.carrito.upsert({
                    where: {
                        usuarioId_varianteId: { usuarioId, varianteId: linea.varianteId },
                    },
                    update: { cantidad: cantidadFinal },
                    create: {
                        usuarioId,
                        varianteId: linea.varianteId,
                        productoId: variante.productoId,
                        cantidad: cantidadFinal,
                    },
                })
            }
        })

        revalidatePath("/cart")
        return { ok: true, message: "Carrito sincronizado" }
    } catch (error) {
        console.error("[merge-cart] Error al sincronizar el carrito:", error)
        return { ok: false, message: "Error al sincronizar el carrito" }
    }
}