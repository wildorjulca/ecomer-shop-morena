'use server'

import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/libs"

interface Props {
    gender: string
    brands?: string[],
    categories?: string[],
    sort?: "recent" | "price-asc" | "price-desc" | "best-selling"
}

// ✅ TIPOS (MUY IMPORTANTE)
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

export const getProducts = async ({ gender, brands, categories, sort }: Props) => {

    const where:
        Prisma.productoWhereInput = {

        activo: true,

        genero: {
            slug: gender.toLowerCase()
        }

    }

    // FILTER BRANDS
    if (
        brands &&
        brands.length > 0
    ) {

        where.marca = {
            slug: {
                in: brands.map((b) => b.trim())
            }

        }

    }

    // FILTER DE CATEGORIAS
    if (categories && categories.length > 0) {
        where.subcategoria = {
            categoria: {
                slug: {
                    in: categories.map(cat => cat.trim())
                }
            }
        }
    }



    let orderBy: Prisma.productoOrderByWithRelationInput = {
        id: "desc"
    }

    switch (sort) {
        case "price-asc":
            orderBy = {
                precio_base_venta: "asc"
            }
            break

        case "price-desc":
            orderBy = {
                precio_base_venta: "desc"
            }
            break

        case "best-selling":
            orderBy = {
                total_vendidos: "desc"
            }
            break

        case "recent":
        default:
            orderBy = {
                creado_en: "desc"
            }
            break
    }


    try {

        const products = await prisma.producto.findMany({
            where: where,
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
            orderBy: orderBy
        })

        return {
            ok: true,
            products: products.map((p) => {

                // ===============================
                // 🎨 AGRUPAR COLORES + TALLAS + STOCK
                // ===============================
                const coloresMap = new Map<number, Color>() // ✅ TIPADO

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

                    // evitar duplicados
                    if (!colorObj.tallas.find((t) => t.id === v.talla.id)) {
                        colorObj.tallas.push({
                            id: v.talla.id,
                            valor: v.talla.valor,
                            stock: v.cantidad_stock ?? 0,
                            disponible: (v.cantidad_stock ?? 0) > 0 // ✅ FIX
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
                        imagenes: [],
                        color_default: null,
                        colores_disponibles,

                        isFavorite: false  //todo: este se va ser con el usuario (auth)

                        // tallas: [] as Talla[] 
                    }
                }

                const color_default = colores_disponibles.find(
                    c => c.id === imagenPrincipal.colorId
                )

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

                // ===============================
                // 🎯 TALLAS DEL COLOR ACTIVO
                // ===============================
                const tallas: Talla[] = colores_ordenados.find(
                    c => c.id === color_default?.id
                )?.tallas || []

                // ===============================
                // 🚀 RETURN FINAL
                // ===============================
                return {
                    id: p.id,
                    nombre: p.nombre,
                    slug: p.slug,
                    precio_base_venta: Number(p.precio_base_venta),
                    precio_descuento: Number(p.precio_descuento),
                    porcentaje_descuento: Number(p.porcentaje_descuento),
                    en_oferta: p.en_oferta ?? false,

                    imagenes,
                    color_default: color_default ?? null,

                    // 🔥 colores con tallas + stock
                    colores_disponibles: colores_ordenados,

                    isFavorite: false  //todo: este se va ser con el usuario (auth)


                    // 🔥 tallas del color activo
                    // tallas
                }
            })
        }

    } catch (error) {
        console.error("❌ getProducts error:", error)
        return {
            ok: false,
            message: 'Ocurrió un error al obtener los productos.',
            products: []

        }
    }
}