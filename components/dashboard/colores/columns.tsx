'use client'

import MenuActions from "@/components/ui/MenuActions";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

interface Color {
    id: number;
    nombre: string;
    codigo_hex: string;
    activo: boolean;
}


export const coloresColumns: ColumnDef<Color>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <input
                type="checkbox"
                className="w-4 h-4 rounded cursor-pointer accent-[#6A148E]"
                checked={table.getIsAllPageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
            // onCheckedChange={table.getToggleAllPageRowsSelected()}
            // onClick={(e) => e.stopPropagation()}
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
    //  aca va ser N° de orden 
    // {
    //     id: "index",
    //     header: "#",
    //     cell: ({ row }) => {
    //         return <span>{row.index + 1}</span>;
    //     },
    // },
    {
        accessorKey: "nombre",
        header: "Color",
        cell: ({ row }) => {
            const { nombre, codigo_hex } = row.original;

            return (
                <div className="flex items-center gap-2">
                    <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: codigo_hex }}
                    />
                    <span>{nombre}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "activo",
        header: "Estado",
        cell: ({ row }) => {
            const activo = row.original.activo

            return (
                <span className={
                    clsx(
                        "px-2 py-1 rounded-full text-xs font-medium",
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

            const categoria = row.original

            return (
                <div className="">
                    <MenuActions
                        categoria={categoria}
                    />
                </div>

            );
        },
    }

]