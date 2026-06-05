'use client'

import { useSidebarAction } from '@/src/store/sidebar/sidebar-movile-action'
import { Funnel } from 'lucide-react'
import React from 'react'

const CategoryHeader = () => {

    const { openSidebar, toogleSidebar } = useSidebarAction()

    return (
        <div className="mb-4">

            <div className='flex items-center justify-between gap-3'>

                {/* LEFT → SELECT */}
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

                {/* RIGHT → BOTÓN FILTRO */}
                <button
                    onClick={() => toogleSidebar(!openSidebar)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
                               border border-gray-300 rounded-lg bg-white 
                               hover:bg-gray-100 transition"
                >
                    <Funnel size={16} />
                    Filtrar
                </button>

            </div>

        </div>
    )
}

export default CategoryHeader