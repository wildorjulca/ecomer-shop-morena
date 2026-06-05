import { getProductCategory } from '@/actions/shop/category/getProductsCategory'
import CategoryHeader from '@/components/shop/category/CategoryHeader'
import ProductGrid from '@/components/shop/products/ProductGrid'
import { EmptyProducts } from '@/components/ui/EmptyProducts'
import { Funnel } from 'lucide-react'
import React from 'react'

interface Props {
    params: Promise<{
        gender: string
        category: string  // category es opcional
    }>,
    searchParams: Promise<{
        subCategoria?: string

    }>
}
const page = async ({ params, searchParams }: Props) => {

    const { gender, category } = await params

    const { subCategoria } = await searchParams

    const result = await getProductCategory({
        genderSlug: gender,
        categorySlug: category,
        subcategoriaSlug: subCategoria
    })

    if (!result.ok) {
        return (
            <div className='w-full justify-center items-center'>
                <p className='text-red-500'>Error al obtener los productos</p>
            </div>
        )
    }

    return (
        <div>
            <CategoryHeader />
            {
                result.products.length > 0 ? (
                    <ProductGrid
                        products={result.products || []}
                        columns={3}
                    />
                ) : (
                    <EmptyProducts />
                )
            }
        </div>
    )
}

export default page