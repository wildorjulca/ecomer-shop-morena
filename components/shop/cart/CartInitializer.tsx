// src/components/cart/CartInitializer.tsx
'use client'

import { useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/src/store/cart/cart-store"

export const CartInitializer = () => {
    const { status } = useSession()
    const { loadCartFromDB } = useCartStore()
    const hasLoaded = useRef(false)

    useEffect(() => {
        if (status === "authenticated" && !hasLoaded.current) {
            hasLoaded.current = true
            loadCartFromDB()
        }

        if (status === "unauthenticated") {
            hasLoaded.current = false
        }
    }, [status, loadCartFromDB])

    return null
}