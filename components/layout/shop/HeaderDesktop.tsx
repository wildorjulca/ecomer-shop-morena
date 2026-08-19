'use client'

import { Heart, Menu, ShoppingBag } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

import CartDrawer from '@/components/shop/drawer/cart/CartDrawer'
import SearchBarDesktop from './SearchBarDesktop'
import UnauthenticatedPopover from './UnauthenticatedPopover'
import AuthenticatedPopover from './AuthenticatedPopover'

import { useCartSummary, useCountFavorites } from '@/src/hooks'
import MenuDrawer from '@/components/shop/drawer/menu/MenuDrawer'

interface Props {
  className?: string
}

const HeaderDesktop = ({ className }: Props) => {
  const { data: favoritesCount = 0, isLoading } = useCountFavorites()
  const { itemsInCart } = useCartSummary()

  const [openCart, setOpenCart] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)


  const { data: session } = useSession()
  const isAuthenticated = !!session

  return (
    <header
      className={`fixed top-0 left-0 z-50 h-[70px] w-full bg-[#111111f6] text-white ${className}`}
    >
      <div
        className="mx-auto grid h-[70px] max-w-[1200px]
        grid-cols-[240px_1fr_220px] items-center gap-4 px-4"
      >
        {/* LOGO + MENU */}
        <div className="flex items-center min-w-0">
          <Link
            href="/"
            className="mr-6 shrink-0 text-2xl font-bold uppercase tracking-widest text-gray-300"
          >
            asos
          </Link>

          <button
            className='hover:cursor-pointer'
            onClick={() => setOpenMenu(true)}
          >
            <Menu size={35} />
          </button>

          <div className="flex h-[50px] items-center">
            <Link
              href="/genero/mujer"
              className="flex h-full items-center border-r border-slate-500 px-4 text-sm font-medium hover:text-gray-300"
            >
              MUJER
            </Link>

            <Link
              href="/genero/hombre"
              className="flex h-full items-center px-4 text-sm font-medium hover:text-gray-300"
            >
              HOMBRE
            </Link>
          </div>

        </div>

        {/* SEARCH */}
        <div className="flex justify-center">
          <SearchBarDesktop maxWidth="580px" />
        </div>

        {/* ICONOS */}
        <div className="flex items-center justify-end gap-4">
          {!isAuthenticated ? (
            <UnauthenticatedPopover />
          ) : (
            <AuthenticatedPopover name={session?.user?.name ?? ''} />
          )}

          <Link href="/listFavorites" className="relative">
            <Heart className="h-6 w-6 cursor-pointer" />

            {!isLoading && favoritesCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 text-xs">
                {favoritesCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpenCart(true)}
            className="relative"
          >
            <ShoppingBag className="h-6 w-6 cursor-pointer" />

            {itemsInCart > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 text-xs">
                {itemsInCart}
              </span>
            )}
          </button>
        </div>
      </div>

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
  )
}

export default HeaderDesktop
