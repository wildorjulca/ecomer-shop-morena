'use server'

import { prisma } from "@/libs";

interface GetProvinciaParams {
    page: number;
    pageSize: number;
    search: string;
}
export const getProvincias = async ({ page, pageSize, search }: GetProvinciaParams) => {

    const where = search.trim()
        ? {
            nombre: {
                contains: search,
            },
        }
        : {};

    try {
        const provncias = await prisma.provincia.findMany({
            where: where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                departamento: true
            }
        });

        const total = await prisma.provincia.count({
            where: where,
        });

        return {
            provincias: provncias.map((c) => ({
                id: c.id,
                nombre: c.nombre,
                departamento: {
                    id: c.departamento.id,
                    nombre: c.departamento.nombre
                }
            })),
            total,
            totalPages: Math.ceil(total / pageSize),
        }
    } catch (error) {
        console.error("Error fetching departamentos:", error);
        throw new Error("Failed to fetch departamentos");
    }

}