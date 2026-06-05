'use server'

import { prisma } from "@/libs"

export const getMarcas = async () => {
    const marcas = await prisma.marca.findMany({
        where: {
            activo: true
        }
    })

    return marcas.map(m => ({
        nombre: m.nombre,
        slug: m.slug,
        count: 0

    }))
}