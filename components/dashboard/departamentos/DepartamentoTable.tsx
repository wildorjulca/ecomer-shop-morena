'use client'

import DataTable from '@/components/ui/DataTable';
import { useDepartamentos } from '@/src/hooks/admin'
import React, { useState } from 'react'
import { Departamento, departamentsColumns } from './columns';


type Props = {
    onEdit: (marca: Departamento) => void
}
const DepartamentoTable = ({ onEdit }: Props) => {

    const [search, setSearch] = useState("");
    const [dbSearch, setDbSearch] = useState("");
    const [page, setPage] = useState(1);


    const { data, isLoading, isError, error, refetch } = useDepartamentos({
        page,
        pageSize: 12,
        search: dbSearch
    })


    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <p>Cargando...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <p className="text-red-500 font-medium">
                    Ocurrió un error al cargar las Marcas
                </p>

                <p className="text-sm text-gray-500">
                    {error instanceof Error
                        ? error.message
                        : "Error desconocido"}
                </p>

                <button
                    onClick={() => refetch()}
                    className="px-4 py-2 rounded-lg bg-gray-500 text-black"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (data && data.departamentos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <h3 className="font-semibold text-lg">
                    No se encontraron productos
                </h3>

                <p className="text-gray-500 text-sm">
                    Intenta con otro término de búsqueda.
                </p>
            </div>
        );
    }




    return (
        <div>

            <DataTable
                columns={departamentsColumns(onEdit)}
                data={data?.departamentos || []}
                page={page}
                totalPages={data?.totalPages ?? 1}
                total={data?.total ?? 0}
                onPageChange={setPage}
            />
        </div>
    )
}

export default DepartamentoTable