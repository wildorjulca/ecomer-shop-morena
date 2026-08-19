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

export default function HomeAccesorios() {
    const [swiperRef, setSwiperRef] = useState<any>(null)

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const load = async () => {
            setLoading(true)

            try {
                const data = await getAccessoriesProducts(12)

                setProducts(data)
            } catch (error) {
                console.error('Error cargando accesorios:', error)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    return (
        <div className="relative mt-8">

            <h3 className='text-2xl font-medium'>
                ¡Los ACCESORIOS que estabas buscando! 😎
            </h3>

            <Swiper
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
            </Swiper>

            {/* BOTÓN ANTERIOR */}
            <button
                type="button"
                className="custom-prev"
                aria-label="Productos anteriores"
            >
                <ChevronLeft />
            </button>

            {/* BOTÓN SIGUIENTE */}
            <button
                type="button"
                className="custom-next"
                aria-label="Productos siguientes"
            >
                <ChevronRight />
            </button>

        </div>
    )
}