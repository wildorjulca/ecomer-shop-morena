'use client'

import { getTallaProductByColor } from '@/actions/shop/product/productBySlug'
import { Color, ProductSlug, VarianteSizes } from '@/src/interface/ProductSlug'
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AddToCart from './addTo-cart';
import { AlertCircle } from 'lucide-react';
import { verificarStock } from '@/actions/shop/product/verificarStock';
import { useCartStore } from '@/src/store/cart/cart-store';
import AddToCartMobile from './AddToCartMobile';

interface Props {
    product: ProductSlug
    images: string[]
    colorId: number
    setColorId: (id: number) => void
}

const ProductVariants = ({ product, images, colorId, setColorId }: Props) => {

    console.log(images)

    const { addProduct, cart } = useCartStore()
    const [quantity, setQuantity] = useState<number>(1)

    const router = useRouter()
    const searchParams = useSearchParams()
    const colorIdSearch = searchParams.get("colorId")

    const [errorMessage, seterrorMessage] = useState<string | null>(null)

    const [sizes, setSizes] = useState<VarianteSizes[]>([])
    const [selectedSize, setSelectedSize] = useState<VarianteSizes | null>(null)

    const [loading, setLoading] = useState(false)
    const [loadingStock, setloadingStock] = useState(false)

    // 🔥 FETCH TALLAS
    useEffect(() => {
        let active = true

        const load = async () => {
            setLoading(true)

            const res = await getTallaProductByColor(product.id, colorId)

            if (!active) return

            setLoading(false)

            if (!res.ok) {
                toast.error("Error cargando tallas")
                setSizes([]) // ✅ evita undefined
                return
            }

            const params = new URLSearchParams(searchParams.toString())

            if (colorIdSearch !== String(colorId)) {
                params.set("colorId", colorId.toString())
                router.push(`?${params.toString()}`)
            }

            setSizes(res.varianteTallas ?? []) // ✅ seguro
            setSelectedSize(null)
            setQuantity(1)
        }

        load()

        return () => {
            active = false
        }
    }, [colorId])

    // 🎨 CAMBIO DE COLOR
    const handleColorSelect = (c: Color) => {
        setQuantity(1)
        seterrorMessage(null)

        if (Number(colorIdSearch) === c.id) return

        const params = new URLSearchParams(searchParams.toString())
        params.set("colorId", String(c.id))

        setColorId(c.id)
        router.push(`?${params.toString()}`)
    }

    // 🔢 CAMBIAR CANTIDAD
    const onValueQuantityChanged = (value: number) => {
        if (!selectedSize) {
            seterrorMessage("Debe seleccionar una talla")
            return
        }

        const updateQuantity = quantity + value

        if (updateQuantity < 1) return

        setQuantity(updateQuantity)
    }

    // 📏 SELECCIONAR TALLA
    const handleTallaSelect = (size: VarianteSizes) => {
        setSelectedSize(size) // ✅ correcto

        const varianteInCart = cart.find(
            cp => cp.varianteId === size.variante_id
        )

        if (varianteInCart) {
            setQuantity(varianteInCart.cantidad)
        } else {
            setQuantity(1)
        }
    }

    // 🛒 AGREGAR AL CARRITO
    const handleAddToCart = async () => {
        seterrorMessage(null)

        if (!selectedSize) {
            seterrorMessage("Debe seleccionar una talla")
            return
        }

        setloadingStock(true)
        const res = await verificarStock(selectedSize.variante_id, quantity)
        setloadingStock(false)

        if (!res.ok) {
            seterrorMessage(res.message ?? "")
            // toast.error(res.message, {
            //     position: "bottom-center"
            // })
            return
        }

        const color = product.coloresDisponibles.find(
            c => c.id === Number(colorIdSearch)
        )

        const itemProduct = {
            varianteId: selectedSize.variante_id,
            nombre: product.nombre,
            precio: product.precio_base_venta,
            porcentaje_descuento: product.porcentaje_descuento,
            precio_descuento: product.precio_descuento,
            en_oferta: product.en_oferta,
            cantidad: quantity,
            imagen: images[0],
            color: color?.nombre ?? "",
            talla: selectedSize.talla_valor
        }

        addProduct(itemProduct)
    }

    console.log(cart)

    return (
        <div>

            {/* 🎨 COLORES */}
            <div>
                <h3 className='font-medium mb-2'>Colores</h3>

                <div className='flex items-center gap-2'>
                    {product.coloresDisponibles?.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => handleColorSelect(c)}
                            className={`w-7 h-7 rounded-full border transition
                                ${colorId === c.id ? "ring-2 ring-black scale-110" : ""}
                            `}
                            style={{ backgroundColor: c.codigo_hex }}
                        />
                    ))}
                </div>
            </div>

            {/* 📏 TALLAS */}
            <div className='mt-5'>
                <h3 className='font-medium mb-2'>Tallas</h3>

                <div className='min-h-[50px]'>

                    {loading ? (
                        <div className='flex gap-2'>
                            {[1, 2, 3, 4].map(i => (
                                <div
                                    key={i}
                                    className="w-10 h-10 bg-gray-200 animate-pulse rounded"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-wrap gap-2'>
                            {sizes.map((t) => (
                                <button
                                    key={t.variante_id}
                                    onClick={() => handleTallaSelect(t)}
                                    className={`w-10 h-10 flex items-center justify-center text-sm font-semibold border transition
                                        ${selectedSize?.variante_id === t.variante_id
                                            ? "bg-black text-white"
                                            : "hover:bg-black hover:text-white"}
                                    `}
                                >
                                    {t.talla_valor}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            </div>


            <div className='h-[25px]'>
                {errorMessage && (
                    <p className='text-red-500 font-medium text-sm flex items-center gap-1'>
                        <AlertCircle size={16} /> {errorMessage}
                    </p>
                )}
            </div>

            <AddToCart
                className="hidden md:flex"
                loadingStock={loadingStock}
                handleAddToCart={handleAddToCart}
                quantity={quantity}
                onValueQuantityChanged={onValueQuantityChanged}
            />

            <AddToCartMobile
                className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md p-3 md:hidden"
                loadingStock={loadingStock}
                handleAddToCart={handleAddToCart}
                quantity={quantity}
                onValueQuantityChanged={onValueQuantityChanged}
            />
        </div>
    )
}

export default ProductVariants