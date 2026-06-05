import { getPedidosUserList } from '@/actions/shop/my-account/order'
import OrderCard from '@/components/shop/my-account/orders/OrderCard'
import OrderRow from '@/components/shop/my-account/orders/OrderRow'
import { Search } from 'lucide-react'
import React from 'react'

const MisComprasPage = async () => {

  const response = await getPedidosUserList()

  if (!response.ok) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <p className='text-red-500'>{response.message}</p>
      </div>
    )
  }

  if (response.orders?.length === 0) {
    return (
      <div className='h-full'>
        <h3 className='text-4xl'>Pedidos</h3>
        <div className='flex items-center justify-center w-full h-[60vh]'>
          <p className='text-2xl'>¡Usted todavía no tiene pedidos!</p>
        </div>
      </div>
    )
  }



  const orders = response.orders

  return (
    <div className='w-full'>

      {/* Buscador + Filtro */}
      <div className='flex items-center gap-3'>

        {/* Input */}
        <div className='relative w-72'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />

          <input
            type='text'
            placeholder='Buscar por N° de pedido'
            className='w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:border-transparent text-sm'
          />
        </div>

        {/* Botón filtro */}
        <button className='px-3 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium transition'>
          Filtros
        </button>

      </div>

      <div className='mt-8 flex flex-col gap-3.5'>
        {orders?.map(order => (
          <OrderRow key={order.id} order={order} />
        ))
        }

      </div>

    </div>
  )
}

export default MisComprasPage