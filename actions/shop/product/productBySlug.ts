'use server'

import { auth } from "@/auth"
import { prisma } from "@/libs"
import { ProductSlug } from "@/src/interface/ProductSlug";

type GetProductBySlugResponse =
    | { ok: true; product: ProductSlug }
    | { ok: false; message: string }

export const getProductBySlug = async (
    slug: string
): Promise<GetProductBySlugResponse> => {

    const session = await auth()
    const user = session?.user
    const userId = Number(user?.id)

    try {

        const product = await prisma.producto.findFirst({
            where: { slug },
            select: {
                id: true,
                nombre: true,
                slug: true,
                descripcion: true,
                precio_base_venta: true,
                precio_descuento: true,
                porcentaje_descuento: true,
                en_oferta: true,
                // ? => Este me servira para listar los productos similres a este slug
                subcategoria: {
                    select: {
                        slug: true,
                    }
                },
                genero: {
                    select: {
                        slug: true
                    }
                },
                imagen: {
                    select: {
                        id: true,
                        url_imagen: true,
                        es_principal: true,
                        colorId: true,
                        color: {
                            select: {
                                id: true,
                                nombre: true,
                                slug: true,
                                codigo_hex: true,
                            }
                        }
                    }
                },

                variante: {
                    select: {
                        precio_extra: true,
                        color: {
                            select: {
                                id: true,
                                nombre: true,
                                codigo_hex: true
                            },
                        },
                        talla: {
                            select: {
                                id: true,
                                valor: true
                            }
                        }
                    }
                },

                wishlists: userId
                    ? {
                        where: { usuario_id: userId }
                    }
                    : false
            }
        })

        console.log(product)

        if (!product) {
            return { ok: false, message: "No product" }
        }

        // ===============================
        // 🎨 COLORES DISPONIBLES
        // ===============================
        const coloresDisponibles = Array.from(
            new Map(
                product.variante.map(v => [
                    v.color.id,
                    {
                        ...v.color,
                        codigo_hex: v.color.codigo_hex ?? ""
                    }
                ])
            ).values()
        )

        // ===============================
        // 🖼️ IMAGEN PRINCIPAL
        // ===============================
        const imagenPrincipal =
            product.imagen.find(img => img.es_principal) ||
            product.imagen[0]

        // ===============================
        // 🚨 SI NO HAY IMÁGENES
        // ===============================
        if (!imagenPrincipal) {

            const fallbackColor = coloresDisponibles[0]

            return {
                ok: true,
                product: {
                    id: product.id,
                    nombre: product.nombre,
                    slug: product.slug,
                    descripcion: product.descripcion ?? "",
                    precio_base_venta: Number(product.precio_base_venta),
                    precio_descuento: Number(product.precio_descuento),
                    porcentaje_descuento: Number(product.porcentaje_descuento),
                    en_oferta: product.en_oferta ?? false,

                    subcategoria: product.subcategoria.slug,
                    genero: product.genero.slug,
                    imagenes: [],
                    color_default: fallbackColor, // ✅ nunca null
                    coloresDisponibles,
                    isFavorite: false
                }
            }
        }

        // ===============================
        // 🎯 COLOR BASE (ROBUSTO)
        // ===============================
        const colorIdBase =
            imagenPrincipal.colorId ?? coloresDisponibles[0]?.id

        const color_default =
            coloresDisponibles.find(c => c.id === colorIdBase) ||
            coloresDisponibles[0]

        // ===============================
        // 🖼️ IMÁGENES DEL COLOR ACTIVO
        // ===============================
        const imagenes = product.imagen
            .filter(img => img.colorId === color_default.id)
            .sort((a, b) => Number(b.es_principal) - Number(a.es_principal))
            .map(img => img.url_imagen)

        // ===============================
        // ❤️ FAVORITOS
        // ===============================
        const isFavorite = userId
            ? product.wishlists.length > 0
            : false

        // ===============================
        // 🚀 RETURN FINAL
        // ===============================
        return {
            ok: true,
            product: {
                id: product.id,
                nombre: product.nombre,
                slug: product.slug,
                descripcion: product.descripcion ?? "",
                precio_base_venta: Number(product.precio_base_venta),
                precio_descuento: Number(product.precio_descuento),
                porcentaje_descuento: Number(product.porcentaje_descuento),
                en_oferta: product.en_oferta ?? false,

                subcategoria: product.subcategoria.slug,
                genero: product.genero.slug,
                imagenes,
                color_default, // ✅ SIEMPRE DEFINIDO
                coloresDisponibles,
                isFavorite
            }
        }

    } catch (error) {
        console.log("Error: ", error)

        return {
            ok: false,
            message: "Error en el fetch de product slug"
        }
    }
}
export const getTallaProductByColor = async (productId: number, colorId: number) => {

    try {
        const tallas = await prisma.variante_producto.findMany({
            where: { productoId: productId, colorId: colorId },
            select: {
                id: true,
                cantidad_stock: true,
                precio_extra: true,
                talla: {
                    select: {
                        id: true,
                        valor: true
                    }
                }
            }
        })

        if (!tallas) {
            return {
                ok: false,
                message: "No se econtraron tallas"
            }
        }

        const varianteTallas = tallas.map(v => ({
            variante_id: v.id,
            talla_id: v.talla.id,
            talla_valor: v.talla.valor,
            precio_extra: Number(v.precio_extra),
            stock: v.cantidad_stock??0
        }))
        return {
            ok: true,
            varianteTallas: varianteTallas
        }


    } catch (error) {
        console.log("Error: ", error)
        return {
            ok: false,
            message: error
        }
    }
}
export const getImagesProductByColor = async (productoId: number, colorId: number) => {
    try {
        const images = await prisma.producto_imagen.findMany({
            where: { productoId, colorId },
            select: {
                url_imagen: true
            }
        })
        const imagenesMap = images.map((img) => img.url_imagen)

        return {
            ok: true,
            imagenes: imagenesMap
        }

    } catch (error) {
        console.log("Error: ", error)
        return {
            ok: false,
            imagenes: [],
            message: error
        }
    }
}