'use client'

import React, { useState } from 'react'
import CategoriaHeader from './CategoriaHeader'
import CategoriaTable from './CategoriaTable'
import CategoriaModal from './CategoriaModal'


export type Categoria = {
    id: number
    nombre: string
    activo: boolean
}
const CategoriaContainer = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [selectCategoria, setSelectCategoria] = useState<Categoria | null>(null)


    const handleCreate = () => {
        setSelectCategoria(null)
        setIsOpen(true)
    }

    const handleEdit = (categoria: Categoria) => {
        setSelectCategoria(categoria)
        setIsOpen(true)
    }

    const handleClose = () => {
        setSelectCategoria(null)
        setIsOpen(false)
    }


    return (
        <>
            <CategoriaHeader
                onCreate={handleCreate}
            />
            <CategoriaTable
            />

            <CategoriaModal
                isOpen={isOpen}
                categoria={selectCategoria}
                onClose={handleClose}
            />
        </>
    )
}

export default CategoriaContainer