'use server'

import { prisma } from "@/libs"

export const getTipoTallas = async () => {

    const tipoTallas = await prisma.tipo_talla.findMany({
        select: {
            id: true,
            nombre: true,
            descripcion: true
        }
    })

    return tipoTallas
}