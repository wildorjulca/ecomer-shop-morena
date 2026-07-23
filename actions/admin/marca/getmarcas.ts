'use server'

import { productoWhereInput } from "@/generated/prisma/models";
import { prisma } from "@/libs"

interface GetMarcasParams {
    page: number;
    pageSize: number;
    search: string;
}

export const getMarcas = async ({ page, pageSize, search }: GetMarcasParams) => {

    const where = search.trim() ?
        {
            nombre: {
                contains: search
            },
        }
        : {}



    try {

        const marcas = await prisma.marca.findMany({
            where: where,
            skip: (page - 1) * pageSize,
            take: pageSize,
        })


        const total = await prisma.marca.count({ where: where })

        return {
            marcas: marcas.map((m) => ({
                id: m.id,
                nombre: m.nombre,
                activo: m.activo ?? false
            })),
            total,
            totalPage: Math.ceil(total / pageSize)
        }

    } catch (error) {
        console.error("Error fetching marcas:", error);
        throw new Error("Failed to fetch marcas");
    }

}