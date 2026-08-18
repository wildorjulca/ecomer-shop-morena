'use client'

import { titleFontSlug } from '@/config/fonts';
import { useCartStore } from '@/src/store/cart/cart-store'
import Image from 'next/image'
import React from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import CheckoutPaymentButton from './CheckoutPaymentButton';

interface Props {
  onOrderCreated: () => void  // seteara en true si al orden ya se creo
}
export const OrderSummary = ({ onOrderCreated }: Props) => {

  const { cart } = useCartStore()

  const subtotal = cart.reduce((acc, item) => acc + item.precio, 0)
  const shipping = 10
  const total = subtotal + shipping

  return (
    <div className="bg-white  shadow-md border border-gray-300  w-full text-sm">

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-300 flex items-center gap-2">
        <HiOutlineShoppingBag size={18} className='text-gray-500' />
        <p className="text-gray-600">
          Mis productos ({cart.length})
        </p>
      </div>

      {/* Productos */}
      <div className="max-h-[300px] overflow-y-auto">

        {cart.map((item) => (
          <div key={item.varianteId} className="p-4 flex gap-3 border-b border-gray-300">

            {/* Imagen */}
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image
                src={`/images/products/${item.imagen}`}
                alt={item.nombre}
                fill
                // sizes="80px"
                className="object-contain rounded border"
              />
            </div>

            {/* Info + Precio */}
            <div className="flex-1 min-w-0 flex flex-col gap-1">

              {/* Nombre */}
              <p className="font-semibold truncate uppercase">
                {item.nombre}
              </p>

              {/* Chips + Precio */}
              <div className="flex items-end justify-between">

                {/* Chips */}
                <div className="flex flex-col gap-1">

                  <span className="bg-[#D9D9D9] text-gray-700 text-[11px] font-semibold text-center min-w-[80px] px-2 py-[2px] rounded-full">
                    Color {item.color}
                  </span>

                  <span className="bg-[#D9D9D9] text-gray-700 text-[11px] font-semibold text-center min-w-[80px] px-2 py-[2px] rounded-full">
                    Talla {item.talla}
                  </span>

                </div>

                {/* Precio */}
                <div className={`text-sm font-semibold whitespace-nowrap text-gray-900 ${titleFontSlug.className}`}>
                  S/{item.precio.toFixed(2)}
                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Totales */}
      <div className="p-4 space-y-2 border-b">

        <div className="flex justify-between ">
          <span>Subtotal</span>
          <span>S/{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Despacho</span>
          <span>S/{shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between  font-semibold text-black pt-2 border-t">
          <span>Total a pagar</span>
          <span className={`font-bold ${titleFontSlug.className}`}>S/{total.toFixed(2)}</span>
        </div>

      </div>

      {/* Checkbox */}
      <div className="p-4 text-[12px] text-gray-600 flex items-start gap-2">
        <input type="checkbox" className="mt-1" />
        <p>
          Acepto los términos y condiciones y política de privacidad
        </p>
      </div>

      {/* Botón */}
      <div className="p-4">

        <CheckoutPaymentButton
         onOrderCreated={onOrderCreated}
        />
        {/* <button className="text-white bg-[#6A148E] w-full py-2.5 ">
          Pagar
        </button> */}
      </div>

    </div>
  )
}