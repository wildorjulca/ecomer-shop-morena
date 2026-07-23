'use client'

import { getMarcas } from "@/actions/admin";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface UseMarcasParams {
    page: number;
    pageSize: number;
    search: string;
}

export function useMarcas({ page, pageSize, search }: UseMarcasParams) {

    return useQuery({
        queryKey: ["marcas", page, pageSize, search],
        queryFn: () => getMarcas({ page, pageSize, search }),

        placeholderData: keepPreviousData,

        // Los datos permanecen frescos por 5 minutos.
        staleTime: 1000 * 60 * 5,

        // Evita peticiones al volver a la pestaña.
        refetchOnWindowFocus: false,
     

        retry: false
    })

}