'use client'

import { useCartStore } from "@/src/store/cart/cart-store"
import { useEffect } from "react"
import CartDrawerEmpty from "./CartDrawerEmpty"
import CartDrawerList from "./CartDrawerList"
import Link from "next/link"
import { Lock, X } from "lucide-react"
import { useCartSummary } from "@/src/hooks"

interface Props {
    isOpen: boolean
    onClose: () => void
}

const CartDrawer = ({ isOpen, onClose }: Props) => {

    // 🔒 bloquear scroll
    useEffect(() => {
        if (isOpen) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

            document.body.style.overflow = "hidden"
            document.body.style.paddingRight = `${scrollBarWidth}px`
        } else {
            document.body.style.overflow = "auto"
            document.body.style.paddingRight = "0px"
        }

        return () => {
            document.body.style.overflow = "auto"
            document.body.style.paddingRight = "0px"
        }
    }, [isOpen])

    const { cart } = useCartStore()
    const { subTotal } = useCartSummary()

    return (
        <>
            {/* Overlay */}
            <div
                className={`
                    fixed inset-0 z-40 bg-black/40
                    transition-opacity duration-300
                    ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`
                    fixed z-50 h-screen  bg-white text-black flex flex-col shadow-2xl transition-all duration-300 ease-in-out
                    
                    /* 📱 MOBILE */
                    top-0 right-0 bottom-0 w-full h-screen rounded-none
                    
                    /* 🖥️ DESKTOP */
                    md:top-16 md:right-2 md:w-[360px] md:h-[80vh] md:rounded-sm
                    
                    ${isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0 pointer-events-none"}
                `}
            >

                {/* 🔺 Flecha (solo desktop) */}
                <div className="hidden md:block absolute -top-2 left-6 w-4 h-4 bg-white rotate-45 border-l border-t" />

                {/* 📱 Header mobile */}
                <div className="flex items-center justify-between p-4 border-b md:hidden">
                    <h2 className="font-semibold text-lg">Mi carrito</h2>
                    <button onClick={onClose} className="text-xl"><X offset={1} /> </button>
                </div>

                {/* Contenido */}
                <div className="flex-1 overflow-y-auto">
                    {cart.length > 0 ? (
                        <CartDrawerList />
                    ) : (
                        <CartDrawerEmpty />
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="shrink-0 p-4 pb-6 bg-white space-y-3 border-t">

                        {/* Subtotal */}
                        <div className="flex justify-between items-center font-semibold text-sm">
                            <h3>Subtotal</h3>
                            <span>S/{subTotal.toFixed(2)}</span>
                        </div>

                        {/* BOTÓN PRINCIPAL */}
                        <Link
                            href={"/checkout-payment"}
                            className="
                                h-12 w-full flex items-center justify-center gap-2
                                bg-[#6A148E] text-white text-base font-semibold
                                rounded-md
                                transition-colors duration-200
                                hover:bg-[#58117A]
                            "
                        >
                            <Lock className="h-4 w-4" />
                            Proceder al pago
                        </Link>

                        {/* BOTÓN SECUNDARIO */}
                        <Link
                            href={"/cart"}
                            className="
                                h-12 w-full flex items-center justify-center
                                border border-[#6A148E] text-[#6A148E]
                                text-base font-semibold
                                rounded-md
                                transition-colors duration-200
                                hover:bg-purple-50
                            "
                        >
                            Ver mi carrito
                        </Link>

                    </div>
                )}

            </div>
        </>
    )
}

export default CartDrawer