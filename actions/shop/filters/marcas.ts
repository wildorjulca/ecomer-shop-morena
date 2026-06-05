'use server'

import { prisma } from "@/libs"

export const getMarcas = async (generoSlug: string) => {
    const marcas = await prisma.marca.findMany({
        select: {
            nombre: true,
            slug: true,
            _count: {
                select: {
                    producto: {
                        where: {
                            genero: {
                                slug: generoSlug.toLowerCase()
                            }
                        }
                    }
                }
            }
        }
    })

    return marcas.map((p) => ({
        nombre: p.nombre,
        slug: p.slug,
        count: p._count.producto

    }))

    return marcas
}