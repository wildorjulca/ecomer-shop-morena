'use client'

import MenuActions from "@/components/ui/MenuActions";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export interface Categoria {
    id: number;
    nombre: string;
    activo: boolean;
}


export const categoriasColumns: ColumnDef<Categoria>[] = [
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
        header: "Categoría",
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