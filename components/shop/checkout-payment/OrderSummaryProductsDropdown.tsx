'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCartStore } from '@/src/store/cart/cart-store'
import { titleFontSlug } from '@/config/fonts'
import clsx from 'clsx'
import CheckoutPaymentButton from './CheckoutPaymentButton';

interface Props {
    onOrderCreated: () => void  // seteara en true si al orden ya se creo
}
const OrderSummaryProductsDropdown = ({ onOrderCreated }: Props) => {

    const { cart } = useCartStore()
    const subtotal = cart.reduce((acc, item) => acc + item.precio, 0)
    const shipping = 20.9
    const total = subtotal + shipping

    const [open, setOpen] = useState(false)

    return (
        <div className="border-b border-gray-300">


            {/* <div
                className={`
                    fixed inset-0 z-30 bg-black/40
                    transition-opacity duration-300
                    ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `} */}

            {/* HEADER */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                    w-full
                    px-4
                    py-3
                    flex
                    items-center
                    justify-between
                    hover:bg-gray-50
                    transition
                "
            >

                <div className="flex items-center gap-2">

                    <HiOutlineShoppingBag
                        size={18}
                        className='text-gray-500'
                    />

                    <p className="text-gray-700 text-sm font-medium">
                        Productos ({cart.length})
                    </p>

                </div>

                <ChevronDown
                    size={18}
                    className={clsx(
                        "transition-transform duration-300 text-gray-500",
                        open && "rotate-180"
                    )}
                />

            </button>

            {/* CONTENT */}
            <div
                className={clsx(
                    "overflow-hidden transition-all duration-300",
                    open
                        ? "max-h-[400px]"
                        : "max-h-0"
                )}
            >

                <div className="max-h-[300px] overflow-y-auto">

                    {cart.map((item) => (

                        <div
                            key={item.varianteId}
                            className="
                                p-4
                                flex
                                gap-3
                                border-t
                                border-gray-200
                            "
                        >

                            {/* IMAGE */}
                            <div className="w-16 h-16 relative flex-shrink-0">

                                <Image
                                    src={`/images/products/${item.imagen}`}
                                    alt={item.nombre}
                                    fill
                                    className="object-contain rounded border"
                                />

                            </div>

                            {/* INFO */}
                            <div className="flex-1 min-w-0 flex flex-col gap-1">

                                <p className="font-semibold truncate uppercase text-sm">
                                    {item.nombre}
                                </p>

                                <div className="flex items-end justify-between">

                                    {/* CHIPS */}
                                    <div className="flex flex-col gap-1">

                                        <span className="
                                            bg-[#D9D9D9]
                                            text-gray-700
                                            text-[11px]
                                            font-semibold
                                            text-center
                                            min-w-[80px]
                                            px-2
                                            py-[2px]
                                            rounded-full
                                        ">
                                            Color {item.color}
                                        </span>

                                        <span className="
                                            bg-[#D9D9D9]
                                            text-gray-700
                                            text-[11px]
                                            font-semibold
                                            text-center
                                            min-w-[80px]
                                            px-2
                                            py-[2px]
                                            rounded-full
                                        ">
                                            Talla {item.talla}
                                        </span>

                                    </div>

                                    {/* PRICE */}
                                    <div className={`
                                        text-sm
                                        font-semibold
                                        whitespace-nowrap
                                        text-gray-900
                                        ${titleFontSlug.className}
                                    `}>
                                        S/{item.precio.toFixed(2)}
                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

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
            {/* <div className="p-4 text-[12px] text-gray-600 flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <p>
                    Acepto los términos y condiciones y política de privacidad
                </p>
            </div> */}

            <CheckoutPaymentButton
                onOrderCreated={onOrderCreated}
            />

        </div>
    )
}

export default OrderSummaryProductsDropdown