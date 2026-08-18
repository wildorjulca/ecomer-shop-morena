'use client'

import { useCartSummary } from '@/src/hooks'
import Link from 'next/link'

const OrderSumary = () => {

    const { itemsInCart, subTotal } = useCartSummary()

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold hidden md:block">Resumen de la Orden</h3>

            <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-lg">

                <div className="flex items-center justify-between mb-2">
                    <p>
                        {itemsInCart === 1 ? "Producto(1)" : `Productos(${itemsInCart})`}
                    </p>
                    <p>S/ {subTotal.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between font-semibold text-lg border-t pt-3">
                    <p>Total</p>
                    <p>S/ {subTotal.toFixed(2)}</p>
                </div>

                <Link href={"/checkout-payment"} className="mt-4 flex items-center justify-center bg-[#6A148E] hover:bg-[#5a1777] w-full py-2.5 rounded-3xl text-slate-50 font-medium hover:opacity-90 transition">
                    Continuar con la compra
                </Link>

            </div>
        </div>
    )
}

export default OrderSumary