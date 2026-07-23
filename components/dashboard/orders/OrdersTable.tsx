"use client";

import { useState, useCallback, useTransition, useRef } from "react";
import type { SortingState } from "@tanstack/react-table";
import DataTable from "@/components/ui/DataTable";
import { ProductsTableSkeleton } from "@/components/ui/skeleton/ProductsTableSkeleton";
import { ordersColumns } from "./columns";
import { useOrders } from "@/src/hooks/admin";

const PAGE_SIZE = 2;

export default function OrdersTable() {
    /**
     * Valor que escribe el usuario en el input.
     * Se actualiza inmediatamente.
     */
    const [search, setSearch] = useState("");

    /**
     * Valor que realmente se envía al servidor.
     * Se actualiza después del debounce.
     */
    const [dbSearch, setDbSearch] = useState("");

    const [categoria, setCat] = useState("Todas");
    const [estado, setEst] = useState("todos");
    const [page, setPage] = useState(1);

    /**
     * Estado del ordenamiento de TanStack Table.
     */
    const [sorting, setSorting] = useState<SortingState>([]);

    const [, startTx] = useTransition();

    /**
     * Referencia para controlar el timeout
     * del debounce.
     */
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /**
     * Maneja la búsqueda con debounce.
     *
     * search   -> actualiza el input inmediatamente.
     * dbSearch -> actualiza la consulta después de 350ms.
     */
    const handleSearch = useCallback(
        (val: string) => {
            setSearch(val);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                startTx(() => {
                    setDbSearch(val);

                    // Cuando cambia la búsqueda volvemos a la página 1
                    setPage(1);
                });
            }, 350);
        },
        [startTx]
    );

    const handleCategoria = (v: string) => {
        setCat(v);
        setPage(1);
    };

    const handleEstado = (v: string) => {
        setEst(v);
        setPage(1);
    };

    const handlePage = (p: number) => {
        setPage(p);
    };

    const handleSort = (s: SortingState) => {
        setSorting(s);
        setPage(1);
    };

    /**
     * React Query
     *
     * IMPORTANTE:
     * Usamos dbSearch y NO search.
     *
     * Así evitamos hacer una petición por cada tecla.
     */
    const {
        data,
        isError,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useOrders({
        page,
        pageSize: PAGE_SIZE,
        search: dbSearch,
    });

    // const { data: res, isLoading, isFetching } = useProductos({
    //   page,
    //   pageSize: PAGE_SIZE,
    //   search: dbSearch || undefined,
    //   categoria: categoria !== "Todas" ? categoria : undefined,
    //   estado: estado !== "todos" ? estado : undefined,
    //   sortBy: sorting[0]?.id,
    //   sortDir: sorting[0]?.desc ? "desc" : "asc",
    // });

    /**
     * Primera carga.
     * Solo aparece cuando aún no existe data.
     */
    if (isLoading) {
        return <ProductsTableSkeleton />;
    }

    /**
     * Estado de error.
     */
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <p className="text-red-500 font-medium">
                    Ocurrió un error al cargar los productos
                </p>

                <p className="text-sm text-gray-500">
                    {error instanceof Error
                        ? error.message
                        : "Error desconocido"}
                </p>

                <button
                    onClick={() => refetch()}
                    className="px-4 py-2 rounded-lg bg-black text-white"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    /**
     * No existen productos.
     */
    if (data && data.orders.length === 0) {
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
        <div
            // className="bg-white rounded-2xl overflow-hidden"
            // style={{
            //     boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)",
            // }}
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
                    data={data?.orders || []}
                    columns={ordersColumns}
                    page={page}
                    totalPages={data?.totalPage ?? 1}
                    total={data?.total ?? 0}
                    onPageChange={setPage}
                />
            </div>

            {/* <ProductosToolbar
        search={search}
        categoria={categoria}
        estado={estado}
        isFetching={isFetching}
        total={res?.total}
        onSearch={handleSearch}
        onCategoria={handleCategoria}
        onEstado={handleEstado}
      /> */}

            {/* <DataTable
        data={res?.data ?? []}
        totalPages={res?.totalPages ?? 1}
        total={res?.total ?? 0}
        page={page}
        pageSize={PAGE_SIZE}
        isLoading={isLoading}
        isFetching={isFetching}
        sorting={sorting}
        onSortChange={handleSort}
        onPageChange={handlePage}
        columns={productosColumns}
      /> */}
        </div>
    );
}