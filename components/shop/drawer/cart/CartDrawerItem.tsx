'use client'

import { removeProductCart, updateQuantityCart } from '@/actions/shop'
import { verificarStock } from '@/actions/shop/product/verificarStock'
import { CartProduct } from '@/src/interface/cart'
import { useCartStore } from '@/src/store/cart/cart-store'
import { getImageSrc } from '@/src/utils/getImageSrc'
import { AlertCircle, MinusCircle, PlusCircle, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
    item: CartProduct
}

const CartDrawerItem = ({ item }: Props) => {

    const { status } = useSession()
    const { removeProduct, updateQuantity } = useCartStore()
    const [message, setMessage] = useState<string | null>(null)




    const handleRemove = async (varianteId: number) => {

        setMessage(null)

        if (status === "authenticated") {
            const result = await removeProductCart(varianteId)
            if (!result.ok) {
                setMessage(result.message)
                return
            }
        }

        removeProduct(varianteId)

    }


    const onChangeQuantity = async (varianteId: number, value: number) => {
        if (value < 1) return

        setMessage(null)

        // INVITADO
        if (status === "unauthenticated") {
            const stock = await verificarStock(varianteId, value)

            if (!stock.ok) {
                setMessage(stock.message ?? "")
                return
            }
            updateQuantity(varianteId, value)
            return
        }

        // AUTENTICADO
        const result = await updateQuantityCart(varianteId, value)

        if (!result.ok) {
            setMessage(result.message)
            return
        }
        updateQuantity(varianteId, value);

    }


    return (
        <>
            <div className="flex  py-4 border-b border-gray-200 bg-white">

                {/* 🖼 Imagen */}
                <div className="relative w-[72px] h-[72px] rounded-md overflow-hidden">
                    {/* <Image
                        alt={item.nombre}
                        src={`/images/products/${item.imagen}`}
                        fill
                        className="object-contain p-1"
                    /> */}
                    {

                        item.imagen.includes("res.cloudinary.com") ? (
                            <CldImage
                                alt={item.nombre}
                                src={getImageSrc(item.imagen)}
                                fill
                                removeBackground={true}
                                className="object-contain p-1"
                            />
                        ) : (
                            <Image
                                alt={item.nombre}
                                src={`${getImageSrc(item.imagen)}`}
                                fill
                                className="object-contain p-1"

                            />

                        )
                    }
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
                            onClick={() => handleRemove(item.varianteId)}
                        >
                            <Trash2 size={18} />
                        </button>

                    </div>

                    {/* 🔻 BOTTOM: cantidad + precio */}
                    <div className="flex justify-between items-center mt-3">

                        {/* ➕➖ Cantidad */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => onChangeQuantity(item.varianteId, item.cantidad - 1)}
                                className="text-gray-600 hover:text-black">
                                <MinusCircle size={20} />
                            </button>

                            <span className="text-sm font-medium">
                                {item.cantidad}
                            </span>

                            <button
                                onClick={() => onChangeQuantity(item.varianteId, item.cantidad + 1)}
                                className="text-gray-600 hover:text-black">
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
            {/* Si ay un ERROR en caso de la ELIMINACION  */}
            {message && (
                <p className='text-red-500 font-medium text-sm flex items-center gap-1'>
                    <AlertCircle size={16} /> {message}
                </p>
            )}
        </>

    )
}

export default CartDrawerItem