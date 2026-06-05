import CartList from '@/components/shop/cart/CartList'
import OrderSumary from '@/components/shop/cart/orderSumary'
const CartPage = () => {
    return (
        <div className='bg-[#F1F1F1] w-full min-h-screen'>
            <div className="max-w-[1200px] mx-auto w-full mt-8 
                grid grid-cols-1 md:grid-cols-9 gap-6 px-4 md:px-0">

                {/* LEFT */}
                <div className="md:col-span-6">
                    <CartList />
                </div>

                {/* RIGHT */}
                <div className="md:col-span-3 md:relative fixed bottom-0 left-0 right-0">
                    <OrderSumary />
                </div>

            </div>
        </div>

    )
}

export default CartPage
