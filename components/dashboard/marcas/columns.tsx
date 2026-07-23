'use client'

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import MenuActions from "./MenuActions";

export interface Marca {
    id: number;
    nombre: string;
    activo: boolean;
}


export const marcasColumns = (
    onEdit: (marca: Marca) => void
): ColumnDef<Marca>[] =>

    [
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
            header: "Nombre",
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
                const marca = row.original


                return (
                    <MenuActions
                        activo={marca.activo}
                        marca={marca}
                        onEdit={onEdit}

                    />
                )
            }
        }

    ]


