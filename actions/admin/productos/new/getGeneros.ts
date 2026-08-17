'use server'

import { prisma } from "@/libs"

export const getGeneros = async()=>{
    const generos = await prisma.genero.findMany({
        select: {
            id: true,
            nombre: true
        }
    })
    return generos
}