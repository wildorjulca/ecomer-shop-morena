'use server'

import { prisma } from "@/libs"

export const getSubcategoria = async (categoriaSlug?: string, generoSlug?: string) => {
    const subcategorias = await prisma.subcategoria.findMany({
        where: {
            categoria: { slug: categoriaSlug }
        },
        select: {
            nombre: true,
            slug: true,
            _count: {
                select: {
                    producto: {
                        where: {
                            activo: true,
                            genero: {
                                slug: generoSlug?.toLocaleLowerCase()
                            }
                        }
                    }
                }
            }
        }
    })

    return subcategorias.map(sub => ({
        nombre: sub.nombre,
        slug: sub.slug,
        count: sub._count.producto
    }))

}