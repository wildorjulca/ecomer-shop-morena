'use server'

import { prisma } from '@/libs'
import { revalidatePath } from 'next/cache'

type VarianteInput = {
    colorId: number
    codigo_hex: string | null
    // color_nombre: string

    tallaId: number
    // talla_valor: string

    precio_extra: number
    cantidad_stock: number
}

type ImagenInput = {
    color_id: number
    url_imagen: string
    publicId: string
    orden?: number
    es_principal?: boolean
}

export type CreateProductPayload = {
    nombre: string
    slug: string
    descripcion?: string
    caracteristicas?: string

    precio_base_venta: number
    precio_compra: number
    precio_descuento?: number

    // categoria_id: number
    subcategoriaId: number
    generoId: number
    marcaId?: number

    nuevo?: boolean
    activo?: boolean

    variantes: VarianteInput[]
    imagenes: ImagenInput[]
}

export async function saveProduct(payload: CreateProductPayload) {


    const slug = payload.nombre.trim()
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("'", " ")

    try {
        const product = await prisma.producto.create({
            data: {
                nombre: payload.nombre,
                slug: slug,
                descripcion: payload.descripcion,
                // caracteristicas: payload.caracteristicas,

                precio_base_venta: payload.precio_base_venta,
                precio_compra: payload.precio_compra,
                precio_descuento: payload.precio_descuento,

                // categoria_id: payload.categoria_id,
                subcategoriaId: payload.subcategoriaId,
                generoId: payload.generoId,
                marcaId: payload.marcaId,

                nuevo: payload.nuevo ?? true,
                activo: payload.activo ?? true,

                // ✅ Variantes
                variante: {
                    create: payload.variantes.map((v) => ({
                        colorId: v.colorId,
                        tallaId: v.tallaId,
                        precio_extra: Number(v.precio_extra || 0),
                        // cantidad_stock: Number(v.cantidad_stock || 0),
                        cantidad_stock:  15

                    })),
                },

                // ✅ Imágenes
                imagen: {
                    create: payload.imagenes.map((img) => ({
                        colorId: img.color_id,
                        url_imagen: img.url_imagen,
                        publicId: img.publicId,
                        orden: img.orden ?? 0,
                        es_principal: img.es_principal ?? false,
                    })),
                },
            },

            include: {
                variante: true,
                imagen: true,
            },
        })

        // revalidatePath('/admin/productos')

        return {
            ok: true,
            product,
        }

    } catch (error) {
        console.error(error)
        return {
            ok: false,
            message: 'Error al guardar el producto',
        }

    }
}
