'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  images: string[]
  loading?: boolean
}

const ProductGalleryDesktop = ({ images, loading }: Props) => {

  const [selectedImage, setSelectedImage] = useState(
    images[0] || "/placeholder.png"
  )

  // 🔥 Reset cuando cambian imágenes
  useEffect(() => {
    setSelectedImage(images[0] || "/placeholder.png")
  }, [images])

  const [zoom, setZoom] = useState({
    scale: 1,
    x: 50,
    y: 50
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoom({
      scale: 1.5,
      x,
      y
    })
  }

  const handleMouseLeave = () => {
    setZoom({
      scale: 1,
      x: 50,
      y: 50
    })
  }

  return (
    <div className="grid grid-cols-[90px_1fr] gap-1 w-full">

      {/* 🔹 THUMBNAILS */}
      <div className="col-span-1 flex flex-col  gap-1 max-h-[650px] overflow-y-auto">

        {loading ? (
          <>
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-[80px] h-[100px] bg-gray-200 animate-pulse rounded"
              />
            ))}
          </>
        ) : (
          <>
            {images.map((img) => (
              <button
                key={img}
                onClick={() => setSelectedImage(img)}
                className={`
                  relative 
                  w-[80px] 
                  h-[100px] 
                  bg-[#f5f5f5] 
                  border
                  overflow-hidden
                  ${selectedImage === img
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"}
                `}
              >
                <Image
                  src={`/images/products/${img}`}
                  alt=""
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </>
        )}
      </div>

      {/* 🔥 IMAGEN PRINCIPAL */}
      <div
        className="w-full h-[650px] bg-[#f5f5f5] overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        {loading ? (
          <div className="w-full h-[650px] bg-gray-200 animate-pulse" />
        ) : (
          <Image
            key={selectedImage}
            src={`/images/products/${selectedImage}`}
            alt=""
            fill
            priority
            quality={100}
            className="object-contain p-6 transition-transform duration-200"
            style={{
              transform: `scale(${zoom.scale})`,
              transformOrigin: `${zoom.x}% ${zoom.y}%`
            }}
          />
        )}

      </div>

    </div>
  )
}

export default ProductGalleryDesktop