'use client'

import { getColores } from "@/actions/admin";
import { useQuery } from "@tanstack/react-query";

interface UseMarcasParams {
    page: number;
    pageSize: number;
    search: string;
}

export function useColores({ page, pageSize, search }: UseMarcasParams) {

    return useQuery({
        queryKey: ["colores", page, pageSize, search],
        queryFn: () => getColores({ page, pageSize, search }),
        refetchOnWindowFocus: false, // no refetch al volver a la ventana
    })

}