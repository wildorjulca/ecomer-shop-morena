'use server'

import { prisma } from "@/libs";

interface GetCategoriasParams {
    page: number;
    pageSize: number;
    search: string;
}
export const getCategorias = async ({ page, pageSize, search }: GetCategoriasParams) => {

    const where = search.trim()
        ? {
            nombre: {
                contains: search,
            },
        }
        : {};

    try {
        const categorias = await prisma.categoria.findMany({
            where: where,
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const total = await prisma.categoria.count({
            where: where,
        });

        return {
            categorias: categorias.map((c) => ({
                id: c.id,
                nombre: c.nombre,
                activo: c.activo ?? false,
            })),
            total,
            totalPages: Math.ceil(total / pageSize),
        }
    } catch (error) {
        console.error("Error fetching categorias:", error);
        throw new Error("Failed to fetch categorias");
    }

}