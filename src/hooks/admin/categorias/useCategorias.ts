'use client'

import { getCategorias } from "@/actions/admin";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// Tipar esta función para que devuelva un objeto con las categorías, total de categorías, y funciones para manejar paginación, ordenamiento, etc.

interface UseCategoriasParams {
    page: number;
    pageSize: number;
    search: string;
}

export function useCategorias({ page, pageSize, search }: UseCategoriasParams) {
    // Aquí iría la lógica para llamar a la API y obtener las categorías, total, etc.
    return useQuery({
        queryKey: ["categorias", page, pageSize, search],
        queryFn: () => getCategorias({ page, pageSize, search }),

        placeholderData: keepPreviousData,

        // Los datos permanecen frescos por 5 minutos.
        staleTime: 1000 * 60 * 5,

        // Evita peticiones al volver a la pestaña.
        refetchOnWindowFocus: false,


        retry: false

    })
}

// export function useCategorias({
//   page,
//   pageSize,
//   search,
// }: UseCategoriasParams) {
//   return useQuery({
//     queryKey: ["categorias", page, pageSize, search],
//     queryFn: () => getCategorias({ page, pageSize, search }),

//     placeholderData: (prev) => prev,

//     staleTime: 1000 * 60 * 5,
//     gcTime: 1000 * 60 * 30,

//     refetchOnWindowFocus: false,
//   });
// }