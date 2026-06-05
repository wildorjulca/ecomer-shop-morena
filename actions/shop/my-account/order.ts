'use server'

import { auth } from "@/auth"
import { prisma } from "@/libs"


export const getPedidosUserList = async () => {

    const session = await auth()

    const userId = session?.user?.id


    if (!userId) {
        return {
            ok: false,
            message: "No a iniciado session aun"
        }
    }


    try {

        const orders = await prisma.pedido.findMany({
            where: { usuarioId: Number(userId) },
            include: {
                detalle: {
                    include: {
                        variante: {
                            include: {
                                talla: true,
                                color: true,
                                producto: {
                                    include: {
                                        imagen: {
                                            take: 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        detalle: true
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        })


        // const formattedOrder = orders.map((item) => {

        //     return {
        //         id: item.id,
        //         codigo_pedido: item.codigo_pedido,
        //         fecha: item.creado_en!,
        //         total: Number(item.total),
        //         items: item._count.detalle,
        //         estado: item.estado,
        //         estado_pago: item.estado_pago,
        //         item: item.detalle.map((det) => {
        //             const { variante } = det
        //             const { producto } = variante

        //             return {
        //                 nombre: producto.nombre,
        //                 descripcion: producto.descripcion,
        //                 url_imagen: producto.imagen[0].url_imagen,
        //                 cantidad: det.cantidad,
        //                 subtotal: Number(det.subtotal),
        //                 talla: variante.color.nombre,
        //                 color: variante.color.nombre
        //             }
        //         })
        //     }
        // })
        const formattedOrder = orders.map((item) => {
            const firstItem = item.detalle[0]

            return {
                id: item.id,
                codigo_pedido: item.codigo_pedido,
                fecha: item.creado_en!,
                total: Number(item.total),
                items: item._count.detalle,
                estado: item.estado,
                estado_pago: item.estado_pago,

                preview: {
                    nombre: firstItem?.variante.producto.nombre,
                    imagen: firstItem?.variante.producto.imagen[0]?.url_imagen
                }
            }
        })

        return {
            ok: true,
            orders: formattedOrder
        }


    } catch (error) {
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Ocurrió un error al obtener tus pedidos. Intenta nuevamente."
        }
    }

}

export const getDetallePedido = async (codigo_pedido: string) => {

    try {

        const pedido = await prisma.pedido.findUnique({
            where: {
                codigo_pedido: codigo_pedido
            },
            include: {
                detalle: {
                    include: {
                        variante: {
                            include: {
                                talla: true,
                                color: true,
                                producto: {
                                    include: {
                                        imagen: true
                                    }
                                }
                            }
                        }
                    }
                },
                direccion: {
                    include: {
                        distrito: {
                            include: {
                                provincia: {
                                    include: {
                                        departamento: true
                                    }
                                }
                            }
                        }
                    }
                },
                usuario: true
            }
        })

        if (!pedido) {
            return {
                ok: false,
                message: "Pedido no encontrado"
            }
        }


        const direccion = pedido.direccion

        const distrito = direccion?.distrito?.nombre
        const provincia = direccion?.distrito?.provincia?.nombre
        const region = direccion?.distrito?.provincia?.departamento?.nombre

        const formattedPedidoDetails = {
            id: pedido.id,
            subtotal: Number(pedido.subtotal),
            total: Number(pedido.subtotal),
            codigo: pedido.codigo_pedido,
            fecha: pedido.creado_en,
            estado: pedido.estado,
            estado_pago: pedido.estado_pago,
            direccion: {
                nombreCompleto: `${direccion?.nombres ?? ''} ${direccion?.apellidos ?? ''}`.trim(),
                telefono: direccion?.telefono,
                direccion: direccion?.direccion,
                distrito: distrito,
                provincia: provincia,
                region: region,
            },

            items: pedido.detalle.map((det) => {
                const { variante } = det
                const { producto } = variante

                return {
                    id: variante.id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    imagen: producto.imagen[0]?.url_imagen,
                    cantidad: det.cantidad,
                    precio: Number(det.precio_unitario),
                    subtotal: Number(det.subtotal),
                    talla: variante.talla.valor,
                    color: variante.color.nombre
                }
            })
        }

        return {
            ok: true,
            detalle_pedido: formattedPedidoDetails
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Error al obtener el detalle del pedido"
        }
    }
}