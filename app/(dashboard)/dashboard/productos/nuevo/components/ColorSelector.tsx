'use client'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useVariants } from '@/src/hooks/admin';
import { Color } from '@/src/hooks/admin/productos/useVariants';
import clsx from 'clsx';
import React from 'react'
import { useProductBuilderContext } from './ProductBuilderContext';

interface Props {
    colores: {
        id: number;
        nombre: string;
        codigo_hex: string | null;
    }[],
    // onToggleColor: (color: Color) => void;
    // selectedColors: Color[];

}

const ColorSelector = ({ colores}: Props) => {

    const { selectedColors, onToggleColor } = useProductBuilderContext()


    return (
        <div>
            <Card>
                <CardContent>
                    <CardTitle>
                        Colores disponibles
                    </CardTitle>
                    <CardDescription>
                        Elige las colores que va a tener tu producto
                    </CardDescription>
                    <div className="flex flex-wrap w-full gap-4 mt-4">
                        {colores.map((c) => {

                            const isActive = selectedColors.some(item => item.id === c.id)

                            return (
                                <div
                                    onClick={() => onToggleColor(c)}
                                    key={c.id}
                                    className={
                                        clsx(
                                            "flex flex-col cursor-pointer items-center justify-center gap-2 border p-2 rounded hover:shadow-lg transition-shadow duration-200",
                                            {
                                                "border-[#6A148E] bg-[#69148e25] border-2 right-2 ring-blue-200": isActive

                                            }
                                        )
                                    }
                                >
                                    <button
                                        type='button'
                                        className="w-8 h-8 rounded-full border border-gray-300 hover:ring-2 hover:ring-offset-1 hover:ring-gray-400 transition-all duration-200"
                                        style={{ backgroundColor: `${c.codigo_hex}` }}
                                        aria-label={c.nombre}
                                    />
                                    <p className="text-sm font-medium text-center">{c.nombre}</p>
                                    <p className="text-xs text-gray-500">{c.codigo_hex}</p>
                                </div>
                            )
                        }
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ColorSelector