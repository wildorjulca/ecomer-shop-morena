'use client'

import { pedido_estado } from '@/generated/prisma/enums'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  MoreVertical,
  Eye,
  Pencil,
  ArrowRightCircle,
  XCircle,
} from 'lucide-react'
import { updateOrderStatus } from '@/actions/admin'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Orders } from './columns'

interface Props {
  pedidoId: number
  estado_pedido: pedido_estado
}

const estadoLabels: Record<pedido_estado, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  preparando: 'Preparando',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
}

const estadoTransitions: Record<
  pedido_estado,
  pedido_estado[]
> = {
  pendiente: ['confirmado'],
  confirmado: ['preparando'],
  preparando: ['enviado'],
  enviado: ['entregado'],
  entregado: [],
  cancelado: [],
}

export default function MenuActions({
  pedidoId,
  estado_pedido,
}: Props) {


  const queryClient = useQueryClient()

  const nextStates =
    estadoTransitions[estado_pedido]

  const isFinished =
    estado_pedido === 'entregado' ||
    estado_pedido === 'cancelado'


  async function changeStatus(
    estado: pedido_estado
  ) {

    console.log({ estado })
    const res = await updateOrderStatus({
      estado,
      orderId: pedidoId,
    })

    if (!res.ok) {
      toast.error('Error al actualizar el estado', {
        description: res.message,
      })

      return
    }

    queryClient.setQueriesData(
      { queryKey: ['orders'] },
      (oldData: {
        orders: Orders[]
        total: number
        totalPage: number
      } | undefined) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          orders: oldData.orders.map(order =>
            order.id === pedidoId
              ? {
                ...order,
                estado_pedido: estado,
              }
              : order
          ),
        }
      }
    )
    toast.success('Estado actualizado', {
      description: res.message,
    })
    // window.location.reload()

  }

  async function cancelOrder() {
    try {

      await fetch(
        `/api/orders/${pedidoId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            estado: 'cancelado',
          }),
        }
      )

      window.location.reload()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-2 hover:bg-muted">
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-white border-none"
      >

        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          Ver detalle
        </DropdownMenuItem>

        {!isFinished && (
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            Editar pedido
          </DropdownMenuItem>
        )}

        {!isFinished && nextStates.length > 0 && (
          <DropdownMenuSub>

            <DropdownMenuSubTrigger>
              <ArrowRightCircle className="mr-2 h-4 w-4" />
              Cambiar estado
            </DropdownMenuSubTrigger>

            <DropdownMenuSubContent>

              {nextStates.map((estado) => (
                <DropdownMenuItem
                  key={estado}
                  onClick={() =>
                    changeStatus(estado)
                  }
                >
                  {estadoLabels[estado]}
                </DropdownMenuItem>
              ))}

            </DropdownMenuSubContent>

          </DropdownMenuSub>
        )}

        {!isFinished && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={cancelOrder}
              className="text-red-600 focus:text-red-600"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancelar pedido
            </DropdownMenuItem>
          </>
        )}

      </DropdownMenuContent>

    </DropdownMenu>
  )
}