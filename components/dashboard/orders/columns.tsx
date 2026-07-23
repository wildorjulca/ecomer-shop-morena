import { StatusBadge } from "@/components/ui/StatusBadge";
import { pedido_estado, pedido_estado_pago } from "@/generated/prisma/enums";
import { formatDate } from "@/src/utils/format-date";
import { ColumnDef } from "@tanstack/react-table";
import MenuActions from "./MenuAcctions";


export interface Orders {
    id: number;
    codigo_pedido: string;
    cliente: string;
    cliente_email: string;
    estado_pedido: pedido_estado;
    estado_pago: pedido_estado_pago;
    fecha_pedido: string | Date;
    total: number;
}

const estadoStyles: Record<
    pedido_estado,
    { label: string; className: string }
> = {
    pendiente: {
        label: "Pendiente",
        className: "bg-yellow-100 text-yellow-700",
    },
    confirmado: {
        label: "Confirmado",
        className: "bg-blue-100 text-blue-700",
    },
    preparando: {
        label: "Preparando",
        className: "bg-purple-100 text-purple-700",
    },
    enviado: {
        label: "Enviado",
        className: "bg-indigo-100 text-indigo-700",
    },
    entregado: {
        label: "Entregado",
        className: "bg-green-100 text-green-700",
    },
    cancelado: {
        label: "Cancelado",
        className: "bg-red-100 text-red-700",
    },
};

const pagoStyles: Record<
    pedido_estado_pago,
    { label: string; className: string }
> = {
    pendiente: {
        label: "Pendiente",
        className: "bg-yellow-100 text-yellow-700",
    },
    pagado: {
        label: "Pagado",
        className: "bg-green-100 text-green-700",
    },
    rechazado: {
        label: "Rechazado",
        className: "bg-red-100 text-red-700",
    },
    reembolsado: {
        label: "Reembolsado",
        className: "bg-gray-100 text-gray-700",
    },
};
export const ordersColumns: ColumnDef<Orders>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex justify-center">
                <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded accent-[#6A148E]"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded accent-[#6A148E]"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        ),
    },
    {
        accessorKey: "codigo_pedido",
        header: "Codigo",
        cell: ({ row }) => {

            const codigo_pedido = row.original.codigo_pedido
            return <span className="font-medium">{codigo_pedido}</span>

        }
    },
    {
        accessorKey: "fecha_pedido",
        header: "Fecha pedido",
        cell: ({ row }) => {
            const fecha = row.original.fecha_pedido
            return (
                <span>
                    {formatDate(fecha)}
                </span>
            );
        },
    },

    {
        accessorKey: "cliente",
        header: "Cliente"
    },
    {
        accessorKey: "estado_pedido",
        header: "Estado",
        cell: ({ row }) => {
            const estado = row.original.estado_pedido;

            const style = estadoStyles[estado];

            return (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${style.className}`}
                >
                    {style.label}
                </span>
            );
        },
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
            <span className="font-semibold">
                S/ {row.original.total.toFixed(2)}
            </span>
        ),
    },
    {
        accessorKey: "estado_pago",
        header: "Estado pago",
        cell: ({ row }) => {

            const estado = row.original.estado_pago
            const style = pagoStyles[estado]

            return <StatusBadge label={style.label} className={style.className} />
        }
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            return (
                <MenuActions
                    pedidoId={row.original.id}
                    estado_pedido={row.original.estado_pedido}
                />
            )
        }
    }

]