'use server'

import { prisma } from "@/libs"

export const getGenders = async () => {
    const genders = await prisma.genero.findMany({
        select: {
            nombre: true,
            slug: true,
            _count: {
                select: {
                    producto: true
                }
            }

        }
    })

    return genders.map((item) => ({
        nombre: item.nombre,
        slug: item.slug,
        count: item._count.producto

    }))
}