'use server'

import { prisma } from "@/libs"

export const  getCategorias = async()=>{
        const categorias = await prisma.categoria.findMany({
            select: {
                id: true,
                nombre: true,
            }
        })
        return categorias
}