'use client'

import React, { useState } from 'react'
import ProvinciaHeader from './ProvinciaHeader'
import ProvinciaTable from './ProvinciaTable'
import { Provincia } from './columns'

const ProvinciaContainer = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedMarca, setSelectedMarca] = useState<Provincia | null>(null)

  const handleCreate = () => {
    setSelectedMarca(null)
    setIsOpen(true)
  }

  const handleEdit = (marca: Provincia) => {
    setSelectedMarca(marca)
    setIsOpen(true)
  }

  const handleClose = () => {
    setSelectedMarca(null)
    setIsOpen(false)
  }
  return (
    <>
      <ProvinciaHeader
        onCreate={() => console.log("on new prov")}
      />

      <ProvinciaTable
        onEdit={handleEdit}

      />
    </>

  )
}

export default ProvinciaContainer