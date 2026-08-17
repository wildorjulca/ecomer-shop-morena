'use server'

import { prisma } from "@/libs"

export const getCategorias = async (generoSlug: string) => {
    
    const categories = await prisma.categoria.findMany({
        where: {
            subcategoria: {
                some: {
                    producto: {
                        some: {
                            genero: {
                                slug: generoSlug.toLocaleLowerCase()
                            }
                        }
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
                        some: {
                            genero: {
                                slug: generoSlug
                            }
                        }
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