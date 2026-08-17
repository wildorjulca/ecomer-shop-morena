'use client'

import { Menu, Search, ShoppingCart, Heart, User, MapPin, ShoppingBag, UserCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import CartDrawer from "@/components/shop/drawer/cart/CartDrawer"
import UnauthenticatedPopover from "./UnauthenticatedPopover"
import Link from "next/link"
import { useCartStore } from "@/src/store/cart/cart-store"
import { useCartSummary } from "@/src/hooks"
import { useSession } from "next-auth/react"
import AuthenticatedPopover from "./AuthenticatedPopover"
import MenuDrawer from "@/components/shop/drawer/menu/MenuDrawer"
import SearchBarMovile from "./SearchBarMovile"

interface Props {
  className?: string
}
const HeaderMobile = ({ className }: Props) => {

  const { status, data: session } = useSession()
  const { itemsInCart } = useCartSummary()
  const [openCart, setOpenCart] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

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
          <Menu
            onClick={() => setOpenMenu(true)}
            className="w-6 h-6 cursor-pointer text-gray-300"
          />

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

            {/* <UserCircleIcon className="w-6 h-6 text-gray-300 cursor-pointer" /> */}

            {status === "authenticated" ? (
              <AuthenticatedPopover name={session.user.name ?? ""} />
            ) : (
              <UnauthenticatedPopover />
            )}

            {/* <Heart className="w-5 h-5 text-gray-300 cursor-pointer" /> */}

            <div className="relative">
              <ShoppingBag
                onClick={() => setOpenCart(true)}
                className="w-6 h-6 text-gray-300 cursor-pointer"
              />

              {itemsInCart > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-black text-[10px] px-1 rounded-full">
                  {itemsInCart}
                </span>
              )}

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
        <div className="flex-1 flex justify-center px-3 relative pb-1.5">
          <SearchBarMovile />
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

        {/*  Menu */}
        <MenuDrawer
          isOpen={openMenu}
          onClose={() => setOpenMenu(false)}
        />

      </header>

      {/* 🔥 ESPACIO PARA QUE NO TAPE CONTENIDO */}
      <div className="h-[120px]" />
    </>
  )
}

export default HeaderMobile