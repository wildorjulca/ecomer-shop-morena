'use server'

import { prisma } from "@/libs"

export const getDistritoByProvinciaId = async (provinciaId: number) => {
    const distritos = await prisma.distrito.findMany({
        where: {
            provinciaId: provinciaId
        },
        select: {
            id: true,
            nombre: true
        }
    })

    return distritos

}