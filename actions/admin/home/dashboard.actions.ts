'use server'

import { prisma } from "@/libs";

// ============================================================
// 📋 1. OBTENER DATOS DE ORDENES USUARIOS, ETC
// ============================================================

const today = new Date();

const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
);

const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
);

export const getDashboardSummary = async () => {
    try {

        const [userActive, productsOutOfStock, ordersReceivedToday] = await Promise.all([
            prisma.usuario.count({ where: { activo: true } }),  // usuarios count active

            prisma.variante_producto.count({     // varaintes count sin stock
                where: {
                    cantidad_stock: 0,
                    activo: true,
                },
            }),

            prisma.pedido.count({    // obtener ordenes recibidas por ese dia
                where: {
                    creado_en: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                },
            })

        ])


        return {
            userActive,
            productsOutOfStock,
            ordersReceivedToday

        }
    } catch (error) {
        console.error("Error fetching dashboardSumary:", error);
        throw new Error("Failed to fetch dashboardSumary");
    }
}

// ============================================================
// 📋 2. OBTENER ÓRDENES RECIENTES
// ============================================================
export const getRecentOrders = async () => {
    try {
        const orders = await prisma.pedido.findMany({
            take: 8,
            include: {
                usuario: true,
                detalle: {
                    include: {
                        producto: true,
                    }
                }

            },
            orderBy: {
                id: "asc"
            }
        })



        return orders.map((ped) => ({
            id: ped.id,
            codigo_pedido: ped.codigo_pedido,
            cliente: ped.usuario.nombre + (ped.usuario.apellido ?? ""),
            cliente_email: ped.usuario.email,
            estado_pedido: ped.estado,
            estado_pago: ped.estado_pago,
            fecha_pedido: ped.creado_en ?? "N/A",
            total: Number(ped.total)
        }))

    } catch (error) {
        console.error("Error fetching ordes:", error);
        throw new Error("Failed to fetch ordes");
    }
}




