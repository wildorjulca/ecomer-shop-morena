'use client'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { useVariants } from '@/src/hooks/admin'
import { Variante } from '@/src/hooks/admin/productos/useVariants'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { useProductBuilderContext } from './ProductBuilderContext'


interface Props {
    variantes: Variante[];
    // generarVariantes: () => void;
    // eliminarVariante: (variante: Variante) => void;
    // updateStockVariante: (variante: Variante, cantidad: number) => void;
    // updatePriceVariante: (variante: Variante, precio_extra: number) => void;
}

const VariantsTable = () => {

    const { variantes,generarVariantes, eliminarVariante, updateStockVariante, updatePriceVariante  } = useProductBuilderContext()

    return (
        <div>
            <Card>
                <CardContent>

                    {/* Header */}
                    <div className='flex justify-between items-center mb-6'>
                        <div>
                            <CardTitle className="text-lg font-semibold">
                                Variantes del Producto
                            </CardTitle>
                            <CardDescription>
                                {variantes.length} variantes generadas
                            </CardDescription>
                        </div>

                        <button
                            type='button'
                            onClick={generarVariantes}
                            className="hover:bg-gray-100 border transition"
                        >
                            Generar Variantes
                        </button>
                    </div>

                    {/* Tabla */}
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
                                <tr>
                                    <th className="px-4 py-3 text-left">Color</th>
                                    <th className="px-4 py-3 text-left">Talla</th>
                                    <th className="px-4 py-3 text-left">Stock</th>
                                    <th className="px-4 py-3 text-left">Precio Extra</th>
                                    <th className="px-4 py-3 text-center">Acción</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">

                                {variantes.map((item) => (
                                    <tr
                                        key={`${item.colorId}-${item.tallaId}`}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        {/* Color */}
                                        <td className="px-4 py-3 flex items-center gap-3">
                                            <span
                                                className="w-5 h-5 rounded-full border shadow-sm"
                                                style={{ background: item.codigo_hex || "#ccc" }}
                                            />
                                            <span className="font-medium">
                                                {item.color_nombre}
                                            </span>
                                        </td>

                                        {/* Talla */}
                                        <td className="px-4 py-3 text-gray-700">
                                            {item.talla_valor}
                                        </td>

                                        {/* Stock */}
                                        <td className="px-4 py-3 w-32">
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                value={15}
                                                // onChange={(e) =>
                                                //     updateStockVariante(item, +e.target.value)
                                                // }
                                            />
                                        </td>

                                        {/* Precio */}
                                        <td className="px-4 py-3 w-40">
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                                    S/
                                                </span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    className="w-full rounded-md border pl-8 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={item.precio_extra}
                                                    onChange={(e) =>
                                                        updatePriceVariante(item, +e.target.value)
                                                    }
                                                />
                                            </div>
                                        </td>

                                        {/* Acción */}
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                type="button"
                                                onClick={() => eliminarVariante(item)}
                                                className="p-2 rounded-md hover:bg-red-50 transition group"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>



                </CardContent>
            </Card>
        </div>
    )
}

export default VariantsTable