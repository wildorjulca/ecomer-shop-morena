'use client'

import Image from 'next/image'
const categories = [
    {
        id: 1,
        img: '/images/category/moda-mujer.png',
    },
    {
        id: 2,
        img: '/images/category/moda-hombre.png',
    },
    {
        id: 3,
        img: '/images/category/Catpage-Calzado.png',
    },
    {
        id: 4,
        img: '/images/category/Catpage-Belleza.png',
    },
    {
        id: 5,
        img: '/images/category/Catpage-Accesorios.png',
    },
    {
        id: 6,
        img: '/images/category/Catpage-Decoracion.png',
    },
]

const HomeCategories = () => {
    return (
        <section className="w-full mt-8 px-4 py-8">

            {/* 🔥 TÍTULO */}
            <h2 className="text-center text-xl md:text-2xl font-medium mb-6">
                Busca por categorías
            </h2>

            {/* 🔥 GRID */}
            <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-6 
        gap-3
      ">

                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="
              relative 
              w-full 
              h-[300px]
              overflow-hidden 
              cursor-pointer 
              group
            "
                    >
                        <Image
                            src={cat.img}
                            alt="categoria"
                            fill
                            className="
                object-cover 
                transition-transform duration-300 
                group-hover:scale-105
              "
                        />

                        {/* 🔥 overlay oscuro leve (como tiendas reales) */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                    </div>
                ))}

            </div>
        </section>
    )
}

export default HomeCategories