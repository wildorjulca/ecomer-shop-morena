import { getProducts } from '@/actions/shop/gender/getProducts'
import GenderHeaderFilters from '@/components/shop/gender/GendeHeaderFilters'
import GenderCategoriesSlider from '@/components/shop/gender/GenderCategoriesSlider'
import ProductGrid from '@/components/shop/products/ProductGrid'
import { EmptyProducts } from '@/components/ui/EmptyProducts'
import Pagination from '@/components/ui/Pagination'
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
        // Faltaba esto: sin leer `page` de la URL, siempre se pedía
        // la página 1 sin importar en qué página estuviera el usuario.
        page?: string
    }>
}

const validGenders = [
    'hombre',
    'mujer',
    'ninos',
    'ninas'
]
const GenderPage = async ({ params, searchParams }: Props) => {

    const { gender } = await params
    const { brands, categoria, sort, page } = await searchParams

    const marcas = brands?.split(",") || []
    const categories = categoria?.split(",") || []

    // Si no hay `page` en la URL (primera visita) asumimos página 1.
    // Si viene un valor inválido (texto, 0, negativo), también caemos
    // a 1 en vez de mandarle un número raro a getProducts.
    const currentPage = Number(page) > 0 ? Number(page) : 1


    if (!validGenders.includes(gender)) {
        notFound()
    }

    const result = await getProducts({
        gender,
        brands: marcas,
        categories,
        sort,
        page: currentPage,
    })

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
    const pagination = result.pagination

    return (
        <section>

            <div
                className='
        w-full
        bg-white
        border-t
        border-gray-200
        shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)]
        mt-10
        md:mt-2

    '
            >

                <div className='max-w-[1200px] mx-auto w-full mt-8'>

                    <h1 className="text-2xl md:text-3xl font-medium uppercase">
                        {gender}⚡
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
                    <>
                        <ProductGrid
                            products={products || []}
                            columns={3}
                        />

                        {/*
                          Ya NO se le pasa onPageChange: Pagination ahora
                          navega sola leyendo/escribiendo la URL. Un Server
                          Component como este no puede pasarle una función
                          a un Client Component, así que esa prop nunca
                          hubiera funcionado.
                        */}
                        <Pagination
                            page={pagination?.currentPage ?? currentPage}
                            totalPages={pagination?.totalPages ?? 0}
                        />
                    </>

                ) : (
                    <EmptyProducts />
                )}

            </div>

        </section>

    )
}

export default GenderPage