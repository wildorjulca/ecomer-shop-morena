'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { updateBrandStatus } from '@/actions/admin'
import { Categoria } from '../dashboard/categorias/columns'

interface Props {
  categoria: Categoria
}

export default function MenuActions({ categoria }: Props) {
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()

  async function toggleStatus() {
    const newStatus = !categoria.activo

    startTransition(async () => {
      const res = await updateBrandStatus({
        marcaId: categoria.id,
        status: newStatus,
      })

      if (!res.ok) {
        toast.error('Error', {
          description: res.message,
        })
        return
      }

      // 🔥 update cache SOLO esa fila
      // queryClient.setQueriesData(
      //   { queryKey: ['brands'] },
      //   (old: any) => {
      //     if (!old) return old

      //     return {
      //       ...old,
      //       brands: old.brands.map((b: any) =>
      //         b.id === marcaId
      //           ? { ...b, activo: newStatus }
      //           : b
      //       ),
      //     }
      //   }
      // )

      toast.success(
        newStatus
          ? 'Marca activada'
          : 'Marca desactivada',
        {
          description: res.message,
        }
      )
    })
  }

  function handleDelete() {
    toast.error('Eliminar marca', {
      description: 'Esta acción aún no está implementada',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-md hover:bg-muted">
          <MoreVertical className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={toggleStatus}>
          {categoria.activo ? 'Desactivar' : 'Activar'}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}