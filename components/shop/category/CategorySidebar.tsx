'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SubCategoryDropdown } from './ShopWithSidebar/SubCategoryDropdown'
import { Categories, Color, Marca, Subcategorias, Talla } from '@/src/interface/categorySidebar'
import { MarcaDropdown } from './ShopWithSidebar/MarcaDropdown'
import SizeDropdown from './ShopWithSidebar/SizeDropdown'
import ColorDropdown from './ShopWithSidebar/ColorDropdown'
import { CategoryDropdown } from './ShopWithSidebar/CategoryDropdown'

interface Props {
    categories: Categories[]
    gender: string
    currentCategory: string
    subcategorias: Subcategorias[]
    marcas: Marca[]
    tallas: Talla[]
    // colores: Color[]
}

const CategorySidebar = ({ categories, gender, currentCategory, subcategorias, marcas, tallas }: Props) => {
    const pathname = usePathname()



    return (
        <>
            <aside className={`w-full bg-white rounded-sm border-gray-200  sticky top-24 space-y-6`}>

                <div className='flex flex-col gap-5'>
                    {/* 🔥 SUBCATEGORÍAS */}
                    <div>
                        {/* <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">
                        Subcategorías
                    </h3> */}

                        <CategoryDropdown  gender={gender} categories={categories}/>
                        <SubCategoryDropdown subcategory={subcategorias} />
                        <MarcaDropdown marcas={marcas} />
                        <SizeDropdown tallas={tallas} />
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

export default CategorySidebar