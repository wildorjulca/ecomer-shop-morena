"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useInView } from "react-intersection-observer";

import "swiper/css";
import "swiper/css/navigation";

import { getOfferProducts } from "@/actions/shop/products/getOfferProducts";
import ProductGrid from "../products/ProductGrid";
import { Product } from "@/src/interface/products";

const OffersSlideshow = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    useEffect(() => {

        const loadProducts = async () => {

            if (!inView) return;

            try {

                setLoading(true);

                const data = await getOfferProducts();

                setProducts(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        loadProducts();

    }, [inView]);

    console.log(products)

    return (

        <section className="w-full py-12 bg-white">

            <div ref={ref} className="max-w-7xl mx-auto px-4 md:px-6">

                <h2 className="text-center text-xl md:text-2xl font-medium mb-6">
                    Ofertas 🔥
                </h2>

                {/* Loading */}
                {loading && (

                    <div className="flex justify-center py-16">
                        <p className="text-gray-400 text-sm">Cargando ofertas...</p>
                    </div>

                )}

                {/* Products */}
                {!loading && products.length > 0 && (

                    <ProductGrid
                    columns={4}
                        products={products}
                    />

                )}

            </div>

        </section>

    );
};

export default OffersSlideshow;