'use client'

import { useCartStore } from '@/src/store/cart/cart-store'
import CartList from './CartList'
import OrderSumary from './orderSumary'
import CartEmpty from './CartEmpty'

const CartContainer = () => {
    const { cart } = useCartStore()

    const isEmpty = cart.length === 0

    if (isEmpty) {
        return (
            <div className="max-w-[1200px] mx-auto w-full mt-8 px-4 md:px-0">
                <CartEmpty />
            </div>
        )
    }

    return (
        <div className="max-w-[1200px] mx-auto w-full mt-8 grid grid-cols-1 md:grid-cols-9 gap-6 px-4 md:px-0">
            <div className="md:col-span-6">
                <CartList />
            </div>

            <div className="md:col-span-3 md:relative fixed bottom-0 left-0 right-0">
                <OrderSumary />
            </div>
        </div>
    )
}

export default CartContainer