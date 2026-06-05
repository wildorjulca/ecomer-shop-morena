'use client'

import { useCartStore } from '@/src/store/cart/cart-store'
import CartDrawerItem from './CartDrawerItem'

const CartDrawerList = () => {

    const { cart } = useCartStore()

    return (
        <div className="flex flex-col h-full bg-[#F1F1F1]">

            {/* Header */}
            <div className="text-xs py-3 text-center font-semibold border-b-4 border-b border-b-[#6A148E] bg-[#F1F1F1]">
                <h3>
                    Tienes agregado {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
                </h3>
            </div>

            {/* Lista SCROLLABLE */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {cart.map(item => (
                    <CartDrawerItem key={item.varianteId} item={item} />
                ))}
            </div>

        </div>
    )
}

export default CartDrawerList