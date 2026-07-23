'use client'

import { ColumnDef } from "@tanstack/react-table";
import MenuActions from "./MenuActions";

export interface Provincia {
    id: number;
    nombre: string;
    departamento: {
        id: number;
        nombre: string
    }
}

export const provinciasColumns = (
    onEdit: (provincia: Provincia) => void
): ColumnDef<Provincia>[] => [

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
        header: "Provincia",
        cell: ({ row }) => {
            const provincia = row.original.nombre
            return <span className="font-medium text-gray-900">{provincia}</span>
        }
    },
    {
        accessorKey: "departamento.nombre",
        header: "Departamento",
        cell: ({ row }) => {
            const departamento = row.original.departamento?.nombre
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {departamento || '-'}
                </span>
            )
        }
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const provincia = row.original
            return (
                <MenuActions
                    provincia={provincia}
                    onEdit={onEdit}
                />
            )
        }
    }
]