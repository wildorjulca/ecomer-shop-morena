'use server'

import { prisma } from "@/libs"

export const getProductsFavorites = async (idUsuario: number) => {
    try {

        const products = await prisma.wishlist.findMany({
            where: {
                usuario_id: idUsuario
            },
            include: {
                producto: {
                    include: {
                        imagen: true,
                        variante: {
                            include: {
                                color: true
                            }
                        }
                    }
                }
            }
        })

        const formatproduct = products.map((w) => {

            const p = w.producto // 🔥 importante

            // ===============================
            // COLORES DISPONIBLES
            // ===============================
            const coloresMap = new Map()

            p.variante.forEach((v) => {
                coloresMap.set(v.color.id, v.color)
            })

            const colores_disponibles = Array.from(coloresMap.values())

            // ===============================
            // IMAGEN PRINCIPAL
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
                    en_oferta: p.en_oferta,
                    imagenes: [],
                    color_default: null,
                    colores_disponibles
                }
            }

            const color_default = colores_disponibles.find(
                c => c.id === imagenPrincipal.colorId
            )

            const imagenes = p.imagen
                .filter(img => img.colorId === imagenPrincipal.colorId)
                .sort((a, b) => Number(b.es_principal) - Number(a.es_principal))
                .map(img => img.url_imagen)

            // 🔥 REORDENAR COLORES
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
                en_oferta: p.en_oferta,

                imagenes,
                color_default,
                colores_disponibles: colores_ordenados,
                isFavorite: true
            }
        })

        return {
            ok: true,
            products: formatproduct
        }

    } catch (error) {
        console.error('❌ getProductsFavorites error:', error)

        return {
            ok: false,
            products: [],
            message: 'No se pudieron cargar los productos'
        }
    }
}