'use client'

import { Marca, Subcategorias, Talla } from '@/src/interface/categorySidebar';
import { useSidebarAction } from '@/src/store/sidebar/sidebar-movile-action'
import React from 'react'
import { SubCategoryDropdown } from './ShopWithSidebar/SubCategoryDropdown';
import { MarcaDropdown } from './ShopWithSidebar/MarcaDropdown';
import SizeDropdown from './ShopWithSidebar/SizeDropdown';

interface Props {
    className: string;
    gender: string
    currentCategory: string
    subcategorias: Subcategorias[]
    marcas: Marca[]
    tallas: Talla[]
}

const CategorySidebarMovile = ({
    className,
    currentCategory,
    subcategorias,
    marcas,
    tallas

}: Props) => {

    const { openSidebar, toogleSidebar } = useSidebarAction()

    return (
        <>
            {/* OVERLAY */}
            {openSidebar && (
                <div
                    onClick={() => toogleSidebar(false)}
                    className="fixed inset-0 bg-black/40 z-50 xl:hidden"
                />
            )}

            {/* SIDEBAR */}
            <div className={`${className}`}>
                <div className={`w-64 fixed top-0 left-0 h-screen bg-white z-50 
                                overflow-y-auto transition-transform duration-300
                                ${openSidebar ? 'translate-x-0' : "-translate-x-full"}
                                `}>

                    <div className="p-4 flex flex-col gap-4">

                        <h2 className="font-semibold text-lg">
                            Filtros
                        </h2>

                        {/* EJEMPLO CONTENIDO */}
                        <div className="flex flex-col gap-2">
                            <SubCategoryDropdown subcategory={subcategorias} />
                            <MarcaDropdown marcas={marcas} />
                            <SizeDropdown tallas={tallas} />
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default CategorySidebarMovile