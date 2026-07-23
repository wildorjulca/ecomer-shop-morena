"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

interface Props {
    gender: string;
}

const categorias = {
    hombre: [
        { id: 94, name: "Polos", slug: "polos", image: "/images/subcategory/polo-hombre.png" },
        { id: 95, name: "Pantalones", slug: "pantalones", image: "/images/subcategory/pantalon-hombre.png" },
        { id: 97, name: "Casacas", slug: "casacas", image: "/images/subcategory/casaca-hombre.png" },
        { id: 98, name: "Poleras", slug: "poleras", image: "/images/subcategory/polera-hombre.png" },
        { id: 99, name: "Camisas", slug: "camisas", image: "/images/subcategory/camisa-hombre.png" },
        { id: 100, name: "Zapatillas", slug: "zapatillas", image: "/images/subcategory/zapatillas.png" },
        { id: 101, name: "Botas", slug: "botas", image: "/images/subcategory/bota-hombre.png" },
        { id: 102, name: "Sandalias", slug: "sandalias", image: "/images/subcategory/sandalia-hombre.png" },
        { id: 105, name: "Deportivo", slug: "deportivo", image: "/images/subcategory/deportivo.png" },
        { id: 106, name: "Botines", slug: "botines", image: "/images/subcategory/botines-hombre.webp" },
        { id: 107, name: "Gorras", slug: "gorras", image: "/images/subcategory/gorra.png" },
        { id: 108, name: "Mochilas", slug: "mochilas", image: "/images/subcategory/mochila.webp" },
    ],

    mujer: [
        { id: 94, name: "Polos y Tops", slug: "polos", image: "/images/subcategory/polo-mujer.png" },
        { id: 95, name: "Pantalones", slug: "pantalones", image: "/images/subcategory/pantalon-mujer.png" },
        { id: 96, name: "Vestidos", slug: "vestidos", image: "/images/subcategory/vestido.png" },
        { id: 97, name: "Casacas y Chalecos", slug: "casacas", image: "/images/subcategory/casaca-mujer.png" },
        { id: 98, name: "Poleras", slug: "poleras", image: "/images/subcategory/polera-mujer.png" },
        { id: 100, name: "Zapatillas", slug: "zapatillas", image: "/images/subcategory/zapatillas.png" },
        { id: 101, name: "Botas y Botines", slug: "botas", image: "/images/subcategory/bota-mujer.png" },
        { id: 102, name: "Sandalias", slug: "sandalias", image: "/images/subcategory/sandalia-mujer.png" },
        { id: 104, name: "Tacones", slug: "tacones", image: "/images/subcategory/tacones.png" },
        { id: 107, name: "Gorras", slug: "gorras", image: "/images/subcategory/gorra.png" },
        { id: 108, name: "Mochilas", slug: "mochilas", image: "/images/subcategory/mochila.webp" },
    ],

    niño: [
        { id: 94, name: "Polos", slug: "polos", image: "/images/subcategory/polos.png" },
        { id: 95, name: "Pantalones", slug: "pantalones", image: "/images/subcategory/pantalones.png" },
        { id: 97, name: "Casacas", slug: "casacas", image: "/images/subcategory/casacas.png" },
        { id: 98, name: "Poleras", slug: "poleras", image: "/images/subcategory/poleras.png" },
        { id: 100, name: "Zapatillas", slug: "zapatillas", image: "/images/subcategory/zapatillas.png" },
        { id: 102, name: "Sandalias", slug: "sandalias", image: "/images/subcategory/sandalias.png" },
        { id: 105, name: "Deportivo", slug: "deportivo", image: "/images/subcategory/deportivo.png" },
        { id: 107, name: "Gorras", slug: "gorras", image: "/images/subcategory/gorras.png" },
        { id: 108, name: "Mochilas", slug: "mochilas", image: "/images/subcategory/mochilas.png" },
    ],

    niña: [
        { id: 94, name: "Polos", slug: "polos", image: "/images/subcategory/polos.png" },
        { id: 95, name: "Pantalones", slug: "pantalones", image: "/images/subcategory/pantalones.png" },
        { id: 96, name: "Vestidos", slug: "vestidos", image: "/images/subcategory/vestidos.png" },
        { id: 97, name: "Casacas", slug: "casacas", image: "/images/subcategory/casacas.png" },
        { id: 98, name: "Poleras", slug: "poleras", image: "/images/subcategory/poleras.png" },
        { id: 100, name: "Zapatillas", slug: "zapatillas", image: "/images/subcategory/zapatillas.png" },
        { id: 102, name: "Sandalias", slug: "sandalias", image: "/images/subcategory/sandalias.png" },
        { id: 108, name: "Mochilas", slug: "mochilas", image: "/images/subcategory/mochilas.png" },
    ],
};

const GenderCategoriesSlider = ({ gender }: Props) => {
    const categories =
        categorias[gender.toLowerCase() as keyof typeof categorias] ?? [];
    return (
        <section className="relative w-full py-3 md:py-6">
            {/* Flecha izquierda (solo escritorio) */}
            <button
                className="
          custom-prev
          hidden md:flex
          absolute
          left-[-18px]
          top-[40%]
          z-20
          -translate-y-1/2
          w-9
          h-9
          rounded-full
          bg-[#7d7d7d]/90
          text-white
          items-center
          justify-center
          shadow-md
          hover:bg-[#5f5f5f]
          transition
        "
            >
                <ChevronLeft size={18} />
            </button>

            {/* Flecha derecha (solo escritorio) */}
            <button
                className="
          custom-next
          hidden md:flex
          absolute
          right-[-18px]
          top-[40%]
          z-20
          -translate-y-1/2
          w-9
          h-9
          rounded-full
          bg-[#7d7d7d]/90
          text-white
          items-center
          justify-center
          shadow-md
          hover:bg-[#5f5f5f]
          transition
        "
            >
                <ChevronRight size={18} />
            </button>

            <div className="px-2 sm:px-3 md:px-8">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".custom-prev",
                        nextEl: ".custom-next",
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 4.35,
                            spaceBetween: 8,
                        },
                        480: {
                            slidesPerView: 4.5,
                            spaceBetween: 8,
                        },
                        640: {
                            slidesPerView: 5.2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 6,
                            spaceBetween: 12,
                        },
                        1024: {
                            slidesPerView: 7,
                            spaceBetween: 14,
                        },
                        1280: {
                            slidesPerView: 8,
                            spaceBetween: 16,
                        },
                    }}
                >
                    {categories.map((category) => (
                        <SwiperSlide
                            key={category.id}
                            className="!flex justify-center"
                        >
                            <Link
                                href={`/gender/${gender}/${category.slug}`}
                                className="flex flex-col items-center group"
                            >
                                <div
                                    className="
                    relative
                    w-[68px]
                    h-[68px]
                    sm:w-[78px]
                    sm:h-[78px]
                    md:w-[95px]
                    md:h-[95px]
                    lg:w-[110px]
                    lg:h-[110px]
                    rounded-full
                    overflow-hidden
                    bg-[#e8e6df]
                    transition-all
                  "
                                >
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        sizes="
                      (max-width:640px) 68px,
                      (max-width:768px) 78px,
                      (max-width:1024px) 95px,
                      110px
                    "
                                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <p
                                    className="
                    mt-2
                    text-center
                    text-[10px]
                    sm:text-[11px]
                    md:text-[13px]
                    font-medium
                    text-gray-800
                    leading-tight
                    line-clamp-2
                    min-h-[28px]
                  "
                                >
                                    {category.name}
                                </p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default GenderCategoriesSlider;