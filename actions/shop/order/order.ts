'use server'

import { prisma } from "@/libs"


export const getOrderById = async (orderId: number) => {
    try {
        const order = await prisma.pedido.findUnique({
            where: {
                id: orderId
            },
            include: {
                detalle: {
                    include: {
                        variante: {
                            include: {
                                color: true,
                                talla: true,
                                producto: {
                                    include: {
                                        imagen: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!order) {
            return {
                ok: false,
                message: "Error al obtener el pedido"
            }
        }


        const formattedOrder = {
            id: order.id,
            codido_pedido: order.codigo_pedido,
            estado_pedido: order.estado,
            estado_pago: order.estado_pago,
            metodo_pago: order.metodo_pago,
            total: Number(order.total),
            items: order.detalle.map((item => {

                const { variante } = item
                const { producto } = variante
                return {
                    id: item.id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion ?? "",
                    subtotal: Number(item.subtotal),
                    cantidad: item.cantidad,
                    color: variante.color.nombre,
                    talla: variante.talla.valor,
                    img: producto.imagen[0].url_imagen

                }
            }))

        }



        return {
            ok: true,
            pedido: formattedOrder
        }

    } catch (error) {
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Error al obtener el pedidp"
        }
    }
}