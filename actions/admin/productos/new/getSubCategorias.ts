'use server'

import { prisma } from "@/libs"


export const getSubCategorias = async()=>{

    const subCategorias = await prisma.subcategoria.findMany({
        select: {
            id: true,
            nombre: true
        }
    })

    return subCategorias

}