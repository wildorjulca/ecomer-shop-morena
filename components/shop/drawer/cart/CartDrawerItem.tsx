'use client'

import { CartProduct } from '@/src/interface/cart'
import {  useCartStore } from '@/src/store/cart/cart-store'
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface Props {
    item: CartProduct
}

const CartDrawerItem = ({ item }: Props) => {

    const { removeProduct } = useCartStore()

    return (
        <div className="flex  py-4 border-b border-gray-200 bg-white">

            {/* 🖼 Imagen */}
            <div className="relative w-[72px] h-[72px] rounded-md overflow-hidden">
                <Image
                    alt={item.nombre}
                    src={`/images/products/${item.imagen}`}
                    fill
                    className="object-contain p-1"
                />
            </div>

            {/* 🧾 CONTENIDO */}
            <div className="flex flex-1 flex-col">

                {/* 🔝 TOP: nombre + eliminar */}
                <div className="flex justify-between items-start gap-2">

                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
                            {item.nombre}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                            Color: <span className="font-medium text-gray-700">{item.color}</span>
                        </p>

                        <p className="text-xs text-gray-500">
                            Talla: <span className="font-medium text-gray-700">{item.talla}</span>
                        </p>
                    </div>

                    {/* 🗑 ICONO ELIMINAR */}
                    <button
                        className="text-gray-400 hover:text-red-500 transition"
                        onClick={() => removeProduct(item.varianteId)}
                    >
                        <Trash2 size={18} />
                    </button>

                </div>

                {/* 🔻 BOTTOM: cantidad + precio */}
                <div className="flex justify-between items-center mt-3">

                    {/* ➕➖ Cantidad */}
                    <div className="flex items-center gap-3">
                        <button className="text-gray-600 hover:text-black">
                            <MinusCircle size={20} />
                        </button>

                        <span className="text-sm font-medium">
                            {item.cantidad}
                        </span>

                        <button className="text-gray-600 hover:text-black">
                            <PlusCircle size={20} />
                        </button>
                    </div>

                    {/* 💰 Precio */}
                    <p className="text-sm font-semibold text-gray-900">
                        S/ {item.precio.toFixed(2)}
                    </p>

                </div>

            </div>
        </div>
    )
}

export default CartDrawerItem