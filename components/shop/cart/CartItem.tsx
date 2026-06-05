'use client'

import { verificarStock } from '@/actions/shop/product/verificarStock'
import { useLoader } from '@/components/provider/LoaderProvider'
import { CartProduct, useCartStore } from '@/src/store/cart/cart-store'
import { AlertCircle, MinusCircle, PlusCircleIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
    item: CartProduct
}
const CartItem = ({ item }: Props) => {

    const { removeProduct, updateQuantity } = useCartStore()
    const { loading, setLoading } = useLoader()
    const [newValueQuantity, setnewValueQuantity] = useState<number>()
    const [errorMessage, seterrorMessage] = useState<string | null>(null)

    const onChangeQuantity = async (varianteId: number, value: number) => {
        if (value < 1) return // evitar cantidades negativas o 0

        seterrorMessage(null)

        setLoading(true)
        const validateStock = await verificarStock(varianteId, value)
        setLoading(false)

        if (!validateStock.ok) {
            seterrorMessage(validateStock.message ?? "")
            return
        }
        updateQuantity(varianteId, value)
    }
    return (
        <div
            key={item.varianteId}
            className="p-4 border-t border-gray-200 flex gap-4"
        >

            {/* Imagen */}
            <div className="relative w-[100px] h-[100px] bg-black/10 flex justify-center items-center rounded">
                <Image
                    alt={item.nombre}
                    src={`/images/products/${item.imagen}`}
                    fill
                    className="object-contain"
                />
            </div>

            {/* Info + controls */}
            <div className="flex justify-between w-full">

                {/* LEFT INFO */}
                <div className="flex flex-col justify-between">

                    <div>
                        <h3 className="text-md font-medium">{item.nombre}</h3>

                        <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                            <p>
                                Color:{" "}
                                <span className="font-semibold">{item.color}</span>
                            </p>
                            <span>|</span>
                            <p>
                                Talla:{" "}
                                <span className="font-semibold">{item.talla}</span>
                            </p>
                        </div>

                        {/* 🔴 ELIMINAR AQUÍ */}
                        <button
                            className="flex items-center gap-1 text-sm text-red-500 hover:underline mt-2"
                            onClick={() => removeProduct(item.varianteId)}
                        >
                            <Trash2 size={16} />
                            Eliminar
                        </button>
                        {errorMessage && (
                            <p className='text-red-500 font-medium text-sm flex items-center gap-1'>
                                <AlertCircle size={16} /> {errorMessage}
                            </p>
                        )}
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col justify-between items-end">

                    <p className="text-md font-semibold text-gray-800">
                        S/.{item.precio.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4">
                        <button
                            className="text-gray-600 hover:text-black"
                            onClick={() => onChangeQuantity(item.varianteId, item.cantidad - 1)}
                        >
                            <MinusCircle size={22} />
                        </button>

                        <span className="text-base font-medium">{item.cantidad}</span>

                        <button
                            className="text-gray-600 hover:text-black"
                            onClick={() => onChangeQuantity(item.varianteId, item.cantidad + 1)}
                        >
                            <PlusCircleIcon size={22} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartItem