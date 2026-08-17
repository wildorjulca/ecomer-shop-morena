'use client'

import { getTallas } from "@/actions/admin"
import { useQuery } from "@tanstack/react-query"


export const useTallas = (tipoTallaId?: number) => {

    return useQuery({
        queryKey: ['product-tallas', tipoTallaId],
        queryFn: () => getTallas(tipoTallaId!),
        enabled: tipoTallaId != null,
        retry: 2
    })

}