'use client'

import { getProvincias } from "@/actions/admin"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


interface useProvinciasParams {
    page: number;
    pageSize: number;
    search: string;
}
export const useProvincias = ({ page, pageSize, search }: useProvinciasParams) => {
    return useQuery({
        queryKey: ["provincias", page, pageSize, search],
        queryFn: () => getProvincias({ page, pageSize, search }),

        placeholderData: keepPreviousData,
        // Los datos permanecen frescos por 5 minutos.
        staleTime: 1000 * 60 * 5,

        // Evita peticiones al volver a la pestaña.
        refetchOnWindowFocus: false,


        retry: false
    })
}