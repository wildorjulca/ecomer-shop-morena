'use client'

import { Product, Talla } from "@/src/interface/products"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import AddTofavorites from "../product/addTo-favorites"
import { getProductImagesByColor } from "@/actions/shop/images/getProductImagesByColor"
import { toast } from "sonner"
import clsx from "clsx"
import ProductPrice from "../product/product-price"

interface Props {
  product: Product
}

const ProductItem = ({ product }: Props) => {

  // 🎨 estado de color seleccionado
  const [selectedColorId, setSelectedColorId] = useState(
    product.color_default?.id
  )

  const [tallas, setTallas] = useState<Talla[] | null>(product?.color_default?.tallas || null)

  // 🖼️ estado de imágenes dinámicas
  const [imagenes, setImagenes] = useState<string[]>(product.imagenes || [])

  // imagen principal / hover
  const [selectImage, setSelectImage] = useState(
    product.imagenes?.[0] || "/placeholder.png"
  )

  // ⏳ loading estado
  const [loading, setLoading] = useState(false)

  const firstImage = imagenes?.[0] || "/placeholder.png"
  const secondImage = imagenes?.[1]

  // 🔥 cuando cambian imágenes → actualizar imagen visible
  useEffect(() => {
    setSelectImage(firstImage)
  }, [firstImage])

  // 🎨 CAMBIO DE COLOR → SERVER ACTION
  const handleColorChange = async (colorId: number) => {

    if (colorId === selectedColorId) return

    setSelectedColorId(colorId)
    setLoading(true)
    const res = await getProductImagesByColor(product.id, colorId)
    setLoading(false)

    if (!res.ok) {
      toast.error("Error al cargar las imágenes", {
        position: "top-center"
      })
      return
    }

    setImagenes(res.product_imagenes)

    // 🔥 ACTUALIZAR TALLAS SEGÚN COLOR
    const colorSeleccionado = product.colores_disponibles.find(
      c => c.id === colorId
    )

    setTallas(colorSeleccionado?.tallas || [])
  }

  return (
    <div className='w-full group flex flex-col h-[340px] md:h-[600px]'>

      {/* IMAGEN */}
      <div
        className='bg-[#f0f0f0] overflow-hidden block'
        onMouseEnter={() => {
          if (secondImage) {
            setSelectImage(secondImage)
          }
        }}
        onMouseLeave={() => {
          setSelectImage(firstImage)
        }}
      >
        <Link href={`/product/${product.slug}`}>
          <div className="relative w-full h-[250px] md:h-[500px]">

            <Image
              alt={product.nombre}
              src={`/images/products/${selectImage}`}
              fill
              className={`object-contain transition duration-300 group-hover:scale-105`}
            />
            {/* ⏳ LOADING OVERLAY */}
            {loading && (
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-1 border-slate-50"></div>
              </div>
            )}
            {/* ❤️ Favoritos */}
            <AddTofavorites
              product_id={product.id}
              isFavorite={product.isFavorite}
            />

            {/* badge de descuento */}
            {product.en_oferta && product.porcentaje_descuento && (
              <span className="absolute top-2 left-2 bg-[#ef5353] text-white text-xs font-semibold px-2 py-1 rounded-full">
                - {product.porcentaje_descuento}%
              </span>
            )}

            {/* 🔥 TALLAS */}
            <div className="absolute bottom-5 left-4 right-4
              bg-white/90 shadow-md flex justify-center py-2 
              opacity-0 translate-y-5
              group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-300">

              <div className="flex flex-wrap gap-1 px-2">
                {tallas?.map((talla) => (
                  <div
                    key={talla.id}
                    onClick={() => {
                      if (!talla.disponible) return // 🔥 BLOQUEO
                      // aquí tu lógica cuando sí hay stock
                      console.log("Seleccionó talla:", talla.valor)
                    }}
                    className={clsx(
                      "text-xs bg-white flex items-center justify-center border border-gray-200 font-semibold w-[50px] h-[30px] transition",
                      {
                        // ✅ NORMAL
                        "cursor-pointer hover:bg-black hover:text-white": talla.disponible,

                        // ❌ SIN STOCK
                        "line-through text-gray-400 cursor-not-allowed hover:bg-transparent hover:text-gray-400":
                          !talla.disponible
                      }
                    )}
                  >
                    {talla.valor}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Link>
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col flex-1">

        {/* TEXTO */}
        <div>
          <h3 className='mt-2 font-medium text-[13px] truncate'>
            {product.nombre}
          </h3>

          {/* <p className='font-semibold'>
            S/.{product.precio_base_venta.toFixed(2)}
          </p> */}
          <ProductPrice
            en_oferta={product.en_oferta}
            precio_base_venta={product.precio_base_venta}
            precio_descuento={product.precio_descuento}
          />
        </div>

        {/* 🎨 COLORES */}
        <div className="flex items-center gap-2 mt-2">
          {product.colores_disponibles?.length > 1 &&
            product.colores_disponibles.map((c) => (
              <button
                key={c.id}
                onClick={() => handleColorChange(c.id)}
                className={`w-4 h-4 rounded-full border transition
                  ${selectedColorId === c.id ? "ring-2 ring-black" : ""}
                `}
                style={{ backgroundColor: c.codigo_hex }}
              />
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default ProductItem