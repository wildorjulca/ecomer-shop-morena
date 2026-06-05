// hooks/useCartSummary.ts
import { useMemo } from "react"
import { useCartStore } from "@/src/store/cart/cart-store"

export const useCartSummary = () => {
    const cart = useCartStore(state => state.cart)

    return useMemo(() => {
        return cart.reduce((acc, product) => {
            const price =
                product.en_oferta && product.precio_descuento
                    ? product.precio_descuento
                    : product.precio

            acc.itemsInCart += product.cantidad
            acc.subTotal += price * product.cantidad

            return acc
        }, { subTotal: 0, itemsInCart: 0 })
    }, [cart])
}