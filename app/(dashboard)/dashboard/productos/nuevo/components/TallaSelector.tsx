'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useTallas, useVariants } from '@/src/hooks/admin'
import { Talla } from '@/src/hooks/admin/productos/useVariants'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useProductBuilderContext } from './ProductBuilderContext'

interface Props {
  tipoTallas: {
    id: number
    nombre: string
    descripcion?: string | null
  }[];
  // onToggleZises: (talla: Talla) => void;
  // selectedZises: Talla[];
}

const TallaSelector = ({ tipoTallas }: Props) => {

  
  const [tipoTallaId, setTipoTallaId] = useState<number | undefined>()
  const { selectedZises, onToggleZises } = useProductBuilderContext()
  const { data, isLoading, error } = useTallas(tipoTallaId)

  return (
    <div>
      <Card>
        <CardContent className="space-y-4">
          <CardTitle>Tallas</CardTitle>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              Seleccione el tipo de talla *
            </label>

            <select
              value={tipoTallaId ?? ''}
              onChange={e => {
                const value = e.target.value
                console.log(value)
                setTipoTallaId(value ? Number(value) : undefined)
              }}
              className="w-full rounded-md border p-2"
            >
              <option value="">[Seleccione]</option>

              {tipoTallas.map(item => (
                <option
                  key={item.id}
                  value={item.id}
                  title={item.descripcion ?? ''}
                >
                  {item.nombre}
                </option>
              ))}
            </select>

            {/* Descripción */}
            {tipoTallas.find(t => t.id === tipoTallaId)?.descripcion && (
              <p className="text-sm text-muted-foreground">
                {tipoTallas.find(t => t.id === tipoTallaId)?.descripcion}
              </p>
            )}
          </div>

          {/* Resultado de useTallas */}
          {isLoading && <p>Cargando tallas...</p>}

          {error && <p>Ocurrió un error</p>}

          {data && (
            <div className="flex gap-2 items-center">
              {data.map((talla) => {

                const isActive = selectedZises.some(item => item.id === talla.id)

                return (
                  (
                    <button
                      type='button'
                      key={talla.id}
                      onClick={() => onToggleZises(talla)}
                      className={clsx(
                        'w-auto px-3 py-2 flex items-center transition-colors justify-center border cursor-pointer',
                        {
                          "bg-brand text-neutral-50": isActive
                        }
                      )}
                    >
                      {talla.valor}
                    </button>
                  ))
              }
              )
              }

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TallaSelector