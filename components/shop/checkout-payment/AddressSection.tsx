'use client'

import React, { useEffect } from 'react'
import { useListAddressUser } from '@/src/hooks'
import AddressCard from './AddressCard'
import { useFormContext } from 'react-hook-form'
import { CheckoutFormInputs } from '@/src/interface'
import AddresForm from './AddresForm'
import AddressForm from './AddressForm'


interface Props {
  disabled?: boolean // valor sera true o false si la orden ya se creo es true
}
const AddressSection = ({ disabled }: Props) => {

  const { data: address, isLoading, error } = useListAddressUser()
  const { setValue, watch } = useFormContext<CheckoutFormInputs>()
  const selectedAddressId = watch("selectedAddressId")
  const orderCreated = watch("orderCreated")


  console.log("orderCreated: ", orderCreated)



  // ✅ AUTO SELECCIÓN INICIAL
  useEffect(() => {
    if (!address?.length) return

    // si ya hay una seleccionada, no tocar
    if (selectedAddressId) return

    const defaultAddress =
      address.find(addr => addr.es_principal) || address[0]

    // 🔥 también seteas la temporal (modal)
    setValue("selectedAddressId", defaultAddress.id)

  }, [address, selectedAddressId, setValue])

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar direcciones</p>

  // 🔥 NO TIENE DIRECCIONES
  if (!address?.length) {
    return (
      <div>

        {/* <div className="mb-5">
          <h2 className="text-[22px] font-medium text-gray-900">
            Agrega una dirección
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Necesitamos una dirección para realizar el envío.
          </p>
        </div> */}


        <AddressForm />
      </div>
    )
  }

  // 🔥 SI TIENE DIRECCIONES
  return (
    <AddressCard
      addresses={address}
      disabled={orderCreated}

    />
  )
}

export default AddressSection