'use client'

import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi"
import AddressModal from './AddressModal'
import { AddressUser, CheckoutFormInputs } from '@/src/interface/checkout-payment'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'

interface Props {
  addresses: AddressUser[]
  disabled?: boolean
}

const AddressCard = ({ addresses, disabled }: Props) => {
  const [open, setOpen] = useState(false)

  const { watch } = useFormContext<CheckoutFormInputs>()

  const selectedAddressId = watch("selectedAddressId")

  // 🔥 ESTA ES LA CLAVE
  const selectedAddress = addresses.find(
    addr => addr.id === selectedAddressId
  )

  return (
    <>
      <div
        className={clsx(
          "bg-white shadow-[0_2px_8px_#00000040] border border-gray-200 rounded-md p-5 w-full transition",

          disabled && "opacity-70 pointer-events-none"
        )}
      >

        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[22px] font-medium">Entrega</h3>

            {selectedAddress ? (
              <div className="text-sm text-gray-700 mt-1">
                <p>{selectedAddress.direccion}</p>
                <p>
                  {selectedAddress.distrito}, {selectedAddress.provincia}
                </p>
                <p>{selectedAddress.departamento}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-1">
                No tienes dirección seleccionada
              </p>
            )}
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-gray-600 underline"
            onClick={() => setOpen(true)}
          >
            Modificar
            <FiEdit size={20} />
          </button>
        </div>

        <button className="w-full mt-4 border rounded-md py-2 text-sm hover:bg-gray-50">
          Quiero retirar mi compra
        </button>

      </div>

      <AddressModal
        open={open}
        onClose={() => setOpen(!open)}
        addresses={addresses}
      />
    </>
  )
}

export default AddressCard