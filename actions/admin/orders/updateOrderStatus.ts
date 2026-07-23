'use server'

import { pedido_estado } from "@/generated/prisma/enums";
import { prisma } from "@/libs";

interface Props {
    estado: pedido_estado;
    orderId: number;
}
export const updateOrderStatus = async ({ estado, orderId }: Props) => {

    try {

        await prisma.pedido.update({
            where: {
                id: orderId
            },
            data: {
                estado: estado
            }
        })

        return {
            ok: true,
            message: "Estado modificado."
        }
    } catch (error) {
        return {
            ok: false,
            message: "Error al modificar el estado"
        }

    }

}