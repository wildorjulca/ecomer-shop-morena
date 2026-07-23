'use client'

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "@/actions/admin";

interface UseProductsParams {
  page: number;
  pageSize: number;
  search: string;
}


export function useProducts({
  page,
  pageSize,
  search,
}: UseProductsParams) {
  return useQuery({
    queryKey: ["products", page, pageSize, search],

    queryFn: () =>
      getProducts({
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
        retry: false

  });
}