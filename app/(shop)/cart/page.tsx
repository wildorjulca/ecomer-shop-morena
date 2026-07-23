import { getCart } from '@/actions/shop'
import { auth } from '@/auth'
import CartList from '@/components/shop/cart/CartList'
import OrderSumary from '@/components/shop/cart/orderSumary'

const CartPage = async () => {

    const session = await auth()

    // const initialCart = session?.user ? await getCart() : null

    // console.log(initialCart)
    // const CartPage = async () => {

    //     const res = await addProductCart({ varianteId: 4127, cantidad: 5 })
    //     console.log(res)

    //     return (
    //         <div className='bg-[#F1F1F1] w-full min-h-screen'>
    //             <CartContainer />
    //         </div>

    //     )
    // }

    // export default CartPage

    return (
        <div className='bg-[#F1F1F1] w-full min-h-screen'>

            <div className="max-w-[1200px] mx-auto w-full mt-8 
                grid grid-cols-1 md:grid-cols-9 gap-6 px-4 md:px-0">

                {/* LEFT */}
                <div className="md:col-span-6">
                    <CartList
                        // initialCart={initialCart}
                        isAuthenticated={!!session?.user}
                    />
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
