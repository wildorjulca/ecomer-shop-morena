import { OrderItem as OrderItemType } from '@/src/interface/my-account'
import React from 'react'

interface Props {
    orderItem: OrderItemType
}
const OrderItem = ({ orderItem }: Props) => {
    return (
        <div>
            <p className='text-sm'>
                {orderItem.nombre}
                <span className="bg-[#D9D9D9] text-gray-700 text-[11px] font-semibold text-center min-w-[80px] px-2 py-[2px] rounded-full">
                    Talla {orderItem.talla}
                </span>
                <span className="bg-[#D9D9D9] text-gray-700 text-[11px] font-semibold text-center min-w-[80px] px-2 py-[2px] rounded-full">
                    Color {orderItem.color}
                </span>
            </p>
        </div>

    )
}

export default OrderItem