'use server'

import { prisma } from "@/libs"

export const getProductsSimilares = async (subcategoria: string, genero: string) => {
    try {
        // const where: productoWhereInput = {
        //        activo: true,
        //        genero: {
        //            slug: genderSlug,
        //        },
        //        subcategoria: {
        //            // slug: categorySlug,
        //            categoria: {
        //                slug: categorySlug,
        //            },
        //        }
        //    }

        //    if (subcategoriaSlug) {
        //        where.subcategoria!.slug = subcategoriaSlug
        //    }

        const products = await prisma.producto.findMany({
            where: {
                subcategoria: {
                    slug: subcategoria
                },
                genero: {
                    slug: genero,
                }
            },
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

                variante: {
                    select: {
                        color: {
                            select: {
                                id: true,
                                nombre: true,
                                codigo_hex: true
                            }
                        }
                    }
                },
                // wishlist: userId ?
                //     {
                //         where:
                //             { usuario_id: userId },
                //         select: { id: true }
                //     } : false
            },
            orderBy: {
                id: "desc"
            }
        })

        const formatproduct = products.map((p) => {

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

            // 🔥 REORDENAR COLORES (color actual primero)
            const colores_ordenados = [...colores_disponibles].sort((a, b) => {
                if (a.id === color_default?.id) return -1
                if (b.id === color_default?.id) return 1
                return 0
            })
            // const isFavorite = userId ? p.wishlist > 0 : false
            return {
                id: p.id,
                nombre: p.nombre,
                slug: p.slug,
                precio_base_venta: Number(p.precio_base_venta),
                precio_descuento: Number(p.precio_descuento),
                porcentaje_descuento: Number(p.porcentaje_descuento),
                en_oferta: p.en_oferta,
                // isFavorite,

                imagenes,
                color_default,
                colores_disponibles: colores_ordenados
            }
        })

        return {
            ok: true,
            products: formatproduct
        }

    } catch (error) {
        console.log("Error al obtener los productos similares", error)
        return {
            ok: false,
            message: "Error al obtener los productos"
        }
    }

}