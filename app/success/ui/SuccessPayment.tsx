'use client'

import { pedido_estado, pedido_estado_pago } from '@/generated/prisma/enums'
import Lottie from "lottie-react"
import successPaymentAnimation from '@/public/success.json'

interface Props {
    pedido: {
        id: number
        codido_pedido: string
        estado_pedido: pedido_estado | null
        estado_pago: pedido_estado_pago | null
        // metodo_pago: pedido_metodo_pago | null
        total: number
        items: {
            id: number
            nombre: string
            descripcion: string | null
            subtotal: number
            cantidad: number
            color: string
            talla: string
            img: string
        }[]
    }
}
const SuccessPayment = ({ pedido }: Props) => {
    // 🎯 Configuración de estados del pedido
    const estadoPedidoConfig = {
        pendiente: { color: 'bg-yellow-100 text-yellow-700', label: 'Pendiente' },
        confirmado: { color: 'bg-blue-100 text-blue-700', label: 'Confirmado' },
        preparando: { color: 'bg-purple-100 text-purple-700', label: 'En preparación' },
        enviado: { color: 'bg-indigo-100 text-indigo-700', label: 'Enviado' },
        entregado: { color: 'bg-green-100 text-green-700', label: 'Entregado' },
        cancelado: { color: 'bg-red-100 text-red-700', label: 'Cancelado' },
    }[pedido.estado_pedido || 'pendiente']


    // 💳 Configuración de estados del pago
    const estadoPagoConfig = {
        pendiente: { color: 'bg-yellow-100 text-yellow-700', label: 'Pago pendiente' },
        pagado: { color: 'bg-green-100 text-green-700', label: 'Pago confirmado' },
        rechazado: { color: 'bg-red-100 text-red-700', label: 'Pago rechazado' },
        reembolsado: { color: 'bg-gray-100 text-gray-700', label: 'Reembolsado' },
    }[pedido.estado_pago || 'pendiente']

    // 💰 Configuración de método de pago
    // const metodoPagoLabel = {
    //     tarjeta: 'Tarjeta de crédito/débito',
    //     yape: 'Yape',
    //     plin: 'Plin',
    //     transferencia: 'Transferencia bancaria',
    //     contra_entrega: 'Contra entrega',
    //     mercado_pago: 'Mercado Pago',
    //     paypal: 'PayPal',
    // }[pedido.metodo_pago || 'tarjeta']


    return (
        <div>
            {/* ✅ Encabezado */}
            <div className="text-center mb-12 flex flex-col items-center">

                {/* ICONO GRANDE */}
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Lottie
                        animationData={successPaymentAnimation}
                        loop={false}
                        className="w-24"
                    />
                </div>

                {/* TITULO */}
                <h1 className="text-4xl font-bold text-gray-900">
                    ¡Pedido Confirmado!
                </h1>

                {/* SUBTEXTO */}
                <p className="mt-3 max-w-md">
                    Hemos recibido tu pedido correctamente y ya estamos procesándolo.
                </p>

            </div>
            {pedido.estado_pago === 'pagado' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-green-900 mb-2">
                        🎉 ¡Gracias por tu compra!
                    </h3>
                    <p className="text-sm text-green-800">
                        Gracias por confiar en <span className="font-semibold">ASOS</span>.
                        Te enviaremos un correo con los detalles de tu pedido y recibirás actualizaciones sobre su estado.
                    </p>
                </div>
            )}

            {pedido.estado_pago === 'pendiente' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-yellow-900 mb-2">⏳ Pago pendiente</h3>
                    <p className="text-sm text-yellow-800">
                        Estamos procesando tu pago. Te notificaremos cuando se confirme.
                    </p>
                </div>
            )}

            {pedido.estado_pago === 'rechazado' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-red-900 mb-2">❌ Pago rechazado</h3>
                    <p className="text-sm text-red-800">
                        Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
                    </p>
                </div>
            )}

            {/* 🧾 Resumen del pedido */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Código de pedido:</span>
                        <span className="font-semibold">{pedido.codido_pedido}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Método de pago:</span>
                        {/* <span className="font-semibold">{metodoPagoLabel}</span> */}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Estado del pedido:</span>
                        <span className={`text-sm px-3 py-1 rounded-full font-semibold ${estadoPedidoConfig.color}`}>
                            {estadoPedidoConfig.label}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Estado del pago:</span>
                        <span className={`text-sm px-3 py-1 rounded-full font-semibold ${estadoPagoConfig.color}`}>
                            {estadoPagoConfig.label}
                        </span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between text-lg">
                            <span className="text-gray-900 font-semibold">Total:</span>
                            <span className="text-green-600 font-bold">
                                S/ {pedido.total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPayment