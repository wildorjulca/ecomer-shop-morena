import { pedido_estado, pedido_estado_pago } from "@/generated/prisma/enums";


export interface RecentOrders {
    id: number;
    codigo_pedido: string;
    cliente: string;
    cliente_email: string;
    estado_pedido: pedido_estado;
    estado_pago: pedido_estado_pago;
    fecha_pedido: string | Date;
    total: number;
}