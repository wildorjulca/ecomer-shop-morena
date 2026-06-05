import { auth } from '@/auth'
import CheckoutHeader from '@/components/shop/checkout-payment/CheckoutHeader'
import { bodyFont } from '@/config/fonts'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
    children: React.ReactNode
}

const CheckoutPaymentLayout = async ({ children }: Props) => {

    const session = await auth()

    if (!session?.user) {
        redirect("/auth/login?redirectTo=/checkout-payment")
    }

    return (
        <section
            className={`w-full min-h-screen bg-[#F1F1F1] ${bodyFont.className} antialiased`}
        >
            <CheckoutHeader />

            <div className="w-full min-h-screen bg-[#F1F1F1] pt-[80px] pb-[80px]">
                <div className="max-w-[1200px] mx-auto flex px-4 md:px-0">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default CheckoutPaymentLayout