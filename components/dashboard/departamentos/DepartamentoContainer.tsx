'use client'

import React, { useState } from 'react'
import DepartamentoTable from './DepartamentoTable'
import { Departamento } from './columns'

const DepartamentoContainer = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedMarca, setSelectedMarca] = useState<Departamento | null>(null)

    const handleCreate = () => {
        setSelectedMarca(null)
        setIsOpen(true)
    }

    const handleEdit = (marca: Departamento) => {
        setSelectedMarca(marca)
        setIsOpen(true)
    }

    const handleClose = () => {
        setSelectedMarca(null)
        setIsOpen(false)
    }
    return (
        <>
            <DepartamentoTable
                onEdit={handleEdit}
            />
        </>
    )
}

export default DepartamentoContainer