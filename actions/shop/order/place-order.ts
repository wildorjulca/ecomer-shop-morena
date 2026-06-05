
'use server'

import { auth } from "@/auth"
import { prisma, sleep } from "@/libs"


type ProductData = {
    productoId: number;
    varianteId: number;
    nombre: string;
    precio_final: number;
    stockDisponible: number;

}
type ProductId = {
    variante_id: number,
    cantidad: number,
}

type AddressUser = {
    nombres: string
    apellidos: string
    telefono: string
    direccion: string
    distrito_id: number
    // referencia?: string
    instrucciones?: string
    // es_principal?: boolean
}
// type PlaceOrderParams = {
//     productId: ProductId[],
// }


export const placeOrder = async (productId: ProductId[], addressUser: AddressUser, selectedAddressId: number) => {

    await sleep(2)

    const session = await auth()

    // 🔒 01 ( autenticacion ) Verificar que el usuario esta autenticado, si no esta autenticado, retornar un error, o redirigir al login, etc.

    const userId = Number(session?.user?.id)

    if (!session || !userId) {
        return {
            ok: false,
            message: 'No estas autenticado'
        }
    }


    // traer los datos del productos con sus variantes  y precios para tener datos actualizados, y tambien para calcular el total del pedido, y para guardar el historial de pedidos del usuario, con los datos de los productos que compro, por si luego quiere volver a comprar lo mismo, o para mostrarle su historial de pedidos, etc.

    // 🛍️ Paso 02   traer los productos con sus variantes y precios, usando el array de productId que me llega como parametro, que contiene el id de la variante y la cantidad que el usuario quiere comprar, entonces con ese id de variante, traigo los datos del producto, y con la cantidad, puedo calcular el total del pedido, etc.
    const productVariants = await prisma.variante_producto.findMany({
        include: {
            producto: {
                select: {
                    id: true,
                    nombre: true,
                    precio_base_venta: true,
                    precio_descuento: true,
                    porcentaje_descuento: true,
                    en_oferta: true
                }
            }
        },
        where: {
            id: {
                in: productId.map(item => item.variante_id)
            }
        }
    })


    // paso 03  los datos de l producto lo ponemon en un array de con precios orignales ya mapeados si tiene oferta con un precio finall
    const productsMapped: ProductData[] = []

    for (const variante of productVariants) {

        const stockDisponible = variante.cantidad_stock ?? 0
        const precio_final = variante.producto.en_oferta ? Number(variante.producto.precio_descuento ?? 0) + Number(variante.precio_extra ?? 0) : Number(variante.producto.precio_base_venta) + Number(variante.precio_extra ?? 0)

        productsMapped.push({
            nombre: variante.producto.nombre,
            productoId: variante.productoId,
            varianteId: variante.id,
            stockDisponible: stockDisponible,
            precio_final: precio_final
        })
    }


    // paso 04 calculamos el total y el subtotaldel pedido
    let subtotal = 0
    const costoEnvio = 10

    productsMapped.forEach(item => {
        const quantitySelected = productId.find((i) => i.variante_id === item.varianteId)?.cantidad ?? 0
        subtotal += item.precio_final * quantitySelected
    })

    const total = subtotal + costoEnvio

    console.log("subtotal: ", subtotal)
    console.log("total: ", total)

    // hacemos la transaccion para crear el pedido, y los detalles del pedido, y para actualizar el stock de las variantes de producto, todo esto
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            // Vamos a actulizar el stock con su variantes respectiva
            // for (const item of productId) {
            //     const prodVariante = productsMapped.find(p => p.varianteId === item.variante_id)

            //     if (!prodVariante) {
            //         throw new Error(`No se encontro la variante de producto con id ${item.variante_id}`)
            //     }

            //     if (prodVariante.stockDisponible < item.cantidad) {
            //         throw new Error(`No hay stock suficiente para el producto ${prodVariante.nombre}, variante ID: ${prodVariante.varianteId}, stock disponible: ${prodVariante.stockDisponible}, cantidad seleccionada: ${item.cantidad}`)
            //     }

            //     await tx.variante_producto.update({
            //         where: { id: item.variante_id },
            //         data: {
            //             cantidad_stock: {
            //                 decrement: item.cantidad
            //             }
            //         }
            //     })
            // }

            /* =====================================================
             OBTENER DIRECCIÓN
          ===================================================== */

            let selectedAddressData

            // ==========================================
            // CASO 1 → DIRECCIÓN EXISTENTE
            // ==========================================
            if (selectedAddressId) {

                selectedAddressData =
                    await tx.direccion_usuario.findFirst({
                        where: {
                            id: selectedAddressId,
                            usuario_id: userId
                        }
                    })

                if (!selectedAddressData) {
                    throw new Error("Dirección no encontrada")
                }
            }
            // Creamos el pedido
            const order = await tx.pedido.create({
                data: {
                    codigo_pedido: `PED-${Date.now()}`,
                    usuarioId: userId,
                    // direccion_envio_id: adress.id,
                    subtotal: subtotal,
                    //igv: //TODO: Queda pendiente
                    total: total,
                    costo_envio: costoEnvio,
                    detalle: {
                        createMany: {
                            data: productId.map(item => {

                                const product = productsMapped.find(p => p.varianteId === item.variante_id)

                                if (!product) {
                                    throw new Error(`No se encontro el producto para la variante con id ${item.variante_id}`)
                                }
                                return {
                                    varianteId: product.varianteId,
                                    cantidad: item.cantidad,
                                    precio_unitario: product.precio_final,
                                    subtotal: product.precio_final * item.cantidad,
                                    productoId: product.productoId

                                }
                            })
                        }
                    },
                }
            })

            /* =====================================================
           SNAPSHOT DE DIRECCIÓN DEL PEDIDO
        ===================================================== */
            await tx.pedido_direccion.create({
                data: {
                    pedido_id: order.id,

                    nombres: selectedAddressData?.nombres ?? "",

                    apellidos: selectedAddressData?.apellidos ?? "",

                    telefono: selectedAddressData?.telefono ?? "",

                    direccion: selectedAddressData?.direccion ?? "",

                    distrito_id: selectedAddressData?.distrito_id ?? 0,
                    instrucciones:
                        selectedAddressData?.instrucciones
                }
            })


            // agregamos la direccion del pedido
            // const adress = await tx.pedido_direccion.create({
            //     data: {
            // ...addressUser,
            // pedido_id: order.id
            // usuario_id: userId,
            // es_principal: addressUser.es_principal ?? false
            //     }
            // })


            // agregamos la direccion al usuario 
            // await prisma.direccion_usuario.create({
            //     data: {
            //         ...addressUser,
            //         usuario_id: userId
            //     }

            // })

            return {
                order
            }
        })

        return {
            ok: true,
            order: prismaTx.order,
            message: 'Pedido creado exitosamente',

        }

    } catch (error) {
        console.log("error al crear el pedido: ", error)
        return {
            ok: false,
            message: error instanceof Error ? error.message : 'Error al crear el pedido'
        }

    }
}