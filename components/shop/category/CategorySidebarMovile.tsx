'use client'

import { Categories, Marca, Subcategorias, Talla } from '@/src/interface/categorySidebar'
import { useSidebarAction } from '@/src/store/sidebar/sidebar-movile-action'
import { SubCategoryDropdown } from './ShopWithSidebar/SubCategoryDropdown'
import { MarcaDropdown } from './ShopWithSidebar/MarcaDropdown'
import SizeDropdown from './ShopWithSidebar/SizeDropdown'
import { X } from 'lucide-react'
interface Props {
    gender: string
    currentCategory: string
    categories: Categories[]
    subcategorias: Subcategorias[]
    marcas: Marca[]
    tallas: Talla[]
}

const CategorySidebarMovile = ({
    subcategorias,
    marcas,
    categories,
    tallas,
}: Props) => {
    const { openSidebar, toogleSidebar } = useSidebarAction()

    return (
        <div className="md:hidden">


            {/* OVERLAY */}
            {openSidebar && (
                <div
                    onClick={() => toogleSidebar(false)}
                    className="fixed inset-0 z-40 bg-black/40"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-screen w-72 bg-white
          overflow-y-auto shadow-xl
          transition-transform duration-300
          ${openSidebar ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-lg font-semibold">Filtros</h2>

                    <button onClick={() => toogleSidebar(false)}>
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 p-4">
                    <SubCategoryDropdown subcategory={subcategorias} />
                    <MarcaDropdown marcas={marcas} />
                    <SizeDropdown tallas={tallas} />
                </div>
            </aside>
        </div>
    )
}

export default CategorySidebarMovile