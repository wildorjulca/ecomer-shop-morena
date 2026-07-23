'use client'

import {  useCartStore } from '@/src/store/cart/cart-store'
import CartItem from './CartItem'

interface Props {
    // initialCart: CartProduct[] | null
    isAuthenticated: boolean
}

const CartList = ({  isAuthenticated }: Props) => {

    const { cart } = useCartStore()

    const itemsInCart = cart.reduce((acc, item) => acc + item.cantidad, 0)


    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Carro</h3>
                <span className="text-gray-500">
                    {itemsInCart === 1 ? '(1 Producto)' : `(${itemsInCart} Productos)`}
                </span>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">

                <div className="p-3 border-b border-gray-300">
                    <p className="text-sm">
                        Vendedor por <span className="font-medium text-black">_faldella</span>
                    </p>
                </div>

                {cart.map((c) => (
                    <CartItem key={c.varianteId} item={c} />
                ))}
            </div>
        </div>
    )
}

export default CartList