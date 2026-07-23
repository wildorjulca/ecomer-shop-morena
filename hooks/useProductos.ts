import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProductos, type ProductosQuery } from "@/lib/data/productos-mock";

export function useProductos(query: ProductosQuery) {
  return useQuery({
    queryKey: ["productos", query],
    queryFn: () => fetchProductos(query),
    placeholderData: keepPreviousData, // mantiene datos anteriores mientras carga la nueva página
    // staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
