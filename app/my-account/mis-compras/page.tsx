import { getPedidosUserList } from '@/actions/shop/my-account/order'
import OrdersList from '@/components/shop/my-account/orders/OrderList'
import React from 'react'

const MisComprasPage = async () => {
  const response = await getPedidosUserList()

  if (!response.ok) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-red-500">{response.message}</p>
      </div>
    )
  }

  if (response.orders?.length === 0) {
    return (
      <div className="h-full">
        <h3 className="text-1xl md:text-4xl">Pedidos</h3>
        <div className="flex h-[60vh] w-full items-center justify-center">
          <p className="text-2xl">¡Usted todavía no tiene pedidos!</p>
        </div>
      </div>
    )
  }

  const orders = response.orders

  return (
    <div className="w-full">
      <h3 className="mb-6 text-4xl">Pedidos</h3>
      <OrdersList orders={orders  || []} />
    </div>
  )
}

export default MisComprasPage