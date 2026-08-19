'use client'

import Image from 'next/image'

const images = [
    '/images/accesorios/lentes.png',
    '/images/accesorios/relojes.png',
    '/images/accesorios/pulsera.png',
    '/images/accesorios/pijamas.png',
    '/images/accesorios/ropa-interior.png',
]

const HomeFootwearAccesorioShowcase = () => {
    return (
        <section className="w-full px-4 py-10 mt-8">

        <h3 className='text-2xl text-center mb-8 font-medium'>Completa tu Look😎</h3>

            {/* 🔥 GRID IMAGENES */}
            <div className="
        grid 
        grid-cols-2 
        md:grid-cols-5 
        gap-3
      ">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="
              relative 
              w-full 
              h-[260px] 
              md:h-[380px] 
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

export default HomeFootwearAccesorioShowcase