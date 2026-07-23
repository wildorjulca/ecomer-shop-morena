'use server'

import { productoWhereInput } from "@/generated/prisma/models";
import { prisma } from "@/libs";

interface GetProductsParams {
    page: number;
    pageSize: number;
    search: string,

}
export const getProducts = async ({ page, pageSize, search }: GetProductsParams) => {

    const where: productoWhereInput = search.trim() ?
        {
            nombre: {
                contains: search
            },
        }
        : {}


    try {

        const products = await prisma.producto.findMany({
            where: where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                genero: true,
                imagen: true,
                subcategoria: {
                    include: {
                        categoria: true
                    }
                },
                variante: true

            }
        })

        const total = await prisma.producto.count({
            where: where
        })

        return {
            products: products.map((p) => ({
                id: p.id,
                nombre: p.nombre,
                categoria: p.subcategoria.categoria.nombre,
                genero: p.genero.nombre,
                precio_base_venta: Number(p.precio_base_venta),
                precio_descuento: Number(p.precio_descuento),
                porcentaje_descuento: Number(p.precio_descuento ?? 0),
                en_oferta: p.en_oferta ?? false,
                imagen: p.imagen[0].url_imagen,
                stock: p.variante.reduce(
                    (total, v) => total + (v.cantidad_stock ?? 0),
                    0
                ),
                estado: p.activo ?? false,
            })),
            total,
            totalPage: Math.ceil(total / pageSize)
        }

    } catch (error) {
        console.error("Error fetching marcas:", error);
        throw new Error("Failed to fetch marcas");
    }
}