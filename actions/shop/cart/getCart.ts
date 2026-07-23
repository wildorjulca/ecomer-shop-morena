"use server"

import { auth } from "@/auth"
import { prisma } from "@/libs"
import { CartProduct } from "@/src/interface/cart"

/**
 * Devuelve el carrito guardado en BD para el usuario autenticado.
 * Si no hay sesión, devuelve un arreglo vacío (nunca lanza error),
 * para que el caller pueda usarlo sin chequear autenticación primero.
 */
export async function getCart(): Promise<CartProduct[]> {
    const session = await auth()
    if (!session?.user) return []

    const usuarioId = Number(session.user.id)

    const lineas = await prisma.carrito.findMany({
        where: { usuarioId },
        include: {
            variante: {
                include: {
                    color: true,
                    talla: true,
                    producto: { include: { imagen: true } },
                },
            },
        },
        orderBy: { agregado_en: "desc" },
    })

    return lineas.map((linea) => {
        const { variante } = linea
        const { producto } = variante

        const imagenPrincipal =
            producto.imagen.find((img) => img.es_principal && img.colorId === variante.colorId) ??
            producto.imagen.find((img) => img.colorId === variante.colorId) ??
            producto.imagen[0]

        const cartProduct: CartProduct = {
            id: producto.id,
            varianteId: linea.varianteId,
            nombre: producto.nombre,
            precio: Number(producto.precio_base_venta) + Number(variante.precio_extra ?? 0),
            porcentaje_descuento: producto.porcentaje_descuento ?? 0,
            precio_descuento: producto.precio_descuento ? Number(producto.precio_descuento) : undefined,
            en_oferta: producto.en_oferta ?? false,
            cantidad: linea.cantidad,
            imagen: imagenPrincipal?.url_imagen ?? "",
            color: variante.color.nombre,
            talla: variante.talla.valor,
        }

        return cartProduct
    })
}