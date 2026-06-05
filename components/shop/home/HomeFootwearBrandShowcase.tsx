'use client'

import Image from 'next/image'

const images = [
  '/images/calzado/4x-calzado-270426-adidas.webp',
  '/images/calzado/4x-calzado-270426-puma.webp',
  '/images/calzado/4x-calzado-270426-newbalance.webp',
  '/images/calzado/4x-calzado-270426-reebok.webp',
]

const HomeFootwearBrandShowcase = () => {
  return (
    <section className="w-full px-4 py-10 mt-8">

      {/* 🔥 TITULO */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Calzado<span className="text-lime-500">.</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Eleva tu look
        </p>
      </div>

      {/* 🔥 GRID IMAGENES */}
      <div className="
        grid 
        grid-cols-2 
        md:grid-cols-4 
        gap-3
      ">
        {images.map((img, index) => (
          <div
            key={index}
            className="
              relative 
              w-full 
              h-[260px] 
              md:h-[420px] 
              overflow-hidden 
              cursor-pointer 
              group
            "
          >
            <Image
              src={img}
              alt="calzado"
              fill
              className="
                object-cover 
                transition-transform duration-300 
                group-hover:scale-105
              "
            />

            {/* overlay leve */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
          </div>
        ))}
      </div>

    </section>
  )
}

export default HomeFootwearBrandShowcase