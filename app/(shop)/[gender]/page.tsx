import { getProducts } from '@/actions/shop/gender/getProducts'
import GenderHeaderFilters from '@/components/shop/gender/GendeHeaderFilters'
import GenderCategoriesSlider from '@/components/shop/gender/GenderCategoriesSlider'
import ProductGrid from '@/components/shop/products/ProductGrid'
import { EmptyProducts } from '@/components/ui/EmptyProducts'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: Promise<{
        gender: string
    }>
    searchParams: Promise<{
        brands?: string;
        categoria?: string
        sort?: "recent" | "price-asc" | "price-desc" | "best-selling"
    }>
}

const validGenders = [
    'Hombre',
    'Mujer',
    'niño',
    'niña'
]
const GenderPage = async ({ params, searchParams }: Props) => {

    const { gender } = await params
    const { brands, categoria, sort } = await searchParams



    const marcas =
        brands?.split(",") || []

    const categories = categoria?.split(",") || []





    if (!validGenders.includes(gender)) {
        notFound()
    }

    const result = await getProducts({ gender, brands: marcas, categories, sort })

    if (!result.ok) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Image
                    src="/error-page.svg"
                    alt="Error"
                    width={300}
                    height={300}
                    priority
                />

                <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                    Ocurrió un error
                </h2>

                <p className="mt-2 text-gray-500 text-center max-w-md">
                    No pudimos cargar los productos en este momento.
                    Intenta nuevamente más tarde.
                </p>
            </div>
        )
    }


    const products = result.products


    return (
        <section>

            <div
                className='
        w-full
        bg-white
        border-t
        border-gray-200
        shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)]
    '
            >

                <div className='max-w-[1200px] mx-auto w-full mt-8'>

                    <h1 className="text-2xl md:text-3xl font-semibold">
                        {gender}
                        <span className="text-lime-500">.</span>
                    </h1>

                    <GenderCategoriesSlider
                        gender={gender}
                    />

                </div>

            </div>

            {/* STICKY */}
            <GenderHeaderFilters />

            <div className='max-w-[1200px] mx-auto w-full mt-8'>

                {products.length > 0 ? (
                    <ProductGrid
                        products={products || []}
                        columns={4}
                    />
                ) : (
                    <EmptyProducts />
                )}

            </div>

        </section>

    )
}

export default GenderPage