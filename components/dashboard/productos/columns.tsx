import MenuActions from "@/components/ui/MenuActions";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import Image from "next/image";


export interface Producto {
    id: number;
    nombre: string;
    categoria: string;
    genero: string;
    precio_base_venta: number;
    precio_descuento: number;
    porcentaje_descuento: number;
    en_oferta: boolean;
    imagen: string;
    stock: number;
    estado: boolean;

}


export const productsColumns: ColumnDef<Producto>[] = [
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
        accessorKey: "nombre",
        header: "Producto",
        cell: ({ row }) => {
            const producto = row.original;

            return (
                <div className="flex items-center gap-3">
                    <Image
                        src={`/images/products/${producto.imagen}`}
                        alt={producto.nombre}
                        width={42}
                        height={42}
                        className="rounded-md object-cover flex-shrink-0"
                    />

                    <span className="font-medium">
                        {producto.nombre}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "categoria",
        header: "Categoría",
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
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
    {
        accessorKey: "precio_base_venta",
        header: "Precio"
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "activo",
        header: "Estado",
        cell: ({ row }) => {
            const activo = row.original.estado

            return (
                <span className={
                    clsx(
                        "px-2 py-1 rounded-full text-xs font-semibold",
                        activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"

                    )
                }>

                    {activo ? "Activo" : "Inactivo"}
                </span>
            )
        }
    },

    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {

            return (
                <div className="">
                    MenuAcciones
                </div>

            );
        },
    }
]