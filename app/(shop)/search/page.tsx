import { searchProducts } from '@/actions/shop/products/searchProducts'
import ProductGrid from '@/components/shop/products/ProductGrid'
import SearchQueryBadge from '@/components/shop/search/SearchQueryBadge';
import { EmptyProducts } from '@/components/ui/EmptyProducts';
import React from 'react'

interface Props {
  // params: Promise<{
  // genero?: string
  // category: string  // category es opcional
  // }>,
  searchParams: Promise<{
    query?: string;
    genero?: string;
    categoria?: string;
  }>
}
const SearchPage = async ({ searchParams }: Props) => {
  const { query, genero, categoria } = await searchParams



  const rowQuery = query?.split(" ")
  const categories = categoria?.split(",") || []

  const result = await searchProducts({ query: query ?? "", genero: genero, categoria: categories })

  if (!result.ok) {
    return (
      <div className='w-full justify-center items-center'>
        <p className='text-red-500'>Error al obtener los productos</p>
      </div>
    )
  }

  return (
    <div className='max-w-[1200px] mx-auto w-full mt-0'>
      {result.products.length > 0 ? (
        <>
          <SearchQueryBadge />

          <ProductGrid
            products={result.products || []}
            columns={3}
          />
        </>

      ) : (
        <EmptyProducts />
      )}

    </div>

  )
}

export default SearchPage