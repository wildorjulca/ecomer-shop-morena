'use client'

import { getOrders } from "@/actions/admin";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface UseOrdersParams {
  page: number;
  pageSize: number;
  search: string;
}


export function useOrders({ page, pageSize, search }: UseOrdersParams) {
  return useQuery({
    queryKey: ["orders", page, pageSize, search],

    queryFn: () =>
      getOrders({
        page,
        pageSize,
        search,
      }),

    // Mantiene los datos anteriores mientras carga
    // la siguiente página.
    placeholderData: keepPreviousData,

    // Los datos permanecen frescos por 5 minutos.
    staleTime: 1000 * 60 * 5,

    // Evita peticiones al volver a la pestaña.
    refetchOnWindowFocus: false,
  });
}