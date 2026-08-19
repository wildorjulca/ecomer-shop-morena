'use client'

import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import {
    Navigation,
    Pagination,
    Mousewheel,
    Keyboard,
} from 'swiper/modules'

import Image from 'next/image'

import img0 from './ae5FwcBOoF08xTc9_pe-dsk-sl3-bth-calzado-270426.webp'
import img01 from './afKEAMBOoF08xdO1_pe-dsk-sl1-cp-moda-290426.webp'
import img1 from './ada15Z1ZCF7ES_k1_pe-dsk-sl3-bth-zapatillas-080426.webp'
import img2 from './adP1o5GXnQHGZShW_pe-dsk-sl6-bth-moda-060426.webp'
import img3 from './adP1y5GXnQHGZShb_pe-dsk-sl9-bth-deporte-060426.webp'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './style.css'


export default function HeroSlideShow() {

    const imagenes = [
        img0,
        img01,
        img1,
        img2,
        img3,
    ]

    return (
        <div className="hero-slider-wrapper">

            <Swiper
                className="heroSwiper"

                modules={[
                    Navigation,
                    Pagination,
                    Mousewheel,
                    Keyboard,
                ]}

                /* IMPORTANTE */
                slidesPerView={1}
                centeredSlides={false}
                spaceBetween={0}

                navigation={{
                    enabled: true,
                }}

                pagination={{
                    clickable: true,
                }}

                mousewheel={{
                    forceToAxis: true,
                }}

                keyboard={{
                    enabled: true,
                }}

                loop={false}
            >

                {imagenes.map((img, index) => (

                    <SwiperSlide key={index}>

                        <div className="hero-slide">

                            <Image
                                src={img}
                                alt={`Banner ${index + 1}`}
                                fill
                                priority={index === 0}
                                className="hero-image"
                                sizes="100vw"
                            />

                        </div>

                    </SwiperSlide>

                ))}

            </Swiper>

        </div>
    )
}