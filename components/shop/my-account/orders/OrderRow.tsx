import { OrderListItem } from '@/src/interface/my-account'
import { formatDate } from '@/src/utils/format-date'
import Link from 'next/link'
import {
    Clock,
    PackageSearch,
    Truck,
    CheckCircle2,
    XCircle,
} from 'lucide-react'

interface Props {
    order: OrderListItem
}

// Un solo lugar para mapear estado -> color e ícono, así es fácil sumar estados nuevos
const STATUS_CONFIG: Record<
    string,
    { label: string; classes: string; Icon: typeof Clock }
> = {
    pendiente: {
        label: 'Pendiente',
        classes: 'bg-amber-50 text-amber-700 border-amber-200',
        Icon: Clock,
    },
    procesando: {
        label: 'Procesando',
        classes: 'bg-blue-50 text-blue-700 border-blue-200',
        Icon: PackageSearch,
    },
    enviado: {
        label: 'Enviado',
        classes: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        Icon: Truck,
    },
    entregado: {
        label: 'Entregado',
        classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        Icon: CheckCircle2,
    },
    cancelado: {
        label: 'Cancelado',
        classes: 'bg-red-50 text-red-700 border-red-200',
        Icon: XCircle,
    },
}

const DEFAULT_STATUS = {
    label: '',
    classes: 'bg-gray-50 text-gray-600 border-gray-200',
    Icon: Clock,
}

const OrderRow = ({ order }: Props) => {
    const statusKey = order.estado.toLowerCase()
    const status = STATUS_CONFIG[statusKey] ?? {
        ...DEFAULT_STATUS,
        label: order.estado,
    }
    const { label, classes, Icon } = status

    return (
        <Link
            href={`/my-account/order/${order.codigo_pedido}`}
            className="flex w-full flex-col gap-4 rounded-sm 
      bg-gray-50 shadow-sm px-4 py-3 transition hover:shadow-md
      sm:flex-row sm:items-center sm:justify-between sm:gap-0"
        >
            {/* LEFT */}
            <div className="flex items-center gap-4">
                <img
                    src={`/images/products/${order.preview.imagen}`}
                    alt=""
                    className="h-14 w-14 flex-shrink-0 rounded-md border object-cover"
                />

                <div className="flex flex-col">
                    <p className='font-medium text-sm md:text-base'>{order.codigo_pedido}</p>
                    <p className="text-xs text-gray-500">
                        {order.items} artículo{order.items > 1 && 's'}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(order.fecha)}</p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full
          border px-2.5 py-1 text-xs font-medium ${classes}`}
                >
                    <Icon size={13} />
                    {label}
                </span>

                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                        S/ {order.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">{order.estado_pago}</p>
                </div>
            </div>
        </Link>
    )
}

export default OrderRow