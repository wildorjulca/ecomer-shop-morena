'use client'

import React from 'react'
import { FaWhatsapp } from "react-icons/fa6";

const steps = [
  { id: 1, label: 'Carrito' },
  { id: 2, label: 'Dirección' },
  { id: 3, label: 'Pago' },
  { id: 4, label: 'Confirmación' },
]

interface Props {
  currentStep?: number
}

const CheckoutHeader = ({ currentStep = 3 }: Props) => {
  return (
    <header
      className="
        fixed top-0 left-0 w-full
        h-[60px]
        bg-[#ffffff]
        text-black
        shadow-[0_2px_8px_#00000040]
      "
    >
      <div
        className="
          max-w-[1200px]
          mx-auto
          h-full
          px-4
          flex
          items-center
          justify-between
        "
      >

        {/* LOGO */}
        <h1 className='text-xl md:text-2xl font-semibold shrink-0'>
          ASOS
        </h1>

        {/* WHATSAPP */}
        <div className='flex items-center gap-2 min-w-0'>

          <FaWhatsapp
            size={20}
            className='shrink-0'
          />

          {/* DESKTOP */}
          <p className='hidden md:block text-sm whitespace-nowrap'>
            ¿Necesitas ayuda? Escríbenos al +51 970 311 999
          </p>

          {/* MOBILE */}
          <p className='block md:hidden text-xs truncate'>
            ¿Necesitas ayuda?
          </p>

        </div>

      </div>
    </header>
  )
}

export default CheckoutHeader