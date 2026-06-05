'use server'

import { prisma } from "@/libs"

export const getGenders = async()=>{

  
    const gender = await prisma.genero.findMany({
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

    return gender.map((item) => ({
        nombre: item.nombre,
        slug: item.slug,
        count: item._count.producto
    }))
}