'use server'

import { prisma } from "@/libs"

export const getTallas = async (tipoTallaId: number) => {

    const tallas = await prisma.talla.findMany({
        select: {
            id: true,
            valor: true
        },
        where: {
            tipoTallaId: tipoTallaId
        }
    })

    return tallas

}