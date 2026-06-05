import { pedido_estado, pedido_estado_pago } from "@/generated/prisma/enums"

export type OrderItem = {
  nombre: string
  descripcion: string | null
  url_imagen: string
  cantidad: number
  subtotal: number
  talla: string
  color: string
}

export type Order = {
  id: number
  codigo_pedido: string
  fecha: Date
  total: number
  items: number
  estado: pedido_estado
  estado_pago: pedido_estado_pago
  item: OrderItem[]
}


export type OrderListItem = {
  id: number
  codigo_pedido: string
  fecha: Date
  total: number
  items: number
  estado: pedido_estado
  estado_pago: pedido_estado_pago

  preview: {
    nombre: string
    imagen: string
  }
}