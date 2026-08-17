'use client'

import {
  Menu,
  ShoppingBag,
} from "lucide-react"
import { useEffect, useState } from "react"
import CartDrawer from "@/components/shop/drawer/cart/CartDrawer"
import UnauthenticatedPopover from "./UnauthenticatedPopover"
import Link from "next/link"
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

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {/* HEADER */}
      <header
        className={`
          ${className ?? ""}
          fixed top-0 left-0 z-50
          w-full
          text-white
          transition-colors duration-300
          ${
            scrolled
              ? "bg-[#111111]/95 backdrop-blur shadow-md"
              : "bg-[#111111]"
          }
        `}
      >

        {/* FILA PRINCIPAL */}
        <div
          className="
            h-auto
            py-4
            px-4
            flex
            items-center
            justify-between
          "
        >

          {/* MENU */}
          <button
            type="button"
            onClick={() => setOpenMenu(true)}
            className="flex items-center justify-center"
          >
            <Menu className=" text-gray-300" />
          </button>


          {/* LOGO */}
          <div className="flex-1 flex justify-center">

            <Link
              href="/"
              className="
                font-black
                tracking-[6px]
                text-xl
                text-gray-300
              "
            >
              ASOS
            </Link>

          </div>


          {/* ICONOS */}
          <div className="flex items-center gap-3">

            {/* USUARIO */}
            {status === "authenticated" ? (
              <AuthenticatedPopover
                name={session.user.name ?? ""}
              />
            ) : (
              <UnauthenticatedPopover />
            )}


            {/* CARRITO */}
            <div className="relative">

              <ShoppingBag
                onClick={() => setOpenCart(true)}
                className="
                
                  text-gray-300
                  cursor-pointer
                "
              />

              {itemsInCart > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-2
                    bg-white
                    text-black
                    text-[10px]
                    px-1
                    rounded-full
                  "
                >
                  {itemsInCart}
                </span>
              )}

            </div>

          </div>

        </div>


        {/* BUSCADOR */}
        <div
          className="
            w-full
            px-3
            pb-4
            flex
            justify-center
          "
        >
          <SearchBarMovile />
        </div>


        {/* CARRITO */}
        <CartDrawer
          isOpen={openCart}
          onClose={() => setOpenCart(false)}
        />


        {/* MENU */}
        <MenuDrawer
          isOpen={openMenu}
          onClose={() => setOpenMenu(false)}
        />

      </header>


      {/* ESPACIO PARA EL HEADER FIJO */}
      <div className="h-[70px] md:h-[110px]" />
    </>
  )
}

export default HeaderMobile