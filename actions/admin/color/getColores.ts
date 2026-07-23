

'use server'

import { prisma } from "@/libs"

interface GetColoresParams {
    page: number;
    pageSize: number;
    search: string;
}

export const getColores = async ({ page, pageSize, search }: GetColoresParams) => {

    const where = search.trim() ?
        {
            nombre: {
                contains: search
            },
        }
        : {}



    try {

        const colores = await prisma.color.findMany({
            where: where,
            skip: (page - 1) * pageSize,
            take: pageSize,
        })


        const total = await prisma.marca.count({ where: where })

        return {
            colores: colores.map((m) => ({
                id: m.id,
                nombre: m.nombre,
                codigo_hex: m.codigo_hex??"",
                activo: m.activo ?? false
            })),
            total,
            totalPage: Math.ceil(total / pageSize)
        }

    } catch (error) {
        console.error("Error fetching colores:", error);
        throw new Error("Failed to fetch colores");
    }

}