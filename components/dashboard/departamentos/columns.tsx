'use client'

import { ColumnDef } from "@tanstack/react-table";
import MenuActions from "./MenuActions";

export interface Departamento {
    id: number;
    nombre: string;
}


export const departamentsColumns = (
    onEdit: (marca: Departamento) => void
): ColumnDef<Departamento>[] =>

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
        {
            accessorKey: "nombre",
            header: "Nombre",
        },


        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                const marca = row.original


                return (
                    <MenuActions
                        marca={marca}
                        onEdit={onEdit}

                    />
                )
            }
        }

    ]


