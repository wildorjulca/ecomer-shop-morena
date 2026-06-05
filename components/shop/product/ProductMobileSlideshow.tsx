'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import AddTofavorites from './addTo-favorites';
interface Props {
    images: string[];
}

export const ProductMobileSlideshow = ({ images }: Props) => {

    return (
        <div className="w-full bg-[#F1F1F1]">
            <AddTofavorites
                isFavorite={false}
            // producto_id={1}
            />

            <Swiper
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500 }}
                modules={[Autoplay, Pagination]}
                className="w-full"
            >
                {images.map((image) => (
                    <SwiperSlide key={image}>
                        <div className="relative w-full h-[350px] sm:h-[350px]">

                            <Image
                                src={`/images/products/${image}`}
                                alt=""
                                fill
                                className="object-contain p-4"
                            />

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
}