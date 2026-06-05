"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { ChevronLeft, ChevronRight } from "lucide-react"

import Image from "next/image"
import Link from "next/link"

interface Props {
    gender: string
}

const categories = [
    {
        id: 1,
        name: "Casacas",
        image: "/images/subcategory/boton-casacas-300326.png",
        slug: "casacas"
    },
    {
        id: 2,
        name: "Jeans",
        image: "/images/subcategory/boton-jeans-300326.png",
        slug: "jeans"
    },
    {
        id: 3,
        name: "Blusas",
        image: "/images/categories/blusas.webp",
        slug: "blusas"
    },
    {
        id: 4,
        name: "Polos y Tops",
        image: "/images/subcategory/boton-polos-300326.png",
        slug: "polos-tops"
    },
    {
        id: 5,
        name: "Vestidos y Enterizos",
        image: "/images/subcategory/boton-vestidos-300326.png",
        slug: "vestidos-enterizos"
    },
    {
        id: 6,
        name: "Poleras",
        image: "/images/subcategory/boton-poleras-250925.png",
        slug: "poleras"
    },
    {
        id: 7,
        name: "Ropa de Bano",
        image: "/images/subcategory/boton-boton-salida-playa.png",
        slug: "ropa-bano"
    },
    {
        id: 8,
        name: "Ropa de Bano",
        image: "/images/subcategory/boton-boton-salida-playa.png",
        slug: "ropa-bano"
    },
    {
        id: 9,
        name: "Ropa de Bano",
        image: "/images/subcategory/boton-boton-salida-playa.png",
        slug: "ropa-bano"
    }
]

const GenderCategoriesSlider = ({ gender }: Props) => {

    return (

        <div className="relative w-full py-10">

            {/* LEFT */}
            <button
                className="
          custom-prev
          absolute
          left-[-10px]
          md:left-[-18px]
          top-[38%]
          z-20
          -translate-y-1/2
          w-8
          h-8
          rounded-full
          bg-[#7d7d7d]/90
          text-white
          flex
          items-center
          justify-center
          shadow-md
          hover:bg-[#5f5f5f]
          transition
        "
            >
                <ChevronLeft size={18} />
            </button>

            {/* RIGHT */}
            <button
                className="
          custom-next
          absolute
          right-[-10px]
          md:right-[-18px]
          top-[38%]
          z-20
          -translate-y-1/2
          w-8
          h-8
          rounded-full
          bg-[#7d7d7d]/90
          text-white
          flex
          items-center
          justify-center
          shadow-md
          hover:bg-[#5f5f5f]
          transition
        "
            >
                <ChevronRight size={18} />
            </button>

            <div className="px-5 md:px-8">

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        prevEl: ".custom-prev",
                        nextEl: ".custom-next"
                    }}
                    pagination={{
                        clickable: true
                    }}
                    spaceBetween={12}
                    slidesPerView={2.2}
                    breakpoints={{
                        640: {
                            slidesPerView: 3.2
                        },
                        768: {
                            slidesPerView: 4.2
                        },
                        1024: {
                            slidesPerView: 5.5
                        },
                        1280: {
                            slidesPerView: 7
                        }
                    }}
                    className="gender-swiper"
                >

                    {categories.map((category) => (

                        <SwiperSlide key={category.id}>

                            <Link
                                href={`/${gender}/${category.slug}`}
                                className="flex flex-col items-center group"
                            >

                                <div
                                    className="
                    relative
                    w-[120px]
                    h-[120px]
                    md:w-[135px]
                    md:h-[135px]
                    rounded-full
                    overflow-hidden
                    bg-[#e8e6df]
                  "
                                >

                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                                    />

                                </div>

                                <p
                                    className="
                    mt-3
                    text-[14px]
                    md:text-[15px]
                    text-[#333]
                    font-medium
                    text-center
                  "
                                >
                                    {category.name}
                                </p>

                            </Link>

                        </SwiperSlide>

                    ))}

                </Swiper>

            </div>

        </div>

    )
}

export default GenderCategoriesSlider