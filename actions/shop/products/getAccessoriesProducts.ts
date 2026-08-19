'use server'

import { prisma } from "@/libs"
import { Product } from "@/src/interface/products"

type Color = {
    id: number
    nombre: string
    codigo_hex: string
    tallas: {
        id: number
        valor: string
        stock: number
        disponible: boolean
    }[]
}

/**
 * Obtiene productos de la categoría "Accesorios"
 * con sus imágenes, colores y tallas disponibles.
 */
export const getAccessoriesProducts = async (limit = 10): Promise<Product[]> => {
    try {
        const products = await prisma.producto.findMany({
            take: limit,
            where: {
                activo: true,
                subcategoria: {
                    categoria: {
                        // Busca por slug o nombre (insensitive) para máxima compatibilidad
                        OR: [
                            { slug: { contains: 'accesori' } },
                            { nombre: { contains: 'Accesori' } },
                        ]
                    }
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
                        es_principal: true,
                        orden: true,
                    },
                    orderBy: { orden: 'asc' },
                },
                variante: {
                    where: { activo: true },
                    select: {
                        cantidad_stock: true,
                        color: {
                            select: {
                                id: true,
                                nombre: true,
                                codigo_hex: true,
                            }
                        },
                        talla: {
                            select: {
                                id: true,
                                valor: true,
                            }
                        }
                    }
                }
            },
            orderBy: [
                { destacado: 'desc' },
                { total_vendidos: 'desc' },
                { creado_en: 'desc' },
            ]
        })

        if (!products.length) return []

        return products.map((p) => {
            // ── Agrupar colores + tallas + stock ──
            const coloresMap = new Map<number, Color>()

            p.variante.forEach((v) => {
                const colorId = v.color.id

                if (!coloresMap.has(colorId)) {
                    coloresMap.set(colorId, {
                        id: v.color.id,
                        nombre: v.color.nombre,
                        codigo_hex: v.color.codigo_hex ?? '#CCCCCC',
                        tallas: []
                    })
                }

                const colorObj = coloresMap.get(colorId)!

                if (!colorObj.tallas.find((t) => t.id === v.talla.id)) {
                    colorObj.tallas.push({
                        id: v.talla.id,
                        valor: v.talla.valor,
                        stock: v.cantidad_stock ?? 0,
                        disponible: (v.cantidad_stock ?? 0) > 0,
                    })
                }
            })

            const colores_disponibles = Array.from(coloresMap.values())

            // ── Imagen principal ──
            const imagenPrincipal =
                p.imagen.find((img) => img.es_principal) ?? p.imagen[0]

            if (!imagenPrincipal) {
                return {
                    id: p.id,
                    nombre: p.nombre,
                    slug: p.slug,
                    precio_base_venta: Number(p.precio_base_venta),
                    precio_descuento: Number(p.precio_descuento ?? 0),
                    porcentaje_descuento: Number(p.porcentaje_descuento ?? 0),
                    en_oferta: p.en_oferta ?? false,
                    imagenes: [] as string[],
                    color_default: null,
                    colores_disponibles,
                    isFavorite: false,
                }
            }

            const color_default =
                colores_disponibles.find((c) => c.id === imagenPrincipal.colorId) ?? null

            // ── Imágenes del color por defecto ──
            const imagenes = p.imagen
                .filter((img) => img.colorId === imagenPrincipal.colorId)
                .sort((a, b) => Number(b.es_principal) - Number(a.es_principal))
                .map((img) => img.url_imagen)

            // ── Reordenar: color default primero ──
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
                precio_descuento: Number(p.precio_descuento ?? 0),
                porcentaje_descuento: Number(p.porcentaje_descuento ?? 0),
                en_oferta: p.en_oferta ?? false,
                imagenes,
                color_default,
                colores_disponibles: colores_ordenados,
                isFavorite: false,
            }
        })
    } catch (error) {
        console.error('Error al cargar accesorios:', error)
        return []
    }
}
