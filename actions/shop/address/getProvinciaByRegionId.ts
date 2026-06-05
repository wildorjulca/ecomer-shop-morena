'use server'

import { prisma } from "@/libs"

export const getProvinciaByRegionId = async (regionId: number) => {
    const provincias = await prisma.provincia.findMany({
        where: {
            departamentoId: regionId
        },
        select: {
            id: true,
            nombre: true
        }
    })

    return provincias
}