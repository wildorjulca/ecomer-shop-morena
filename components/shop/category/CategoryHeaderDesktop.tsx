'use client'

import { useSidebarAction } from '@/src/store/sidebar/sidebar-movile-action'
import { Funnel } from 'lucide-react'
import React from 'react'

interface Props {
    className?: string;
    totalProducts: number
}
const CategoryHeaderDesktop = ({ className, totalProducts }: Props) => {

    const { openSidebar, toogleSidebar } = useSidebarAction()

    return (
        <div className={`mb-4 ${className}`}>

            <div className='flex items-center justify-between gap-3'>

                {/* LEFT → SELECT */}
                <p className='text-sm text-gray-600'>{totalProducts} Productos encontrados </p>


                {/* RIGHT → Total Products*/}
                <select
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white 
                               focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Ordenar por</option>
                    <option value="price_asc">Precio: menor a mayor</option>
                    <option value="price_desc">Precio: mayor a menor</option>
                    <option value="newest">Más nuevos</option>
                    <option value="best_seller">Más vendidos</option>
                </select>

            </div>

        </div>
    )
}

export default CategoryHeaderDesktop