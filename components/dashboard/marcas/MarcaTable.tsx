'use client'

import DataTable from '@/components/ui/DataTable';
import { useMarcas } from '@/src/hooks/admin'
import React, { useState } from 'react'
import { Marca, marcasColumns } from './columns';
import { ProductsTableSkeleton } from '@/components/ui/skeleton/ProductsTableSkeleton';
import MarcaModal from './MarcaModal';


const PAGE_SIZE = 7;

type Props = {
    onEdit: (marca: Marca) => void
}

const MarcaTable = ({ onEdit }: Props) => {

    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("");
    const [dbSearch, setDbSearch] = useState("");
    const [page, setPage] = useState(1);

    const { data, error, isError, isFetching, isLoading, refetch } = useMarcas({
        page,
        pageSize: PAGE_SIZE,
        search: dbSearch,
    })

    if (isLoading) {
        return <ProductsTableSkeleton />;
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


    if (data && data.marcas.length === 0) {
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


    const handleOpenModal = () => {
        setIsOpen(true)
    }


    return (
        <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{
                boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)",
            }}
        >
            <div className="relative">
                {/**
                * isFetching:
                * React Query ya tiene datos pero está
                * obteniendo una nueva página o búsqueda.
                *
                * Gracias a keepPreviousData seguimos
                * mostrando la información anterior.
                */}
                {isFetching && (
                    <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center">
                        <span className="text-sm text-gray-500">
                            Actualizando...
                        </span>
                    </div>
                )}

                <DataTable
                    data={data?.marcas || []}
                    columns={marcasColumns(onEdit)}
                    page={page}
                    totalPages={data?.totalPage ?? 1}
                    total={data?.total ?? 0}
                    onPageChange={setPage}
                />

                {/* {isOpen && (
                    <MarcaModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                    />
                )} */}

            </div>

        </div>
    )
}

export default MarcaTable