'use server'

import { prisma } from "@/libs"


export const getMarcas = async () => {
    const marcas = await prisma.marca.findMany({
        select: {
            id: true,
            nombre: true
        }
    })
    return marcas

}