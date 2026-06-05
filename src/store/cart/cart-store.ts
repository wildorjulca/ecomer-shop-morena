import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartProduct = {
    id?: number
    varianteId: number
    nombre: string
    precio: number
    porcentaje_descuento?: number
    precio_descuento?: number
    en_oferta?: boolean
    cantidad: number
    imagen: string
    color: string
    talla: string
}

interface StoreCart {
    cart: CartProduct[]
    // hasHydrated: boolean

    addProduct: (product: CartProduct) => void
    removeProduct: (varianteId: number) => void
    updateQuantity: (varianteId: number, quantity: number) => void
    getSummaryInformation: () => {
        subTotal: number;
        total: number;
        itemsInCart: number;
    }
    // resetCart: () => void

    // setHasHydrated: (state: boolean) => void
}

export const useCartStore = create<StoreCart>()(
    persist(
        (set, get) => ({
            cart: [],
            addProduct: (product) => {

                const { cart } = get()

                const existingProduct = cart.find(c => c.varianteId === product.varianteId)

                if (!existingProduct) {
                    set({ cart: [...cart, product] })
                    return
                }
                const updateCart = cart.map(cp => {
                    if (cp.varianteId === product.varianteId) {
                        return { ...product, cantidad: product.cantidad }
                    } else {
                        return cp
                    }
                })

                set({ cart: updateCart })
            },
            removeProduct: (varianteId) => {
                const { cart } = get()
                const updateProduct = cart.filter(c => c.varianteId !== varianteId)
                set({ cart: updateProduct })

            },
            updateQuantity: (varianteId, quantity) => {
                const { cart } = get()

                const updateProduct = cart.map(cp =>
                    cp.varianteId === varianteId ?
                        { ...cp, cantidad: quantity }
                        : cp
                )
                set({ cart: updateProduct })
            },
            getSummaryInformation: () => {
                const { cart } = get()

                const { subTotal, itemsInCart } = cart.reduce((acc, product) => {
                    const price = product.en_oferta && product.precio_descuento
                        ? product.precio_descuento
                        : product.precio

                    acc.subTotal += price * product.cantidad
                    acc.itemsInCart += product.cantidad

                    return acc
                }, { subTotal: 0, itemsInCart: 0 })

                return {
                    subTotal,
                    total: subTotal,
                    itemsInCart
                }
            }
        }),
        {
            name: "cart-storage-morena"
        }
    )

)