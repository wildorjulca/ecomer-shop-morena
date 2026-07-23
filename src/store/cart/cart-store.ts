import { create } from "zustand"
import { persist } from "zustand/middleware"

import { getFinalPrice } from "@/src/utils/cart-price"
import { getCart, mergeCart } from "@/actions/shop"
import { CartProduct } from "@/src/interface/cart"

/**
 * ============================================================================
 * Store del carrito de compras (Zustand + persist en localStorage)
 * ============================================================================
 *
 * Reglas de negocio:
 * - INVITADO: este store (+ localStorage) es la única fuente de verdad.
 * - AUTENTICADO: la fuente de verdad es la base de datos. El store solo
 *   refleja lo que la BD devuelve (`syncCartAfterLogin` / `loadCartFromDB`).
 *
 * `pendingGuestMerge`
 * -------------------
 * true  -> hay cambios de invitado sin fusionar con la BD todavía.
 * false -> no hay nada pendiente (carrito vacío o ya fusionado antes).
 *
 * Se prende SOLO desde componentes que mutan el carrito mientras NO hay
 * sesión (ver ProductVariants.tsx). Se apaga automáticamente cuando el
 * store termina de sincronizar con la BD (syncCartAfterLogin/loadCartFromDB).
 *
 * `hasHydrated`
 * -------------
 * true una vez que zustand-persist terminó de leer localStorage. Como
 * usamos `skipHydration: true`, la lectura NO es automática — hay que
 * dispararla manualmente (ver CartSync) y esperar a que este flag pase
 * a true antes de confiar en `cart` o `pendingGuestMerge`.
 */

interface CartState {
    cart: CartProduct[]
    isSyncing: boolean
    pendingGuestMerge: boolean
    hasHydrated: boolean
}

interface CartActions {
    addProduct: (product: CartProduct) => void
    removeProduct: (varianteId: number) => void
    updateQuantity: (varianteId: number, cantidad: number) => void
    getSummaryInformation: () => {
        subTotal: number
        total: number
        itemsInCart: number
    }
    clearLocalCart: () => void

    /** Llamar SOLO cuando el usuario NO está autenticado y mutó el carrito. */
    markPendingGuestMerge: () => void

    /** Fusiona el carrito local (invitado) con la BD. Apaga pendingGuestMerge. */
    syncCartAfterLogin: () => Promise<void>

    /** Reemplaza el carrito local por el de la BD, sin fusionar nada. */
    loadCartFromDB: () => Promise<void>

    /** Usado internamente por onRehydrateStorage, no llamar manualmente. */
    setHasHydrated: (state: boolean) => void
}

type CartStore = CartState & CartActions


// Candado a nivel de módulo, NO dentro del estado de zustand.
// Es clave que esté afuera: una variable de módulo se actualiza de forma
// inmediata y síncrona, sin pasar por el ciclo de render de React. Así,
// aunque CartSync esté montado dos veces (por error, o por Strict Mode),
// la segunda llamada ve el candado ya cerrado ANTES de que la primera
// llegue a tocar la red.
let mergeEnCurso = false

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            isSyncing: false,
            pendingGuestMerge: false,
            hasHydrated: false,

            addProduct: (product) => {
                const { cart } = get()
                const yaExiste = cart.some((item) => item.varianteId === product.varianteId)

                set({
                    cart: yaExiste
                        ? cart.map((item) =>
                            item.varianteId === product.varianteId
                                ? { ...product, cantidad: product.cantidad }
                                : item
                        )
                        : [...cart, product],
                })
            },

            removeProduct: (varianteId) => {
                set({ cart: get().cart.filter((item) => item.varianteId !== varianteId) })
            },

            updateQuantity: (varianteId, cantidad) => {
                if (cantidad <= 0) return
                set({
                    cart: get().cart.map((item) =>
                        item.varianteId === varianteId ? { ...item, cantidad } : item
                    ),
                })
            },

            getSummaryInformation: () => {
                const { subTotal, itemsInCart } = get().cart.reduce(
                    (acc, product) => {
                        acc.subTotal += getFinalPrice(product) * product.cantidad
                        acc.itemsInCart += product.cantidad
                        return acc
                    },
                    { subTotal: 0, itemsInCart: 0 }
                )
                return { subTotal, total: subTotal, itemsInCart }
            },

            clearLocalCart: () => set({ cart: [], pendingGuestMerge: false }),

            markPendingGuestMerge: () => set({ pendingGuestMerge: true }),

            syncCartAfterLogin: async () => {
                // Doble candado:
                // 1) mergeEnCurso (módulo): bloqueo síncrono inmediato para
                //    evitar que una segunda llamada concurrent llegue antes
                //    del primer await.
                // 2) set pendingGuestMerge: false de forma síncrona ANTES del
                //    primer await, de modo que si el efecto de CartSync re-corre
                //    (Strict Mode, cambio de dependencias, etc.) ya no vea el
                //    flag activo y no vuelva a entrar a esta rama.
                if (mergeEnCurso) return
                mergeEnCurso = true

                // Capturamos el carrito ANTES de apagar el flag para no perder
                // los datos que hay que fusionar.
                const { cart } = get()

                // Apagar pendingGuestMerge de forma síncrona, antes de cualquier
                // await. Así cualquier re-ejecución del efecto ya verá false y
                // tomará la rama loadCartFromDB (que está protegida por mergeEnCurso).
                set({ isSyncing: true, pendingGuestMerge: false })

                try {
                    if (cart.length > 0) {
                        const lineasParaFusionar = cart.map((item) => ({
                            varianteId: item.varianteId,
                            cantidad: item.cantidad,
                        }))
                        await mergeCart(lineasParaFusionar)
                    }

                    const carritoBD = await getCart()
                    set({ cart: carritoBD })
                } catch (error) {
                    console.error("[cart-store] Error en syncCartAfterLogin:", error)
                } finally {
                    set({ isSyncing: false })
                    mergeEnCurso = false // se libera para la próxima sesión
                }
            },

            loadCartFromDB: async () => {
                if (mergeEnCurso) return
                mergeEnCurso = true

                set({ isSyncing: true })
                try {
                    const carritoBD = await getCart()
                    set({ cart: carritoBD, pendingGuestMerge: false })
                } catch (error) {
                    console.error("[cart-store] Error en loadCartFromDB:", error)
                } finally {
                    set({ isSyncing: false })
                    mergeEnCurso = false
                }
            },

            setHasHydrated: (state) => set({ hasHydrated: state }),
        }),
        {
            name: "cart-storage-morena",
            skipHydration: true, // hidratamos manualmente desde CartSync
            partialize: (state) => ({
                cart: state.cart,
                pendingGuestMerge: state.pendingGuestMerge,
                // hasHydrated NO se persiste: es efímero, nace en false
                // en cada carga de página y se recalcula al hidratar.
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            },
        }
    )
)