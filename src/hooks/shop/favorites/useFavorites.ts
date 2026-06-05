import { getFavoriteCount } from "@/actions/shop/favorites/getFavoritesCount"
import { useQuery } from "@tanstack/react-query"

export const useCountFavorites = () => {
    const query = useQuery({
        queryKey: ["favorites-count"],
        queryFn: getFavoriteCount,
        refetchOnWindowFocus: false, // ❌ no refetch al cambiar de pestaña
        refetchOnMount: false // ❌ no refetch al montar de nuevo
    })
    return query
}