'use server'

import { prisma } from "@/libs"

export const getColores = async () => {

    const colores = await prisma.color.findMany({
        select: {
            id: true,
            nombre: true,
            slug: true,
            codigo_hex: true
        }
    })

    return colores

}