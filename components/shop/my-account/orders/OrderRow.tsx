import { Order, OrderListItem } from "@/src/interface/my-account"
import { formatDate } from "@/src/utils/format-date"
import Link from "next/link"

interface Props {
    order: OrderListItem
}

const OrderRow = ({ order }: Props) => {

    console.log(order)

    return (
        <Link href={`/my-account/order/${order.codigo_pedido}`} className="w-ful bg-white  shadow-md border border-gray-200  rounded-sm px-4 py-3 flex items-center justify-between transition">

            {/* LEFT */}
            <div className="flex items-center gap-4">

                {/* IMAGE */}
                <img
                    src={`/images/products/${order.preview.imagen}`}
                    alt=""
                    className="w-14 h-14 object-cover rounded-md border"
                />

                {/* INFO */}
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-800">
                        {order.codigo_pedido}
                    </p>

                    <p className="text-xs text-gray-500">
                        {order.items} artículo{order.items > 1 && 's'}
                    </p>
                </div>
            </div>

            {/* CENTER */}
            <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-800 capitalize">
                    {order.estado}
                </p>
                <p className="text-xs text-gray-500">
                    {formatDate(order.fecha)}
                </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                        S/ {order.total.toFixed(2)}
                    </p>

                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {order.estado_pago}
                    </span>
                </div>

                {/* ACTION */}
                <button className="text-gray-400 hover:text-gray-700 text-xl">
                    ⋯
                </button>
            </div>

        </Link>
    )
}

export default OrderRow