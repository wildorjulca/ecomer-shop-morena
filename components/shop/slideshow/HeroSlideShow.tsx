'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import img0 from './ae5FwcBOoF08xTc9_pe-dsk-sl3-bth-calzado-270426.webp'
import img01 from './afKEAMBOoF08xdO1_pe-dsk-sl1-cp-moda-290426.webp'
import img1 from './ada15Z1ZCF7ES_k1_pe-dsk-sl3-bth-zapatillas-080426.webp'
import img2 from './adP1o5GXnQHGZShW_pe-dsk-sl6-bth-moda-060426.webp'
import img3 from './adP1y5GXnQHGZShb_pe-dsk-sl9-bth-deporte-060426.webp'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Image from 'next/image';

export default function HeroSlideShow() {

    const imagenes = [img0, img01, img1, img2, img3];

    return (
        <Swiper
            navigation
            pagination={{ clickable: true }}
            mousewheel
            keyboard
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
        >
            {imagenes.map((img, index) => (
                <SwiperSlide key={index}>
                    <div className="w-full h-[350px] md:h-[400px] lg:h-[500px] relative">
                        <Image
                            src={img}
                            alt={`slide-${index}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}