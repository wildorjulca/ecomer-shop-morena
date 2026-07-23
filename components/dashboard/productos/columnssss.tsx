// ─────────────────────────────────────────────────────────────
// Definición de columnas para la tabla de productos
// Separado del componente para mantener limpio DataTable.tsx
// ─────────────────────────────────────────────────────────────
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Star, TrendingUp } from "lucide-react";
import type { ProductoRow, EstadoProducto } from "@/lib/data/productos-mock";
import { RowActions } from "./RowActions";
import z from "zod";

const col = createColumnHelper<ProductoRow>();

export const schema = z.object({
  // id: z.number(),
  // header: z.string(),
  // type: z.string(),
  // status: z.string(),
  // target: z.string(),
  // limit: z.string(),
  // reviewer: z.string(),


  id: z.number(),
  nombre: z.string(),
  sku: z.string(),
  categoria: z.string(),
  genero: z.string(),
  marca: z.string(),
  precio: z.number(),
  descuento: z.number().nullable(),
  stock: z.number(),
  vendidos: z.number(),
  rating: z.number(),
  estado: z.enum(["activo", "inactivo", "sin_stock", "oferta"]),
  activo: z.boolean(),
  creado_en: z.string(),
})

const estadoBadge: Record<EstadoProducto, { label: string; bg: string; color: string }> = {
  activo: { label: "Activo", bg: "#e8f5e9", color: "#2e7d32" },
  inactivo: { label: "Inactivo", bg: "#f5f5f5", color: "#757575" },
  sin_stock: { label: "Sin stock", bg: "#ffebee", color: "#c62828" },
  oferta: { label: "En oferta", bg: "#fff8e1", color: "#f9a825" },
};

export const productosColumns: ColumnDef<z.infer<typeof schema>>[] = [

  // Checkbox de selección múltiple — se añade al inicio de las columnas valor que tiene un id fijo "select" y se renderiza con col.display() para no depender de un campo específico del producto

  {
    id: "select",
    size: 48,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="w-4 h-4 rounded cursor-pointer accent-[#6A148E]"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="w-4 h-4 rounded cursor-pointer accent-[#6A148E]"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  },
  // nombre
  {
    accessorKey: "nombre",
    header: "Producto",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-base"
            style={{ background: "#f3e5f5", color: "#6A148E" }}
          >
            {p.nombre.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
              {p.nombre}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(0,0,0,0.38)" }}>
              {p.sku} · {p.marca}
            </p>
          </div>
        </div>
      );
    },
  },

  // Categoria + género
  {
    accessorKey: "categoria",
    header: "Categoría",
    cell: ({ row }) => (
      <div>
        <span
          className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.6)" }}
        >
          {row.original.categoria}
        </span>
        <p className="text-[11px] mt-0.5" style={{ color: "rgba(0,0,0,0.38)" }}>
          {row.original.genero}
        </p>
      </div>
    ),
  },

  // Precio + descuento

  {
    accessorKey: "precio",
    header: "Precio",
    cell: ({ row }) => {
      const { precio, descuento } = row.original;
      const pct = descuento ? Math.round(((precio - descuento) / precio) * 100)
        : null;
      return descuento ? (
        <div>
          <p className="text-sm font-bold text-gray-900">S/ {descuento}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <p className="text-xs line-through" style={{ color: "rgba(0,0,0,0.38)" }}>
              S/ {precio}
            </p>
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: "#fff8e1", color: "#f9a825" }}
            >
              -{pct}%
            </span>
          </div>
        </div>
      ) : (
        <p className="text-sm font-bold text-gray-900">S/ {precio}</p>
      );
    },
  },



  // col.display({
  //   id: "select",
  //   size: 48,
  //   header: ({ table }) => (
  //     <input
  //       type="checkbox"
  //       className="w-4 h-4 rounded cursor-pointer accent-[#6A148E]"
  //       checked={table.getIsAllPageRowsSelected()}
  //       onChange={table.getToggleAllPageRowsSelectedHandler()}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <input
  //       type="checkbox"
  //       className="w-4 h-4 rounded cursor-pointer accent-[#6A148E]"
  //       checked={row.getIsSelected()}
  //       onChange={row.getToggleSelectedHandler()}
  //       onClick={(e) => e.stopPropagation()}
  //     />
  //   ),
  // }),

  // ── Producto (nombre + sku + marca) ───────────────────────
  // col.accessor("nombre", {
  //   header: "Producto",
  //   cell: ({ row }) => {
  //     const p = row.original;
  //     return (
  //       <div className="flex items-center gap-3">
  //         <div
  //           className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-base"
  //           style={{ background: "#f3e5f5", color: "#6A148E" }}
  //         >
  //           {p.nombre.charAt(0)}
  //         </div>
  //         <div className="min-w-0">
  //           <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
  //             {p.nombre}
  //           </p>
  //           <p className="text-xs mt-0.5" style={{ color: "rgba(0,0,0,0.38)" }}>
  //             {p.sku} · {p.marca}
  //           </p>
  //         </div>
  //       </div>
  //     );
  //   },
  // }),

  // ── Categoría ─────────────────────────────────────────────
  // col.accessor("categoria", {
  //   header: "Categoría",
  //   cell: ({ row }) => (
  //     <div>
  //       <span
  //         className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
  //         style={{ background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.6)" }}
  //       >
  //         {row.original.categoria}
  //       </span>
  //       <p className="text-[11px] mt-0.5" style={{ color: "rgba(0,0,0,0.38)" }}>
  //         {row.original.genero}
  //       </p>
  //     </div>
  //   ),
  // }),

  // ── Precio ────────────────────────────────────────────────

  // col.accessor("precio", {
  //   header: "Precio",
  //   cell: ({ row }) => {
  //     const { precio, descuento } = row.original;
  //     const pct = descuento
  //       ? Math.round(((precio - descuento) / precio) * 100)
  //       : null;
  //     return descuento ? (
  //       <div>
  //         <p className="text-sm font-bold text-gray-900">S/ {descuento}</p>
  //         <div className="flex items-center gap-1.5 mt-0.5">
  //           <p className="text-xs line-through" style={{ color: "rgba(0,0,0,0.38)" }}>
  //             S/ {precio}
  //           </p>
  //           <span
  //             className="text-[10px] font-bold px-1.5 py-0.5 rounded"
  //             style={{ background: "#fff8e1", color: "#f9a825" }}
  //           >
  //             -{pct}%
  //           </span>
  //         </div>
  //       </div>
  //     ) : (
  //       <p className="text-sm font-bold text-gray-900">S/ {precio}</p>
  //     );
  //   },
  // }),

  // ── Stock ─────────────────────────────────────────────────

  // Stock con badge de "agotado" o "bajo stock"

  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const v = row.original.stock
      return (
        <div className="flex items-center gap-1.5">
          <span
            className="text-sm font-semibold"
            style={{
              color: v === 0 ? "#c62828" : v <= 5 ? "#f9a825" : "#2e7d32",
            }}
          >
            {v}
          </span>
          {v === 0 && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "#ffebee", color: "#c62828" }}
            >
              agotado
            </span>
          )}
          {v > 0 && v <= 5 && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "#fff8e1", color: "#f9a825" }}
            >
              bajo
            </span>
          )}
        </div>
      );
    },

  },


  //  Vendidos

  {
    accessorKey: "vendidos",
    header: "Vendidos",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1.5">
        <TrendingUp size={13} style={{ color: "rgba(0,0,0,0.28)" }} />
        <span className="text-sm font-medium text-gray-700">{String(getValue())}</span>
      </div>
    ),
  },


  // ── Vendidos ──────────────────────────────────────────────
  {
    accessorKey: "vendidos",
    header: "Vendidos",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1.5">
        <TrendingUp size={13} style={{ color: "rgba(0,0,0,0.28)" }} />
        <span className="text-sm font-medium text-gray-700">{String(getValue())}</span>
      </div>
    ),
  },

  // Estado

  {
    accessorKey: "estado",
    header: "Estado",
    enableSorting: false,
    cell: ({ getValue }) => {
      const b = estadoBadge[String(getValue()) as keyof typeof estadoBadge];
      return (
        <span
          className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{ background: b.bg, color: b.color }}
        >
          {b.label}
        </span>
      );
    }

  },

  // ── Acciones ──────────────────────────────────────────────
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: ({ row }) => <RowActions producto={row.original} />

  }


];
