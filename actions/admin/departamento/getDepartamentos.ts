'use server'

import { prisma } from "@/libs";

interface GetDepartamentsParams {
    page: number;
    pageSize: number;
    search: string;
}
export const getDepartamentos = async ({ page, pageSize, search }: GetDepartamentsParams) => {

    const where = search.trim()
        ? {
            nombre: {
                contains: search,
            },
        }
        : {};

    try {
        const categorias = await prisma.departamento.findMany({
            where: where,
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const total = await prisma.departamento.count({
            where: where,
        });

        return {
            departamentos: categorias.map((c) => ({
                id: c.id,
                nombre: c.nombre,
            })),
            total,
            totalPages: Math.ceil(total / pageSize),
        }
    } catch (error) {
        console.error("Error fetching departamentos:", error);
        throw new Error("Failed to fetch departamentos");
    }

}