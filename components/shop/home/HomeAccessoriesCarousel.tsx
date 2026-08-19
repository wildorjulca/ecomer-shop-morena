'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'

import { getAccessoriesProducts } from '@/actions/shop/products/getAccessoriesProducts'
import { Product } from '@/src/interface/products'
import ProductItem from '../products/ProductItem'

/* ─────────────────────────────────────────────
   Skeleton de loading
───────────────────────────────────────────── */
const SkeletonCard = () => (
    <div className="w-full animate-pulse">
        <div className="bg-gray-200 rounded-xl w-full h-[260px] md:h-[420px]" />

        <div className="mt-3 space-y-2">
            <div className="bg-gray-200 rounded h-3 w-3/4" />
            <div className="bg-gray-200 rounded h-3 w-1/2" />
        </div>
    </div>
)

/* ─────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────── */
const HomeAccessoriesCarousel = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

    const swiperRef = useRef<SwiperType | null>(null)

    /* ─────────────────────────────────────────
       Lazy load
    ───────────────────────────────────────── */
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    // useEffect(() => {
    //     if (!inView) return

    //     const load = async () => {
    //         setLoading(true)

    //         try {
    //             const data = await getAccessoriesProducts(12)

    //             setProducts(data)
    //         } catch (error) {
    //             console.error('Error cargando accesorios:', error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     load()
    // }, [inView])
    useEffect(() => {
        // if (!inView) return

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

    /* ─────────────────────────────────────────
       Actualizar estado de las flechas
    ───────────────────────────────────────── */
    const updateNavigationState = (swiper: SwiperType) => {
        setIsBeginning(swiper.isBeginning)
        setIsEnd(swiper.isEnd)
    }

    /* ─────────────────────────────────────────
       Flecha anterior
    ───────────────────────────────────────── */
    const handlePrev = () => {
        swiperRef.current?.slidePrev()
    }

    /* ─────────────────────────────────────────
       Flecha siguiente
    ───────────────────────────────────────── */
    const handleNext = () => {
        swiperRef.current?.slideNext()
    }

    /* ─────────────────────────────────────────
       No mostrar nada si no hay productos
    ───────────────────────────────────────── */
    // if (!loading && products.length === 0 && inView) {
    //     return null
    // }

    if (!loading && products.length === 0) {
        return null
    }

    return (
        <section
            ref={ref}
            className="w-full py-10 md:py-14"
        >

            {/* ─────────────────────────────────────
                HEADER
            ───────────────────────────────────── */}
            <div className="flex items-end justify-between mb-6 px-1">

                <div>
                    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-lime-500 mb-1">
                        Lo que te puede gustar
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                        Accesorios

                        <Sparkles
                            size={20}
                            className="text-lime-500"
                        />
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        Complementa tu estilo con los accesorios del momento
                    </p>
                </div>

            </div>

            {/* ─────────────────────────────────────
                LOADING
            ───────────────────────────────────── */}
            {loading ? (

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>

            ) : products.length > 0 ? (

                /* ─────────────────────────────────
                   CARRUSEL
                ───────────────────────────────── */
                <div className="relative">

                    {/* ─────────────────────────────
                        FLECHA IZQUIERDA
                    ───────────────────────────── */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        disabled={isBeginning}
                        aria-label="Productos anteriores"
                        className="
                            hidden md:flex

                            absolute
                            left-[-18px]
                            top-1/2
                            -translate-y-1/2

                            z-30

                            w-11
                            h-11

                            items-center
                            justify-center

                            rounded-full

                            bg-white
                            border
                            border-gray-200

                            shadow-lg

                            text-gray-800

                            transition-all
                            duration-200

                            hover:bg-gray-900
                            hover:text-white
                            hover:border-gray-900
                            hover:scale-105

                            disabled:opacity-0
                            disabled:pointer-events-none
                        "
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {/* ─────────────────────────────
                        SWIPER
                    ───────────────────────────── */}
                    <Swiper
                        modules={[Pagination]}

                        /*
                         * Puntos de paginación
                         */
                        pagination={{
                            clickable: true,
                            dynamicBullets: false,
                        }}

                        /*
                         * Si no hay suficientes productos,
                         * Swiper no permite desplazamiento.
                         */
                        watchOverflow

                        /*
                         * ──────────────────────────
                         * RESPONSIVE
                         *
                         * slidesPerView:
                         * cantidad visible
                         *
                         * slidesPerGroup:
                         * cantidad que avanza
                         * cada flecha
                         * ──────────────────────────
                         */
                        breakpoints={{

                            /* ───── MOBILE ───── */
                            0: {
                                slidesPerView: 2.15,
                                slidesPerGroup: 2,
                                spaceBetween: 10,
                            },

                            /* ───── MOBILE GRANDE ───── */
                            480: {
                                slidesPerView: 2.4,
                                slidesPerGroup: 2,
                                spaceBetween: 12,
                            },

                            /* ───── TABLET ───── */
                            640: {
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                                spaceBetween: 14,
                            },

                            /* ───── TABLET GRANDE ───── */
                            768: {
                                slidesPerView: 3.5,
                                slidesPerGroup: 3,
                                spaceBetween: 16,
                            },

                            /* ───── LAPTOP ───── */
                            1024: {
                                slidesPerView: 4,
                                slidesPerGroup: 4,
                                spaceBetween: 18,
                            },

                            /* ───── DESKTOP ───── */
                            1280: {
                                slidesPerView: 5,
                                slidesPerGroup: 5,
                                spaceBetween: 20,
                            },
                        }}

                        /*
                         * Guardamos instancia de Swiper
                         */
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper

                            updateNavigationState(swiper)
                        }}

                        /*
                         * Actualizar flechas después
                         * de cambiar de página
                         */
                        onSlideChange={(swiper) => {
                            updateNavigationState(swiper)
                        }}

                        /*
                         * Actualizar cuando cambia
                         * el tamaño de pantalla
                         */
                        onResize={(swiper) => {
                            updateNavigationState(swiper)
                        }}

                        /*
                         * Espacio abajo para que los
                         * puntos NO estén encima
                         * de ProductItem
                         */
                        className="w-full !pb-10"
                    >

                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductItem product={product} />
                            </SwiperSlide>
                        ))}

                    </Swiper>

                    {/* ─────────────────────────────
                        FLECHA DERECHA
                    ───────────────────────────── */}
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={isEnd}
                        aria-label="Siguientes productos"
                        className="
                            hidden md:flex

                            absolute
                            right-[-18px]
                            top-1/2
                            -translate-y-1/2

                            z-30

                            w-11
                            h-11

                            items-center
                            justify-center

                            rounded-full

                            bg-white
                            border
                            border-gray-200

                            shadow-lg

                            text-gray-800

                            transition-all
                            duration-200

                            hover:bg-gray-900
                            hover:text-white
                            hover:border-gray-900
                            hover:scale-105

                            disabled:opacity-0
                            disabled:pointer-events-none
                        "
                    >
                        <ChevronRight size={22} />
                    </button>

                </div>

            ) : null}

            {/* ─────────────────────────────────────
                VER TODOS
            ───────────────────────────────────── */}
            {!loading && products.length > 0 && (
                <div className="mt-8 flex justify-center">

                    <Link
                        href="/categoria/accesorios"
                        className="
                            inline-flex
                            items-center
                            gap-2

                            px-6
                            py-2.5

                            border
                            border-gray-900

                            text-sm
                            font-medium
                            text-gray-900

                            rounded-full

                            transition

                            hover:bg-gray-900
                            hover:text-white
                        "
                    >
                        Ver todos los accesorios

                        <ChevronRight size={15} />
                    </Link>

                </div>
            )}

        </section>
    )
}

export default HomeAccessoriesCarousel