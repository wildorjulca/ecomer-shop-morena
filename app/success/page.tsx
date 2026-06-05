import { getOrderById } from '@/actions/shop/order/order'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SuccessPayment from './ui/SuccessPayment'

interface Props {
  searchParams: Promise<{
    orderId: string

  }>

}
const SuccessPage = async ({ searchParams }: Props) => {

  const { orderId } = await searchParams


  const response = await getOrderById(Number(orderId))

  if (!response.ok) {
    <div className='w-full flex items-center justify-center'>
      <h3>{response.message}</h3>
    </div>
  }


  const pedido = response.pedido

  if (!pedido) {
    return (
      <div className='w-full flex justify-center items-center h-full'>
        <h3>No se econtro su pedido</h3>
      </div>
    )
  }
  return (
    <div className='w-full min-h-screen bg-[#F1F1F1]'>
      <div className='max-w-2xl mx-auto py-8'>

        <SuccessPayment
          pedido={pedido}
        />
        {pedido?.items && pedido.items.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Productos</h2>
            <div className="space-y-4">
              {pedido.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <div className='relative w-20 h-20 bg-gray-200 rounded-sm'>
                    <Image
                      src={`/images/products/${item.img}`}
                      alt={item.nombre}
                      fill
                      className="object-contain"
                    />
                  </div>


                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.nombre}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Color: {item.color} • Talla: {item.talla}
                    </p>
                    <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      S/ {item.subtotal.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      S/ {(item.subtotal / item.cantidad).toFixed(2)} c/u
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔘 Acciones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/my-account/mis-compras"
            className="flex-1 bg-[#6A148E] text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-[#7b1fa2] transition-colors"
          >
            Ver mis pedidos
          </Link>
          <Link
            href="/"
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-300 transition-colors"
          >
            Seguir comprando
          </Link>
        </div>

        {/* 📞 Contacto */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            ¿Tienes alguna pregunta?{' '}
            <a href="mailto:soporte@zuelaamazonica.com" className="text-blue-600 hover:underline">
              Contáctanos
            </a>
          </p>
          <p className="mt-1">
            Teléfono: <span className="font-semibold">+51 999 555 123</span>
          </p>
        </div>
      </div>


    </div>
  )
}

export default SuccessPage