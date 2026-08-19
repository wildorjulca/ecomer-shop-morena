'use client' 
 
/** 
 * ProductCarousel 
 * ───────────────────────────────────────── 
 * Carrusel reutilizable de productos con Swiper. 
 * 
 * Usa swiperRef + onClick para las flechas, evitando el problema 
 * de refs null en onBeforeInit (los botones se renderizan después 
 * del <Swiper> y React aún no completó el mount en ese momento). 
 * 
 * isBeginning/isEnd controlan disabled y opacidad de las flechas. 
 */ 
 
import { useRef, useState } from 'react' 
import { Swiper, SwiperSlide } from 'swiper/react' 
import type { Swiper as SwiperType } from 'swiper' 
import { ChevronLeft, ChevronRight } from 'lucide-react' 
 
import 'swiper/css' 
import './homeCarrusel.css' 
 
import { Product } from '@/src/interface/products' 
import ProductItem from '../products/ProductItem' 
 
interface Props { 
    products: Product[] 
} 
 
const BREAKPOINTS = { 
    0: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 }, 
    480: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 }, 
    640: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 16 }, 
    1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 }, 
} as const 
 
export default function ProductCarousel({ products }: Props) { 
    const swiperRef = useRef<SwiperType | null>(null) 
    const [isBeginning, setIsBeginning] = useState(true) 
    const [isEnd, setIsEnd] = useState(false) 
 
    if (!products.length) return null 
 
    const updateNav = (swiper: SwiperType) => { 
        setIsBeginning(swiper.isBeginning) 
        setIsEnd(swiper.isEnd) 
    } 
 
    return ( 
        <div className="carousel-wrapper relative"> 
 
            <Swiper 
                className="product-carousel-swiper" 
                breakpoints={BREAKPOINTS} 
                onSwiper={(swiper) => { 
                    swiperRef.current = swiper 
                    updateNav(swiper) 
                }} 
                onSlideChange={updateNav} 
                onResize={updateNav} 
                // Forzar re-evaluación tras el primer render completo 
                onAfterInit={updateNav} 
            > 
                {products.map((product) => ( 
                    <SwiperSlide key={product.id}> 
                        <ProductItem product={product} /> 
                    </SwiperSlide> 
                ))} 
            </Swiper> 
 
            {/* Botón ANTERIOR */} 
            <button 
                type="button" 
                onClick={() => swiperRef.current?.slidePrev()} 
                disabled={isBeginning} 
                className="carousel-btn carousel-btn--prev" 
                aria-label="Productos anteriores" 
            > 
                <ChevronLeft /> 
            </button> 
 
            {/* Botón SIGUIENTE */} 
            <button 
                type="button" 
                onClick={() => swiperRef.current?.slideNext()} 
                disabled={isEnd} 
                className="carousel-btn carousel-btn--next" 
                aria-label="Productos siguientes" 
            > 
                <ChevronRight /> 
            </button> 
 
        </div> 
    ) 
} 