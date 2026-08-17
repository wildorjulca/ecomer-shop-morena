'use client'

import { useMemo, useState } from 'react'
import { Search, SearchX } from 'lucide-react'
import OrderRow from './OrderRow'
import { OrderListItem } from '@/src/interface/my-account'

interface Props {
  orders: OrderListItem[]
}

const STATUS_FILTERS = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'procesando', label: 'Procesando' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregado', label: 'Entregado' },
  { value: 'cancelado', label: 'Cancelado' },
]

const OrdersList = ({ orders }: Props) => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  // Solo mostramos como chip los estados que realmente existen en los pedidos del usuario
  const availableStatuses = useMemo(() => {
    const present = new Set(orders.map((o) => o.estado.toLowerCase()))
    return STATUS_FILTERS.filter(
      (f) => f.value === 'todos' || present.has(f.value)
    )
  }, [orders])

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase()

    return orders.filter((order) => {
      const matchesSearch =
        term === '' || order.codigo_pedido.toLowerCase().includes(term)
      const matchesStatus =
        statusFilter === 'todos' || order.estado.toLowerCase() === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [orders, search, statusFilter])

  return (
    <div className="w-full">
      {/* Buscador + Filtros */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full sm:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por N° de pedido"
            className="w-full rounded-lg border border-gray-300 py-2.5
            pl-10 pr-3 text-sm focus:border-gray-400 focus:outline-none
            focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {availableStatuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setStatusFilter(status.value)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium
              transition ${
                statusFilter === status.value
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="mt-6 flex flex-col gap-3.5">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-16 text-center">
            <SearchX className="text-gray-300" size={32} />
            <p className="text-sm font-medium text-gray-700">
              No encontramos pedidos que coincidan
            </p>
            <p className="text-xs text-gray-400">
              Probá con otro N° de pedido o cambiá el filtro de estado
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  )
}

export default OrdersList