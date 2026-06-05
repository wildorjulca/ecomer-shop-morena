'use server'

import { prisma } from "@/libs"


export const getTallas = async () => {
    const tallas = await prisma.talla.findMany({
        where: {
            variante: {
                some: {
                    producto: {
                        subcategoria: {
                            slug: "polos"
                        }
                    }
                }
            }
        },
        distinct: ['valor'], // 🔥 evita duplicados (S repetido, etc.)
        orderBy: {
            valor: 'asc'
        }
    })

    const formatTallas = tallas.map(z => ({
        id: z.id,
        nombre: z.valor
    }))

    return formatTallas
}