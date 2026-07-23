// 'use server'

// import { auth } from "@/auth"
// import { prisma } from "@/libs"
// import { revalidatePath } from "next/cache"

// interface AddProductProps {
//     varianteId: number
//     cantidad: number
// }

// export const addProductCart = async ({ varianteId, cantidad }: AddProductProps) => {

//     const session = await auth()

//     if (!session?.user) {
//         return { ok: false, message: "No autenticado" }
//     }

//     if (cantidad <= 0) {
//         return { ok: false, message: "Cantidad inválida" }
//     }

//     const usuarioId = Number(session.user.id)

//     try {
//         const variante = await prisma.variante_producto.findUnique({
//             where: { id: varianteId }
//         })

//         if (!variante || !variante.activo) {
//             return { ok: false, message: "El producto no está disponible" }
//         }
//         const existente = await prisma.carrito.findUnique({
//             where: { usuarioId_varianteId: { usuarioId, varianteId } }
//         })


//         const cantidadDeseada = existente
//             ? existente.cantidad + cantidad
//             : cantidad

//         if (cantidadDeseada > (variante.cantidad_stock ?? 0)) {
//             return { ok: false, message: "No hay suficiente stock" }
//         }

//         await prisma.carrito.upsert({
//             where: { usuarioId_varianteId: { usuarioId, varianteId } },
//             update: { cantidad: cantidadDeseada },
//             create: {
//                 usuarioId,
//                 varianteId,
//                 productoId: variante.productoId,
//                 cantidad: cantidadDeseada
//             }
//         })

//         revalidatePath("/cart")

//         return { ok: true, message: "Producto agregado al carrito" }


//     } catch (error) {
//         console.error("Error al agregar producto:", error)
//         return { ok: false, message: "Error al agregar el producto" }
//     }

// }


"use server"

import { auth } from "@/auth"
import { prisma } from "@/libs"
import { CartActionResult, CartLineInput } from "@/src/interface/cart"
import { revalidatePath } from "next/cache"


/**
 * Agrega una variante al carrito del usuario autenticado. Si la
 * variante ya estaba en el carrito, suma la cantidad a la existente.
 * Valida stock disponible antes de persistir.
 */
export async function addProductCart({
    varianteId,
    cantidad,
}: CartLineInput): Promise<CartActionResult> {
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

        const lineaExistente = await prisma.carrito.findUnique({
            where: { usuarioId_varianteId: { usuarioId, varianteId } },
        })

        const cantidadDeseada = (lineaExistente?.cantidad ?? 0) + cantidad

        if (cantidadDeseada > (variante.cantidad_stock ?? 0)) {
            return { ok: false, message: "No hay suficiente stock" }
        }

        await prisma.carrito.upsert({
            where: { usuarioId_varianteId: { usuarioId, varianteId } },
            update: { cantidad: cantidadDeseada },
            create: {
                usuarioId,
                varianteId,
                productoId: variante.productoId,
                cantidad: cantidadDeseada,
            },
        })

        revalidatePath("/cart")
        return { ok: true, message: "Producto agregado al carrito" }
    } catch (error) {
        console.error("[add-product] Error al agregar producto:", error)
        return { ok: false, message: "Error al agregar el producto" }
    }
}