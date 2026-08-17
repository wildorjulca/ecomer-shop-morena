import { getCategorizacionSidebar } from '@/actions/shop/category/getCategorizacionSidebar'
import { searchProducts } from '@/actions/shop/products/searchProducts'
import CategorySidebar from '@/components/shop/category/CategorySidebar'
import CategorySidebarMovile from '@/components/shop/category/CategorySidebarMovile'
import React from 'react'

interface Props {
    children: React.ReactNode
    params: Promise<{
        gender: string
        category: string
    }>
}

const CategoryLayout = async ({ children, params }: Props) => {
    const { gender, category } = await params

    const res = await getCategorizacionSidebar({

        categoriaSlug: category,
        generoSlug: gender,

    })

    const { categorias, subcategorias, marcas, tallas } = res


    // const ressultSearch = await searchProducts({ query: "zapatillas joma" })
    // console.log(ressultSearch.products)

    return (
        <div className="max-w-[1200px] mx-auto w-full bg-white relative">
            <div className="flex flex-col md:flex-row gap-8 mt-8">

                {/* Sidebar */}
                <div className="w-64 shrink-0 hidden md:flex">
                    <CategorySidebar
                        categories={categorias}
                        subcategorias={subcategorias}
                        marcas={marcas}
                        gender={gender}
                        currentCategory={category}
                        tallas={tallas}
                    // colores={colores}
                    />
                </div>

                {/* <div className={`w-64 shrink-0 flex md:hidden`}> */}
                <CategorySidebarMovile
                    // className='flex md:hidden'
                    categories={categorias}
                    subcategorias={subcategorias}
                    marcas={marcas}
                    gender={gender}
                    currentCategory={category}
                    tallas={tallas}
                // colores={colores}
                />
                {/* </div> */}



                {/* Contenido */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>

            </div>
        </div>
    )
}

export default CategoryLayout