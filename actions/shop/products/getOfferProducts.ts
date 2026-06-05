'use server'

import { prisma } from "@/libs"

type Talla = {
    id: number
    valor: string
    stock: number
    disponible: boolean
}

type Color = {
    id: number
    nombre: string
    codigo_hex: string
    tallas: Talla[]
}
export const getOfferProducts = async () => {
    try {
        const products = await prisma.producto.findMany({
            take: 8,
            where: { en_oferta: true },
            select: {
                id: true,
                nombre: true,
                slug: true,
                precio_base_venta: true,
                precio_descuento: true,
                porcentaje_descuento: true,
                en_oferta: true,

                imagen: {
                    select: {
                        colorId: true,
                        url_imagen: true,
                        es_principal: true
                    }
                },

                // ✅ IGUAL QUE EL OTRO (IMPORTANTE)
                variante: {
                    select: {
                        cantidad_stock: true,
                        color: {
                            select: {
                                id: true,
                                nombre: true,
                                codigo_hex: true
                            }
                        },
                        talla: {
                            select: {
                                id: true,
                                valor: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        })
        const formatproduct = products.map((p) => {

            // ===============================
            // 🎨 AGRUPAR COLORES + TALLAS + STOCK
            // ===============================
            const coloresMap = new Map<number, Color>()

            p.variante.forEach((v) => {
                const colorId = v.color.id

                if (!coloresMap.has(colorId)) {
                    coloresMap.set(colorId, {
                        id: v.color.id,
                        nombre: v.color.nombre,
                        codigo_hex: v.color.codigo_hex ?? "",
                        tallas: []
                    })
                }

                const colorObj = coloresMap.get(colorId)!

                if (!colorObj.tallas.find((t) => t.id === v.talla.id)) {
                    colorObj.tallas.push({
                        id: v.talla.id,
                        valor: v.talla.valor,
                        stock: v.cantidad_stock ?? 0,
                        disponible: (v.cantidad_stock ?? 0) > 0
                    })
                }
            })

            const colores_disponibles = Array.from(coloresMap.values())

            // ===============================
            // 🖼️ IMAGEN PRINCIPAL
            // ===============================
            const imagenPrincipal =
                p.imagen.find(img => img.es_principal) || p.imagen[0]

            if (!imagenPrincipal) {
                return {
                    id: p.id,
                    nombre: p.nombre,
                    slug: p.slug,
                    precio_base_venta: Number(p.precio_base_venta),
                    precio_descuento: Number(p.precio_descuento),
                    porcentaje_descuento: Number(p.porcentaje_descuento),
                    en_oferta: p.en_oferta ?? false,
                    imagenes: [] as string[],
                    color_default: null,
                    colores_disponibles,
                    isFavorite: false //!!TODO: este se verificara si ese productos es favorito para el usuario.
                }
            }

            const color_default =
                colores_disponibles.find(
                    c => c.id === imagenPrincipal.colorId
                ) ?? null

            // ===============================
            // 🖼️ IMÁGENES DEL COLOR
            // ===============================
            const imagenes = p.imagen
                .filter(img => img.colorId === imagenPrincipal.colorId)
                .sort((a, b) => Number(b.es_principal) - Number(a.es_principal))
                .map(img => img.url_imagen)

            // ===============================
            // 🔥 REORDENAR COLORES
            // ===============================
            const colores_ordenados = [...colores_disponibles].sort((a, b) => {
                if (a.id === color_default?.id) return -1
                if (b.id === color_default?.id) return 1
                return 0
            })

            return {
                id: p.id,
                nombre: p.nombre,
                slug: p.slug,
                precio_base_venta: Number(p.precio_base_venta),
                precio_descuento: Number(p.precio_descuento),
                porcentaje_descuento: Number(p.porcentaje_descuento),
                en_oferta: p.en_oferta ?? false,

                imagenes,
                color_default,

                // 🔥 IGUAL ESTRUCTURA
                colores_disponibles: colores_ordenados,
                isFavorite: false
            }
        })

        return formatproduct
    } catch (error) {
        console.log("Error al cargar los productos de ofertas: ", error)
        return []
    }

}