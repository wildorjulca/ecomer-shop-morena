import { Order } from "@/src/interface/my-account"
import { formatDate } from "@/src/utils/format-date"
import OrderSummary from "./OrderSummary"

interface Props {
    order: Order
}

const OrderCard = ({ order }: Props) => {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <p className="text-sm text-gray-500">
                        Pedido #{order.codigo_pedido}
                    </p>
                    <p className="text-xs text-gray-400">
                        {formatDate(order.fecha)}
                    </p>
                </div>

                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                    {order.estado}
                </span>
            </div>

            {/* BODY */}
            <div className="flex justify-between items-center gap-4 mt-3">

                {/* PRODUCTOS */}
                <OrderSummary items={order.item} />

                {/* PRECIO + BOTÓN */}
                <div className="flex flex-col items-end gap-2">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-semibold text-gray-800">
                        S/ {order.total.toFixed(2)}
                    </p>

                    <button className="px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-800 transition">
                        Ver detalle
                    </button>
                </div>

            </div>

        </div>
    )
}

export default OrderCard