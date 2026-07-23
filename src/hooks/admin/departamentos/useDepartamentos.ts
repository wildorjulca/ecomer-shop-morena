'use client'

import { getDepartamentos } from "@/actions/admin"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


interface useDepartamentosParams {
    page: number;
    pageSize: number;
    search: string;
}
export const useDepartamentos = ({ page, pageSize, search }: useDepartamentosParams) => {
    return useQuery({
        queryKey: ["departamentos", page, pageSize, search],
        queryFn: () => getDepartamentos({ page, pageSize, search }),

        placeholderData: keepPreviousData,
        // Los datos permanecen frescos por 5 minutos.
        staleTime: 1000 * 60 * 5,

        // Evita peticiones al volver a la pestaña.
        refetchOnWindowFocus: false,


        retry: false
    })
}