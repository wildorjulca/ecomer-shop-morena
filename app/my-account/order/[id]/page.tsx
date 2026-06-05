import { getDetallePedido } from '@/actions/shop/my-account/order'
import { formatDate } from '@/src/utils/format-date'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    params: Promise<{
        id: string
    }>
}
const OrderIdPage = async ({ params }: Props) => {

    const { id } = await params

    const response = await getDetallePedido(id)


    if (!response.ok) {
        return (
            <div className='w-full flex items-center justify-center'>
                <p className='text-red-500'>
                    {response.message}
                </p>
            </div>
        )
    }

    if (!response.detalle_pedido) {
        return (
            <div className='text-center py-10'>
                <AlertCircle className='mx-auto mb-2 text-gray-400' />
                <p>No se encontró el pedido</p>
            </div>
        )
    }

    const detalle_pedido = response.detalle_pedido
    const direccion = detalle_pedido.direccion


    return (
        <div className='w-full'>
            <div className='w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
                <div>
                    <h3 className='text-2xl md:text-3xl'>Detalle del pedido</h3>
                    <Link className='flex items-center gap-1.5 underline' href={"/my-account/orders"}>
                        <ArrowLeft /> a pedidos
                    </Link>
                </div>

                <div className='text-left md:text-right'>
                    <p className='text-lg md:text-xl'>{detalle_pedido?.codigo}</p>
                    <p className='text-sm md:text-base'>{formatDate(detalle_pedido?.fecha ?? "")}</p>
                </div>
            </div>

            <div className='mt-5 flex w-full flex-col md:flex-row gap-6'>
                {/* Dirección */}
                <div className='bg-white p-5 rounded-xs border shadow-md w-full md:w-1/2'>
                    <h3 className='text-lg md:text-xl'>Dirección</h3>
                    <div className='mt-2 text-sm md:text-base'>
                        <p>{direccion.nombreCompleto}</p>
                        <p>{direccion.region}</p>
                        <p>{direccion.provincia} - {direccion.distrito}</p>
                        <p>{direccion.telefono}</p>
                    </div>
                </div>

                {/* Resumen */}
                <div className='bg-white p-5 rounded-xs border shadow-md w-full md:w-80'>
                    <h3 className='text-lg md:text-xl'>Resumen</h3>
                    <div className='mt-2 text-sm md:text-base'>
                        <div className='flex items-center justify-between w-full'>
                            <p>Subtotal</p>
                            <p>S/ {detalle_pedido.subtotal.toFixed(2)}</p>
                        </div>
                        <div className='flex items-center justify-between w-full'>
                            <p className='font-medium'>Total</p>
                            <p className='font-medium'>S/ {detalle_pedido.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <h3 className='text-xl md:text-2xl'>
                    Productos agregados
                </h3>

                <div className='flex flex-col gap-3 mt-4'>
                    {detalle_pedido.items.map((p) => (
                        <div className='bg-white p-4 md:p-3 rounded-md shadow-sm' key={p.id}>
                            <div className='w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                                {/* Info producto */}
                                <div className='flex gap-3 items-center'>
                                    <div className='w-[50px] h-[50px] md:w-[80px] md:h-[80px] bg-slate-100 relative flex-shrink-0'>
                                        <Image
                                            className='object-contain'
                                            src={`/images/products/${p.imagen}`}
                                            alt={p.nombre}
                                            fill
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <p className='font-medium text-sm md:text-base'>{p.nombre}</p>
                                        <div className='flex gap-2 text-xs md:text-sm text-gray-600'>
                                            <span className="bg-[#D9D9D9] text-gray-700 text-[11px] font-semibold text-center min-w-[80px] px-2 py-[2px] rounded-full">
                                                Color {p.talla}
                                            </span>
                                            <span className="bg-[#D9D9D9] text-gray-700 text-[11px] font-semibold text-center min-w-[80px] px-2 py-[2px] rounded-full">
                                                Color {p.color}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Cantidad y precio */}
                                <div className='flex justify-between md:justify-end md:items-center gap-2 text-sm md:text-base'>
                                    <p>{p.cantidad} ud.</p>
                                    <p className='font-medium'>S/ {p.subtotal.toFixed(2)}</p>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrderIdPage