"use client";

import { useState, useRef, useCallback, useTransition } from "react";

import { useCategorias } from "@/src/hooks/admin";
import DataTable from "@/components/ui/DataTable";
import { categoriasColumns } from "./columns";
import CategoriaToolbar from "./CategoriaToolbar";

const PAGE_SIZE = 10;

// type Props = {

// }

export default function CategoriaTable() {
    const [search, setSearch] = useState("");
    const [dbSearch, setDbSearch] = useState("");
    const [page, setPage] = useState(1);

    const [, startTx] = useTransition();

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = useCallback(
        (value: string) => {
            setSearch(value);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                startTx(() => {
                    setDbSearch(value);
                    setPage(1);
                });
            }, 350);
        },
        [startTx]
    );

    const { data, isLoading, isError, error, refetch, isFetching } = useCategorias({
        page,
        pageSize: PAGE_SIZE,
        search: dbSearch,
    });


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

    if (data && data.categorias.length === 0) {
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
        // <div className="bg-white rounded-2xl">
        <div
        >
            {/* <CategoriasToolbar
        search={search}
        onSearch={handleSearch}
        total={data?.total}
      /> */}

            <CategoriaToolbar
                onSearch={handleSearch}
                searh={search}
            />


            <DataTable
                data={data?.categorias || []}
                columns={categoriasColumns}
                page={page}
                totalPages={data?.totalPages ?? 1}
                total={data?.total ?? 0}
                onPageChange={setPage}

            />
            {/* <DataTable
        data={data?.data ?? []}
        columns={categoriasColumns}
        totalPages={data?.totalPages ?? 1}
        total={data?.total ?? 0}
        page={page}
        pageSize={PAGE_SIZE}
        isLoading={isLoading}
        isFetching={isFetching}
        sorting={[]}
        onSortChange={() => {}}
        onPageChange={setPage}
      /> */}
        </div>
    );
}