'use client'

import React, { useEffect, useState } from 'react'
import ProductGalleryDesktop from './ProductGalleryDesktop'
import ProductVariants from './ProductVariants'
import { bodyFont, titleFont, titleFontSlug } from '@/config/fonts'
import { ProductSlug } from '@/src/interface/ProductSlug'
import { getImagesProductByColor } from '@/actions/shop/product/productBySlug'
import { ProductMobileSlideshow } from './ProductMobileSlideshow'

interface Props {
    product: ProductSlug
}

const ProductView = ({ product }: Props) => {

    console.log(product)

    const [colorId, setColorId] = useState(product.color_default.id)
    const [images, setImages] = useState<string[]>(product.imagenes)
    const [loadingImages, setLoadingImages] = useState(false)

    useEffect(() => {
        let active = true

        const loadImages = async () => {
            setLoadingImages(true)

            const res = await getImagesProductByColor(product.id, colorId)

            if (!active) return

            setLoadingImages(false)

            if (!res.ok) return

            setImages(res.imagenes)
        }

        loadImages()

        return () => {
            active = false
        }
    }, [colorId, product.id])

    return (
        <div className="flex w-full flex-col md:flex-row justify-center gap-6 mt-0 md:mt-8">

            {/* 🖼️ GALERÍA */}
            <div className="w-[650px] shrink-0 hidden md:block">
                <ProductGalleryDesktop
                    images={images}
                    loading={loadingImages}
                />
            </div>

            <div className='w-full block md:hidden'>
                <ProductMobileSlideshow
                    product={product}
                    images={images}
                />
            </div>

            {/* 📦 INFO */}
            <div className='flex-1 min-w-0 px-2 md:p-0'>

                <h1 className={`${bodyFont.className} text-xl md:text-2xl font-semibold`}>
                    {product.nombre}
                </h1>

                {/* {product.en_oferta && product.precio_descuento ? (
                    <div className='w-full'>
                        {product.precio_descuento}
                        { product.en}
                    </div>
                ) : (
                    <p className={`${titleFontSlug.className} text-lg mb-5 mt-2`}>
                        S/.{product.precio_base_venta}
                    </p>
                )} */}

                {product.en_oferta && product.precio_descuento ? (
                    <div className="mt-2 mb-5">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span
                                className={`${titleFontSlug.className} text-3xl font-semibold text-red-600`}
                            >
                                S/ {product.precio_descuento.toFixed(2)}
                            </span>

                            <span className="text-lg text-gray-400 line-through">
                                S/ {product.precio_base_venta.toFixed(2)}
                            </span>

                            {product.porcentaje_descuento && (
                                <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                    -{product.porcentaje_descuento}%
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mt-2 mb-5">
                        <span className={`${titleFontSlug.className} text-3xl font-semibold`}>
                            S/ {product.precio_base_venta.toFixed(2)}
                        </span>
                    </div>
                )}


                <ProductVariants
                    product={product}
                    images={images}
                    colorId={colorId}
                    setColorId={setColorId}
                />

                <div className='mt-4'>
                    <h3 className='text-sm font-semibold mb-1'>Descripcion</h3>
                    <p className='text-gray-900 text-sm'>{product.descripcion}</p>
                </div>

            </div>

        </div>
    )
}

export default ProductView