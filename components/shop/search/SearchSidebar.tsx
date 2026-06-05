'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { GenderDropdown } from './ShopWithSidebar/GenderDropdown'
import { Categories, Gender, Subcategorias } from '@/src/interface/searchDidebar'
import { CategoryDropdown } from './ShopWithSidebar/CategoryDropdown'
import { SubCategoryDropdown } from './ShopWithSidebar/SubCategoryDropdown'
import { useEffect, useState } from 'react'
import { getSearchSidebar } from '@/actions/shop/search/getSearchSidebar'


const SearchSidebar = () => {
    const searchParams = useSearchParams()

    const categoria = searchParams.get("categoria");



    const [data, setData] = useState<{
        genders: Gender[];
        categories: Categories[];
        subcategorias: Subcategorias[];
    } | null>(null);


    useEffect(() => {

        const genero = searchParams.get('genero') || undefined

        const categorias =
            searchParams.get('categoria') ?? ""

        // const subcategorias =
        //     searchParams.get('subcategoria')?.split(',') || []

        const loadData = async () => {

            const res = await getSearchSidebar(
                genero,
                categorias,
                // categorias,

            )


            setData(res)
        }

        loadData()

    }, [searchParams])


    return (
        <>
            <aside className={`w-full bg-white rounded-sm border-gray-200  sticky top-24 space-y-6`}>

                <div className='flex flex-col gap-5'>
                    {/* 🔥 SUBCATEGORÍAS */}
                    <div>
                        {/* <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">
                        Subcategorías
                    </h3> */}

                        <GenderDropdown
                            genders={data?.genders || []}
                        />
                        <CategoryDropdown
                            categories={data?.categories || []}
                        />

                        {categoria && (
                            <SubCategoryDropdown
                                subcategory={data?.subcategorias || []}
                            />
                        )}

                        {/* <MarcaDropdown marcas={marcas} />
                        <SizeDropdown tallas={tallas} />  */}
                        {/* <ColorDropdown colores={colores} /> */}
                    </div>

                    {/* 🔥 BOTÓN LIMPIAR */}
                    <div className="pt-4">
                        <button className="w-full text-sm border py-2 rounded-lg hover:bg-black hover:text-white transition">
                            Limpiar filtros
                        </button>
                    </div>
                </div>


            </aside>
        </>

    )
}

export default SearchSidebar