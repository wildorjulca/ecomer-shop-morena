'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

import Pagination from './Pagination'
import { Suspense } from 'react'

interface DataTableProps<TData, TValue> {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    caption?: string
    totalPages: number
    total: number
    page: number
    onPageChange: (page: number) => void
}

function DataTable<TData, TValue>({
    data,
    columns,
    caption,
    totalPages,
    total,
    page,
    onPageChange,
}: DataTableProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full space-y-4">
            {caption && (
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                        {caption}
                    </h2>
                    <span className="text-sm text-gray-500">
                        {total.toLocaleString('es')} {total === 1 ? 'registro' : 'registros'}
                    </span>
                </div>
            )}

            {/* Contenedor: borde fino, radio pequeño, sin sombra — look shadcn */}
            <div className="relative w-full bg-white overflow-auto shadow-sm rounded-md border border-gray-200">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b [&_tr]:border-gray-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b border-gray-200">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="h-10 px-2 text-left align-middle font-medium text-gray-500 whitespace-nowrap first:pl-4 last:pr-4"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="[&_tr:last-child]:border-0">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-gray-200 transition-colors hover:bg-gray-50/50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="p-2 align-middle text-gray-700 whitespace-nowrap first:pl-4 last:pr-4"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    No hay registros disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Suspense fallback={<div>Cargando...</div>}>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                />
            </Suspense>

        </div>
    )
}

export default DataTable