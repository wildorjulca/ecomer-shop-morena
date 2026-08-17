'use client'

import { useSidebarAction } from '@/src/store/sidebar/sidebar-movile-action'
import { Funnel } from 'lucide-react'
import React from 'react'

interface Props {
    className?: string;
    totalProducts: number;
}
const CategoryHeaderMovile = ({ className, totalProducts }: Props) => {

    const { openSidebar, toogleSidebar } = useSidebarAction()

    return (
        <div className={`mb-4 ${className} px-2`}>

            <div className='flex items-center justify-between gap-3'>

                {/* LEFT → count Products */}

                <span>{totalProducts} productos</span>


                {/* RIGHT → BOTÓN FILTRO */}
                <button
                    onClick={() => toogleSidebar(!openSidebar)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
                               border border-gray-300 rounded-lg bg-white 
                               hover:bg-gray-100 transition"
                >
                    <Funnel size={16} />
                    Filtros
                </button>

            </div>

        </div>
    )
}

export default CategoryHeaderMovile