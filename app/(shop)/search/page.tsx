export const dynamic = "force-dynamic";

import { searchProducts } from '@/actions/shop/products/searchProducts'
import ProductGrid from '@/components/shop/products/ProductGrid'
import SearchQueryBadge from '@/components/shop/search/SearchQueryBadge';
import { EmptyProducts } from '@/components/ui/EmptyProducts';
import Pagination from '@/components/ui/Pagination';

interface Props {
  searchParams: Promise<{
    page?: string;
    query?: string;
    genero?: string;
    categoria?: string;
  }>
}


const SearchPage = async ({ searchParams }: Props) => {
  const { page, query, genero, categoria } = await searchParams



  const categories = categoria?.split(",") || []
  const currentPage = Number(page) > 0 ? Number(page) : 1

  const result = await searchProducts({ page: currentPage, limit: 12, query: query ?? "", genero: genero, categoria: categories })
  console.log(result)

  if (!result.ok) {
    return (
      <div className='w-full justify-center items-center'>
        <p className='text-red-500'>Error al obtener los productos</p>
      </div>
    )
  }

  return (
    <div className='max-w-[1200px] mx-auto w-full mt-8'>
      {result.products.length > 0 ? (
        <>

          <h3 className='text-xl px-2 md:text-2xl md:px-0'>Los resultados de tu búsqueda de:  <span className="font-semibold">"{query}"</span></h3>
          <p className='text-gray-500 text-sm px-2 md:px-0'>{result.products.length} productos econtrados</p>
          <SearchQueryBadge />

          <ProductGrid
            products={result.products || []}
            columns={3}
          />

          <Pagination
            page={result.page}
            totalPages={result.totalPages}
          />
        </>

      ) : (
        <EmptyProducts />
      )}

    </div>

  )
}

export default SearchPage