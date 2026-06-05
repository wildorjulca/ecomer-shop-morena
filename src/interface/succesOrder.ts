import { pedido_estado, pedido_estado_pago } from '@/generated/prisma/enums'

export interface SuccesPedido {
    id: number
    codido_pedido: string
    estado_pedido: pedido_estado
    estado_pago: pedido_estado_pago
    metodo_pago: string | null
    total: number
    items: {
        id: number
        nombre: string
        descripcion: string
        subtotal: number
        cantidad: number
        color: string
        talla: string
        img: string
    }[]
}