import { Suspense } from 'react'
import { getProductCategory } from '@/actions/shop/category/getProductsCategory'
import ProductGrid from '@/components/shop/products/ProductGrid'
import { ProductGridSkeleton } from '@/components/ui/skeleton/ProductGridSkeleton'
import { EmptyProducts } from '@/components/ui/EmptyProducts'
import Pagination from '@/components/ui/Pagination'
import CategoryHeaderDesktop from '@/components/shop/category/CategoryHeaderDesktop'
import CategoryHeaderMovile from '@/components/shop/category/CategoryHeaderMovile'

interface Props {
    params: Promise<{
        gender: string
        category: string
    }>
    searchParams: Promise<{
        page?: string;
        subCategoria?: string
    }>
}

// ─── Componente async que hace el fetch ───────────────────────────────────────
// Al estar separado del page, Suspense puede interceptarlo cuando los
// searchParams cambian (navegación shallow por filtros en la URL).
async function CategoryProducts({
    gender,
    category,
    page,
    subCategoria,
}: {
    gender: string
    category: string
    page?: number;
    subCategoria?: string
}) {
    const result = await getProductCategory({
        genderSlug: gender,
        categorySlug: category,
        page: page,
        subcategoriaSlug: subCategoria,
    })

    if (!result.ok) {
        return (
            <div className="w-full justify-center items-center">
                <p className="text-red-500">Error al obtener los productos</p>
            </div>
        )
    }

    if (result.products.length === 0) {
        return <EmptyProducts />
    }

    const paginationResult = result.pagination


    return (
        <>

            <CategoryHeaderDesktop
                className='hidden md:block'
                totalProducts={result.ok ? paginationResult?.totalCount ?? 0 : 0}
            />

            <CategoryHeaderMovile
                className='block md:hidden'
                totalProducts={result.ok ? paginationResult?.totalCount ?? 0 : 0}
            />

            <ProductGrid products={result.products} columns={3} />
            <Pagination
                page={paginationResult?.currentPage ?? 1}
                totalPages={paginationResult?.totalPages ?? 1}
            />

        </>
    )

}

// ─── Page ─────────────────────────────────────────────────────────────────────
const page = async ({ params, searchParams }: Props) => {
    const { gender, category } = await params
    const { page, subCategoria } = await searchParams

    // La key le dice a React que cuando cambie cualquier filtro en la URL,
    // desmonte y remonte CategoryProducts → Suspense muestra el skeleton.
    const suspenseKey = `${gender}-${category}-${subCategoria ?? ''}-${page}`
    const currentPage = Number(page) > 0 ? Number(page) : 1


    return (
        <div>

            <Suspense key={suspenseKey} fallback={<ProductGridSkeleton columns={3} count={12} />}>
                <CategoryProducts
                    gender={gender}
                    category={category}
                    page={currentPage}
                    subCategoria={subCategoria}
                />
            </Suspense>
        </div>
    )
}

export default page
