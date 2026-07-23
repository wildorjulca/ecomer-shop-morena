import DataTable from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { pedido_estado, pedido_estado_pago } from "@/generated/prisma/enums";
import { type RecentOrders as RecentOrder } from "@/src/interface/admin";
import { formatDate } from "@/src/utils/format-date";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import MenuActions from "../orders/MenuAcctions";
import { useState } from "react";

type Estado = "pendiente" | "confirmado" | "preparando" | "enviado" | "entregado" | "cancelado";
type Pago = "pendiente" | "pagado" | "rechazado";

const orders: {
  codigo: string; cliente: string; fecha: string;
  total: string; items: number; estado: Estado; pago: Pago;
}[] = [
    { codigo: "ORD-001", cliente: "Ana García López", fecha: "12 Jun", total: "S/ 320.00", items: 3, estado: "entregado", pago: "pagado" },
    { codigo: "ORD-002", cliente: "Carlos Ríos Silva", fecha: "12 Jun", total: "S/ 185.50", items: 1, estado: "enviado", pago: "pagado" },
    { codigo: "ORD-003", cliente: "Lucía Mamani Q.", fecha: "11 Jun", total: "S/ 540.00", items: 4, estado: "preparando", pago: "pagado" },
    { codigo: "ORD-004", cliente: "Pedro Torres M.", fecha: "11 Jun", total: "S/ 98.00", items: 2, estado: "confirmado", pago: "pendiente" },
    { codigo: "ORD-005", cliente: "Sofía Vargas H.", fecha: "10 Jun", total: "S/ 210.00", items: 2, estado: "cancelado", pago: "rechazado" },
    { codigo: "ORD-006", cliente: "Mario Quispe L.", fecha: "10 Jun", total: "S/ 450.00", items: 5, estado: "pendiente", pago: "pendiente" },
  ];




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
export const ordersColumns: ColumnDef<RecentOrder>[] = [
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
type Props = {
  recentOrders: RecentOrder[]
}

export default function RecentOrders({ recentOrders }: Props) {

  const [page, setPage] = useState(1);
  return (

    <div>
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <p className="text-[13px] font-medium text-gray-500">Actividad reciente</p>
          <p className="text-base font-bold text-gray-900 mt-0.5">Órdenes recientes</p>
        </div>
        <Link
          href="/dashboard/ordenes"
          className="flex items-center gap-1 text-sm font-semibold hover:underline"
          style={{ color: "#6A148E" }}
        >
          Ver todas <ArrowUpRight size={15} />
        </Link>
      </div>

      <DataTable
        columns={ordersColumns}
        data={recentOrders}
        page={page}
        onPageChange={setPage}
        total={8}
        totalPages={1}

      />

    </div>


    // <div
    //   className="bg-white rounded-2xl overflow-hidden"
    //   style={{ boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)" }}
    // >
    //   {/* Header */}
    //   <div className="flex items-center justify-between px-6 py-5">
    //     <div>
    //       <p className="text-[13px] font-medium text-gray-500">Actividad reciente</p>
    //       <p className="text-base font-bold text-gray-900 mt-0.5">Órdenes recientes</p>
    //     </div>
    //     <Link
    //       href="/dashboard/ordenes"
    //       className="flex items-center gap-1 text-sm font-semibold hover:underline"
    //       style={{ color: "#6A148E" }}
    //     >
    //       Ver todas <ArrowUpRight size={15} />
    //     </Link>
    //   </div>

    //   {/* Table */}
    //   <div className="overflow-x-auto">
    //     <table className="w-full">
    //       <thead>
    //         <tr style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
    //           {["Orden", "Cliente", "Fecha", "Total", "Estado", "Pago"].map((h, i) => (
    //             <th
    //               key={h}
    //               className={`px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap ${
    //                 i === 2 ? "hidden md:table-cell" :
    //                 i === 4 ? "hidden sm:table-cell" :
    //                 i === 5 ? "hidden lg:table-cell" : ""
    //               } ${i === 3 ? "text-right" : ""}`}
    //             >
    //               {h}
    //             </th>
    //           ))}
    //           <th className="px-6 py-3" />
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {orders.map((o, i) => (
    //           <tr
    //             key={o.codigo}
    //             className="transition-colors cursor-pointer"
    //             style={{ borderBottom: i < orders.length - 1 ? "1px solid #f5f5f5" : "none" }}
    //             onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
    //             onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    //           >
    //             <td className="px-6 py-4">
    //               <span className="font-mono text-sm font-semibold text-gray-500">{o.codigo}</span>
    //             </td>
    //             <td className="px-6 py-4">
    //               <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{o.cliente}</p>
    //               <p className="text-xs text-gray-400 mt-0.5">{o.items} producto{o.items > 1 ? "s" : ""}</p>
    //             </td>
    //             <td className="px-6 py-4 hidden md:table-cell">
    //               <span className="text-sm text-gray-500">{o.fecha}</span>
    //             </td>
    //             <td className="px-6 py-4 text-right">
    //               <span className="text-sm font-bold text-gray-800">{o.total}</span>
    //             </td>
    //             <td className="px-6 py-4 hidden sm:table-cell">
    //               <span
    //                 className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
    //                 style={{ background: estadoChip[o.estado].bg, color: estadoChip[o.estado].color }}
    //               >
    //                 {estadoChip[o.estado].label}
    //               </span>
    //             </td>
    //             <td className="px-6 py-4 hidden lg:table-cell">
    //               <span
    //                 className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize"
    //                 style={{ background: pagoChip[o.pago].bg, color: pagoChip[o.pago].color }}
    //               >
    //                 {o.pago}
    //               </span>
    //             </td>
    //             <td className="px-6 py-4 text-right">
    //               <button
    //                 className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
    //                 style={{ color: "#6A148E", background: "#f3e5f5" }}
    //                 onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#e1bee7")}
    //                 onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#f3e5f5")}
    //               >
    //                 Ver
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}
