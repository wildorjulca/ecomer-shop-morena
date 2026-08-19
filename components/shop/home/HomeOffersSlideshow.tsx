'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import './homeCarrusel.css'

import { Navigation } from 'swiper/modules'
import { Product } from '@/src/interface/products'
import { getAccessoriesProducts } from '@/actions/shop/products/getAccessoriesProducts'
import ProductItem from '../products/ProductItem'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCarousel from './ProductCarousel'
import { getOfferProducts } from '@/actions/shop/products/getOfferProducts'

const SkeletonRow = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
                <div className="bg-gray-200 rounded w-full h-[260px] md:h-[400px]" />
                <div className="bg-gray-200 rounded h-3 w-3/4" />
                <div className="bg-gray-200 rounded h-3 w-1/2" />
            </div>
        ))}
    </div>
)

export default function HomeAccesorioSlideshow() {
    const [swiperRef, setSwiperRef] = useState<any>(null)

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOfferProducts()
            .then(setProducts)
            .catch((err) => console.error('Error cargando ofertas:', err))
            .finally(() => setLoading(false))
    }, [])

    if (!loading && products.length === 0) return null

    return (
        <div className="relative mt-8">

            <h3 className='text-2xl font-medium'>
                Productos en ofertas🔥
            </h3>

            {/* <Swiper
                onSwiper={setSwiperRef}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                modules={[Navigation]}
                className="mySwiper"
                watchOverflow
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 10,
                    },

                    480: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 10,
                    },

                    640: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 20,
                    },

                    1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        spaceBetween: 20,
                    },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductItem product={product} />
                    </SwiperSlide>
                ))}
            </Swiper> */}

            {loading ? <SkeletonRow /> : <ProductCarousel products={products} />}


            {/* BOTÓN ANTERIOR */}
            {/* <button
                type="button"
                className="custom-prev"
                aria-label="Productos anteriores"
            >
                <ChevronLeft />
            </button> */}

            {/* BOTÓN SIGUIENTE */}
            {/* <button
                type="button"
                className="custom-next"
                aria-label="Productos siguientes"
            >
                <ChevronRight />
            </button> */}

        </div>
    )
}