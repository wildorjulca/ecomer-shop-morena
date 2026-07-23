'use server'

import { prisma } from "@/libs";

interface GetOrdersParams {
    page: number;
    pageSize: number;
    search: string,

}

export const getOrders = async ({ page, pageSize, search }: GetOrdersParams) => {

    try {
        const orders = await prisma.pedido.findMany({
            //   where: where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                usuario: true,
                detalle: {
                    include: {
                        producto: true,
                    }
                }

            }
        })


        const total = await prisma.pedido.count()

        return {
            orders: orders.map((ped) => ({
                id: ped.id,
                codigo_pedido: ped.codigo_pedido,
                cliente: ped.usuario.nombre + (ped.usuario.apellido ?? ""),
                cliente_email: ped.usuario.email,
                estado_pedido: ped.estado,
                estado_pago: ped.estado_pago,
                fecha_pedido: ped.creado_en ?? "N/A",
                total: Number(ped.total)
            })),
            total,
            totalPage: Math.ceil(total / pageSize)
        }

    } catch (error) {
        console.error("Error fetching marcas:", error);
        throw new Error("Failed to fetch marcas");
    }

}