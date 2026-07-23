'use client'

import { useState } from 'react'

import MarcaHeader from './MarcaHeader'
import MarcaTable from './MarcaTable'
import MarcaModal from './MarcaModal'

export type Marca = {
    id: number
    nombre: string
    activo: boolean
}

export default function MarcasContainer() {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedMarca, setSelectedMarca] = useState<Marca | null>(null)

    const handleCreate = () => {
        setSelectedMarca(null)
        setIsOpen(true)
    }

    const handleEdit = (marca: Marca) => {
        setSelectedMarca(marca)
        setIsOpen(true)
    }

    const handleClose = () => {
        setSelectedMarca(null)
        setIsOpen(false)
    }

    return (
        <>
            <MarcaHeader
                onCreate={handleCreate}
            />

            <MarcaTable
                onEdit={handleEdit}
            />

            <MarcaModal
                isOpen={isOpen}
                marca={selectedMarca}
                onClose={handleClose}
            />
        </>
    )
}