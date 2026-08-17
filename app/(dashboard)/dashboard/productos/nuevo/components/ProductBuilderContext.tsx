'use client'

import React, { createContext, useContext } from 'react'
import { useVariants } from '@/src/hooks/admin/productos/useVariants'
import { useImageManager } from '@/src/hooks/admin/productos/useImageManager'

function useProductBuilder() {
    const variants = useVariants()
    const images = useImageManager()

    return {
        ...variants,
        ...images,
    }
}

type ProductBuilderValue = ReturnType<typeof useProductBuilder>

const ProductBuilderContext =
    createContext<ProductBuilderValue | null>(null)

export const ProductBuilderProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const value = useProductBuilder()

    return (
        <ProductBuilderContext.Provider value={value}>
            {children}
        </ProductBuilderContext.Provider>
    )
}

export const useProductBuilderContext = () => {
    const ctx = useContext(ProductBuilderContext)

    if (!ctx) {
        throw new Error('useProductBuilderContext debe usarse dentro del provider')
    }

    return ctx
}