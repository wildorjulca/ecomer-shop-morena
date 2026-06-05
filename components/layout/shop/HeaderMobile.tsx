'use client'

import { Menu, Search, ShoppingCart, Heart, User, MapPin, ShoppingBag, UserCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import CartDrawer from "@/components/shop/drawer/cart/CartDrawer"
import UnauthenticatedPopover from "./UnauthenticatedPopover"
import Link from "next/link"

interface Props {
  className?: string
}
const HeaderMobile = ({ className }: Props) => {

  const [openCart, setOpenCart] = useState(false)

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* 🔥 HEADER STICKY */}
      <header
        className={`
          ${className}
          w-full text-white fixed top-0 left-0 z-50
          transition-all duration-300
          ${scrolled
            ? "bg-[#111111]/95 backdrop-blur shadow-md"
            : "bg-[#111111]"
          }
        `}
      >

        {/* 🔴 TOP PROMO */}
        {/* <div className="text-center text-xs bg-black py-1 text-gray-400">
          Envíos gratis desde S/99 🚚
        </div> */}

        {/* 🔝 HEADER */}
        <div
          className={`
            flex items-center justify-between px-4
            transition-all duration-300
            ${scrolled ? "py-2" : "py-3"}
          `}
        >

          {/* MENU */}
          <Menu className="w-6 h-6 cursor-pointer text-gray-300" />

          {/* LOGO PRO */}
          <div className="flex-1 flex justify-center">
            <Link href={"/"}
              className={`
                font-black tracking-[6px] text-gray-300
                transition-all duration-300
                ${scrolled ? "text-lg" : "text-xl"}
              `}
            >
              ASOS
            </Link>
          </div>

          {/* ICONOS */}
          <div className="flex items-center gap-3">

            <UserCircleIcon className="w-6 h-6 text-gray-300 cursor-pointer" />

            {/* <UnauthenticatedPopover /> */}

            {/* <Heart className="w-5 h-5 text-gray-300 cursor-pointer" /> */}

            <div className="relative">
              <ShoppingBag
                onClick={() => setOpenCart(true)}
                className="w-6 h-6 text-gray-300 cursor-pointer"
              />

              {/* CONTADOR */}
              {/* <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] px-1 rounded-full">
                2
              </span> */}
            </div>

          </div>

        </div>

        {/* 🔍 BUSCADOR */}
        {/* <div className="px-3 pb-2">
          <div className="flex items-center bg-white rounded-md px-3 h-[42px] shadow">

            <Search className="w-4 h-4 text-gray-500" />

            <input
              placeholder="Buscar ropa, zapatillas..."
              className="flex-1 bg-transparent outline-none px-2 text-sm text-black"
            />

          </div>
        </div> */}
        <div className="flex-1 flex justify-center px-3 pb-1.5">
          <div className="w-full max-w-[600px] relative">

            <input
              type="text"
              placeholder="Buscar productos"
              className="w-full h-[42px] bg-gray-100 rounded-sm pl-4 pr-12 text-sm text-black placeholder:text-gray-500 placeholder:text-base focus:outline-none"
            />

            {/* ICONO */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#6a6a6a] h-[42px] w-[45px] flex items-center justify-center  cursor-pointer">
              <Search size={20} className=" text-white" />
            </div>

          </div>
        </div>

        {/* 📍 UBICACIÓN */}
        <div className="flex items-center gap-2 px-3 pb-3 text-sm text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>¿Dónde quieres recibir tu pedido?</span>
        </div>

        {/* 🛒 DRAWER */}
        <CartDrawer
          isOpen={openCart}
          onClose={() => setOpenCart(false)}
        />

      </header>

      {/* 🔥 ESPACIO PARA QUE NO TAPE CONTENIDO */}
      <div className="h-[120px]" />
    </>
  )
}

export default HeaderMobile