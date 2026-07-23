'use client'

import FloatingSearchInput from '@/components/ui/FloatingSearchInput'
import React from 'react'

interface Props {
    searh: string;
    onSearch: (v: string) => void

}


export const CategoriaToolbar = ({ searh, onSearch }: Props) => {
    return (
        <div
            className="flex flex-col sm:flex-row sm:items-center gap-3 py-4"
        >
            <div>
                <div>
                    <FloatingSearchInput
                        value={searh}
                        onChange={(e) => onSearch(e.target.value.trim())}
                    />
                </div>

            </div>

        </div>
    )
}

export default CategoriaToolbar