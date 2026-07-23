'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  MoreVertical,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

import { toast } from 'sonner'
import { useTransition } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { updateBrandStatus } from '@/actions/admin'
import { Marca } from './columns'

interface Props {
  marca: Marca
  activo: boolean
  onEdit: (marca: Marca) => void
}

export default function MenuActions({ marca, activo, onEdit }: Props) {
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()

  async function toggleStatus() {
    const newStatus = !activo

    startTransition(async () => {
      const res = await updateBrandStatus({
        marcaId: marca.id,
        status: newStatus,
      })

      if (!res.ok) {
        toast.error(res.message)
        return
      }

      queryClient.setQueriesData(
        { queryKey: ["marcas"] },
        (oldData: {
          marcas: Marca[],
          total: number;
          totalPage: number;
        } | undefined) => {

          if (!oldData) return oldData

          return {
            ...oldData,
            marcas: oldData.marcas.map(m =>
              m.id === marca.id ?
                { ...m, activo: newStatus }
                : m)
          }
        })

      toast.success(res.message)
    })
  }

  function handleEdit() {
    toast.info('Editar marca (pendiente)')
  }

  function handleDelete() {
    toast.error('Eliminar marca (pendiente)')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-md hover:bg-muted">
          <MoreVertical className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">

        {/* EDITAR */}
        <DropdownMenuItem onClick={() => onEdit(marca)}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ACTIVAR / DESACTIVAR */}
        <DropdownMenuItem onClick={toggleStatus}>
          {activo ? (
            <>
              <ToggleLeft className="mr-2 h-4 w-4 text-orange-500" />
              Desactivar
            </>
          ) : (
            <>
              <ToggleRight className="mr-2 h-4 w-4 text-green-500" />
              Activar
            </>
          )}
        </DropdownMenuItem>

        {/* ELIMINAR */}
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