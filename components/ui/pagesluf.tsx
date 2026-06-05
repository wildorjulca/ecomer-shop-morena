'use client'

import Image from "next/image"
import { useState } from "react"

const images = [
    "143.png",
    "144.png",
    "145.png",
    "146.png",

]

const colors = [
    "#5b7fa3", "#8b0000", "#2f2f2f", "#4fd1c5", "#8b4513",
    "#1f3d2b", "#c0c0c0", "#f97316", "#ec4899",
    "#8b5cf6", "#ef4444", "#e5c29f", "#f3f3f3", "#eab308"
]

const sizes = ["XS", "S", "M", "L", "XL", "1X", "2X", "3X"]

export default function ProductSlug() {

    const [selectedImage, setSelectedImage] = useState(images[0])
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState(colors[2])

    return (
        <div className="max-w-[1400px] mx-auto  py-6">

            <div className="grid grid-cols-12 gap-6">

                {/* 🔹 THUMBNAILS */}
                <div className="col-span-1 flex flex-col gap-3">
                    {images.map((img) => (
                        <div
                            key={img}
                            onClick={() => setSelectedImage(img)}
                            className={`relative w-full h-[80px] cursor-pointer border 
              ${selectedImage === img ? "border-black" : "border-gray-200"}`}
                        >
                            <Image src={`/images/products/${img}`} alt="" fill className="object-cover" />
                        </div>
                    ))}
                </div>

                {/* 🔹 IMAGEN GRANDE */}
                <div className="col-span-6 relative h-[700px] bg-[#f5f5f5]">
                    <Image
                        src={`/images/products/${selectedImage}`}
                        alt=""
                        fill
                        quality={100}
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain"
                    />
                </div>

                {/* 🔹 INFO */}
                <div className="col-span-5">

                    {/* TÍTULO */}
                    <h1 className="text-[18px] font-medium mb-2">
                        Conjunto De Pantalón On The Go Fleece - Carbón
                    </h1>

                    {/* RATING */}
                    <div className="flex items-center gap-2 text-sm mb-2">
                        ⭐⭐⭐⭐⭐
                        <span className="underline">(2166)</span>
                    </div>

                    {/* PRECIO */}
                    <div className="mb-3">
                        <span className="text-red-600 text-xl font-bold">
                            S/. 121.00
                        </span>
                        <span className="line-through text-gray-400 ml-2">
                            S/. 172.00
                        </span>
                    </div>

                    <p className="text-red-500 text-sm mb-4">
                        ¡Hasta 70% de descuento en todo el sitio!
                    </p>

                    {/* 🔸 COLORES */}
                    <div className="mb-4">
                        <p className="text-sm mb-2">Charcoal</p>
                        <div className="flex flex-wrap gap-2">
                            {colors.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedColor(c)}
                                    className={`w-6 h-6 rounded-full border
                  ${selectedColor === c ? "ring-2 ring-black" : ""}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 🔸 TALLAS */}
                    <div className="mb-6">
                        <p className="text-sm mb-2">Talla</p>
                        <div className="flex flex-wrap gap-2">
                            {sizes.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSize(s)}
                                    className={`px-4 py-2 border text-sm
                  ${selectedSize === s
                                            ? "bg-black text-white"
                                            : "bg-white hover:bg-black hover:text-white"}
                  `}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 🔸 BOTÓN */}
                    <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:opacity-90 transition">
                        Agregar a la bolsa
                    </button>

                    {/* 🔸 INFO EXTRA */}
                    <div className="mt-6 text-sm text-gray-600 space-y-2">
                        <p>🚚 Envío gratis desde $125</p>
                        <p>📦 Entrega estimada: 1 mayo</p>
                        <p>🔁 Devoluciones en 30 días</p>
                    </div>

                </div>
            </div>
        </div>
    )
}