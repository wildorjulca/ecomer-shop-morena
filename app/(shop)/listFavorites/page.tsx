import { getProductsFavorites } from '@/actions/shop/products/getProductsFavorites'
import { auth } from '@/auth'
import ProductGrid from '@/components/shop/products/ProductGrid'
import { EmptyProducts } from '@/components/ui/EmptyProducts'
import { redirect } from 'next/navigation'
import React from 'react'

const listFavoritePage = async () => {

    const session = await auth()



    if (!session?.user?.id) {
        redirect("/auth/login?redirectTo=/listFavorites");
    }

    const result = await getProductsFavorites(Number(session.user.id))

    if (!result.ok) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-2">¡Oops! Algo salió mal</h2>
                <p className="text-gray-600">{result.message || "No se pudieron cargar tus favoritos."}</p>
            </div>
        )
    }

    const products = Array.isArray(result.products)
        ? result.products
        : []
        
    return (
        <div className='max-w-[1200px] mx-auto w-full bg-white mt-4'>
            {products.length > 0 ? (
                <>
                    <h3 className='text-black font-sans truncate text-2xl mb-4'>Lista de favoritos</h3>
                    <ProductGrid products={result.products} columns={3} />
                </>
            ) : (
                <EmptyProducts />
            )}

        </div>
    )
}

export default listFavoritePage