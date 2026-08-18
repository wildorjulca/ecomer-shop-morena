'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import AddTofavorites from './addTo-favorites';
import { ProductSlug } from '@/src/interface/ProductSlug';
import { CldImage } from 'next-cloudinary';
import { getImageSrc } from '@/src/utils/getImageSrc';
interface Props {
    product: ProductSlug;
    images: string[];
}

export const ProductMobileSlideshow = ({ product, images }: Props) => {

    return (
        <div className="w-full relative bg-[#F1F1F1] mt-10">
            <AddTofavorites
                isFavorite={false}
                product_id={product.id}
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
                            {
                                image.includes("res.cloudinary.com") ? (
                                    <CldImage
                                        alt={image}
                                        src={getImageSrc(image)}
                                        fill
                                        removeBackground={true}
                                        // sizes="(max-width: 768px) 50vw, 25vw"
                                        // className="object-contain transition duration-300 group-hover:scale-105"
                                        className="object-contain p-4"

                                    />
                                ) : (
                                    <Image
                                        src={`/images/products/${image}`}
                                        alt=""
                                        fill
                                        className="object-contain p-4"
                                    />

                                )
                            }


                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
}