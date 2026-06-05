'use client'

import { Search, Heart, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import CartDrawer from "@/components/shop/drawer/cart/CartDrawer";
import UnauthenticatedPopover from "./UnauthenticatedPopover";
import AuthenticatedPopover from "./AuthenticatedPopover";
import SearchBarDesktop from "./SearchBarDesktop";
import { useCartSummary, useCountFavorites } from "@/src/hooks";
import { useCartStore } from "@/src/store/cart/cart-store";
// import { useCartStore } from "@/src/store/cart/cart-store";
// import { useCartSummary } from "@/src/hooks";

interface Props {
  className?: string;
}

const HeaderDesktop = ({ className }: Props) => {


  const { data: favoritesCount = 0, isLoading } = useCountFavorites()
  const { itemsInCart, subTotal } = useCartSummary()

  const [openCart, setOpenCart] = useState(false);
  const { data: session } = useSession();

  const isAuthenticated = !!session;



  return (
    <header className={`fixed top-0 left-0 w-full h-[70px] z-50 bg-[#111111f6] text-white ${className}`}>

      <div className="max-w-[1200px] mx-auto flex items-center h-[70px]">

        {/* LOGO + MENU */}
        <div className="flex items-center">
          <Link href={"/"} className="text-2xl font-bold tracking-widest mr-6 uppercase text-gray-300">
            asos
          </Link>

          <div className="flex h-[50px]">
            <Link href="/Mujer" className="flex items-center px-6 text-sm font-medium border-r border-slate-300">
              MUJER
            </Link>

            <Link href="/Hombre" className="flex items-center px-6 text-sm font-medium">
              HOMBRE
            </Link>
          </div>
        </div>

        {/* SEARCH */}
        <SearchBarDesktop />

        {/* ICONOS */}
        <div className="flex items-center gap-5">

          {!isAuthenticated ? (
            <UnauthenticatedPopover />
          ) : (
            <AuthenticatedPopover name={session?.user?.name ?? ""} />
          )}

          <Link href="/listFavorites" className="relative">
            <Heart className="w-6 h-6 cursor-pointer" />

            {isLoading ? (
              <span className="absolute -top-2 -right-2 w-5 h-4 rounded-full bg-gray-400 animate-pulse" />
            ) : (
              favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 rounded-full">
                  {favoritesCount}
                </span>
              )
            )}
          </Link>





          {/* <ShoppingBag
            onClick={() => setOpenCart(true)}
            className="w-6 h-6 cursor-pointer"
          /> */}
          <div className="relative">
            <ShoppingBag
              onClick={() => setOpenCart(true)}
              className="w-6 h-6 cursor-pointer"
            />

            {itemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 rounded-full">
                {itemsInCart}
              </span>
            )}
          </div>
        </div>

      </div>

      <CartDrawer
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
      />

    </header>
  );
};

export default HeaderDesktop;