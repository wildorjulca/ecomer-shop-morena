'use client'
import AddressSection from '@/components/shop/checkout-payment/AddressSection'
import BillingInfo from '@/components/shop/checkout-payment/BillingInfo'
import { OrderSummary } from '@/components/shop/checkout-payment/OrderSummary'
import OrderSummaryProductsDropdown from '@/components/shop/checkout-payment/OrderSummaryProductsDropdown'
import PaymentMethod from '@/components/shop/checkout-payment/PaymentMethod'
import { CheckoutFormInputs } from '@/src/interface'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const CheckoutPaymentPage = () => {

    // Este lo que ase es crear un contexto para el formulario de checkout, asi no tengo que pasar props a los componentes hijos, 
    // y puedo usar el hook de react hook form en cualquier componente hijo del checkout payment, 
    // como el address form o el order summary, para mostrar los datos del formulario o para mostrar errores de validacion, etc.

    const methods = useForm<CheckoutFormInputs>()

    // 🔥 estado global checkout  (Sirvira para disabilitar la card del selecion de direccion porque el pedido ya se creo)
    const [orderCreated, setOrderCreated] =
        useState(false)

    return (
        <FormProvider {...methods}>
            <form className='w-full'>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

                    {/* IZQUIERDA */}
                    <div className='pb-[180px] lg:pb-0'>
                        <AddressSection
                            disabled={orderCreated}
                        />
                        <PaymentMethod />
                        <BillingInfo />
                    </div>

                    {/* DERECHA (tamaño fijo tipo Ripley) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-[70px]">
                            <OrderSummary
                                onOrderCreated={() =>
                                    setOrderCreated(true)
                                }
                            />
                        </div>
                    </div>

                    {/* MOBILE FIXED BOTTOM */}
                    <div
                        className="
                            lg:hidden
                            fixed
                            bottom-0
                            left-0
                            w-full
                            z-50
                            bg-white
                            border-t
                            border-gray-200
                            shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
                            p-4
                        "
                    >
                        <div>
                            <OrderSummaryProductsDropdown
                                onOrderCreated={() =>
                                    setOrderCreated(true)
                                }
                            />
                        </div>

                    </div>

                </div>
            </form>


        </FormProvider>
    )
}

export default CheckoutPaymentPage