'use server'

import { prisma } from "@/libs"

export const getCategories = async (generoSlug?: string) => {

    const categories = await prisma.categoria.findMany({
        where: {
            subcategoria: {
                some: {
                    producto: {
                        some: generoSlug
                            ? {
                                genero: {
                                    slug: generoSlug.toLowerCase()
                                }
                            }
                            : {}
                    }
                }
            }
        },

        select: {
            nombre: true,
            slug: true,

            subcategoria: {
                where: {
                    producto: {
                        some: generoSlug
                            ? {
                                genero: {
                                    slug: generoSlug.toLowerCase()
                                }
                            }
                            : {}
                    }
                },

                select: {
                    nombre: true,
                    slug: true,

                    _count: {
                        select: {
                            producto: true
                        }
                    }
                }
            }
        }
    })

    return categories.map(category => ({
        nombre: category.nombre,
        slug: category.slug,

        count: category.subcategoria.reduce(
            (total, sub) => total + sub._count.producto,
            0
        )
    }))
}