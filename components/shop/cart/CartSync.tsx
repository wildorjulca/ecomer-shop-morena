"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/src/store/cart/cart-store"

export function CartSync() {
    const { status } = useSession()

    const {
        hasHydrated,
        pendingGuestMerge,
        syncCartAfterLogin,
        loadCartFromDB,
    } = useCartStore()

    useEffect(() => {
        useCartStore.persist.rehydrate()
    }, [])

    useEffect(() => {
        if (!hasHydrated) return
        if (status !== "authenticated") return

        // Ya no hace falta un ref acá: el candado real está en el store
        // (mergeEnCurso), que protege contra duplicados sin importar
        // cuántas instancias de CartSync estén montadas.
        if (pendingGuestMerge) {
            syncCartAfterLogin()
        } else {
            loadCartFromDB()
        }
    }, [hasHydrated, status, pendingGuestMerge, syncCartAfterLogin, loadCartFromDB])

    return null
}