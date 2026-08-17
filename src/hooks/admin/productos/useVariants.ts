'use client'

import { useState } from "react";

export interface Color {
    id: number;
    nombre: string;
    codigo_hex: string | null;
}

export interface Talla {
    id: number;
    valor: string;
}

export interface Variante {
    colorId: number,
    codigo_hex: string | null;
    color_nombre: string;

    tallaId: number;
    talla_valor: string;

    precio_extra: number;
    cantidad_stock: number; //!! Stock
}

export const useVariants = () => {

    const [selectedColors, setSelectedColors] = useState<Color[]>([]);
    const [selectedZises, setSelectedZises] = useState<Talla[]>([]);
    const [variantes, setvariantes] = useState<Variante[]>([])




    const onToggleColor = (color: Color) => {
        setSelectedColors((prev) =>
            prev.some(item => item.id === color.id)
                ? prev.filter(c => c.id !== color.id)
                : [...prev, color]

        )

    }


    const onToggleZises = (talla: Talla) => {

        setSelectedZises((prev) =>
            prev.some(item => item.id === talla.id)
                ? prev.filter((t) => t.id !== talla.id)
                : [...prev, talla]

        )

    }


    const generarVariantes = () => {

        const nuevasVariantes: Variante[] = []

        selectedColors.forEach(color => {
            selectedZises.forEach(talla => {

                nuevasVariantes.push({
                    colorId: color.id,
                    codigo_hex: color.codigo_hex,
                    color_nombre: color.nombre,
                    tallaId: talla.id,
                    talla_valor: talla.valor,
                    precio_extra: 0,
                    cantidad_stock: 0,
                })

            });

        });

        setvariantes(nuevasVariantes)

    }

    const eliminarVariante = (variante: Variante) => {

        const updateVariante = variantes.filter(v => !(v.colorId === variante.colorId && v.tallaId === variante.tallaId))
        setvariantes(updateVariante)


    }

    const updateStockVariante = (variante: Variante, quantity: number) => {

        setvariantes(prev =>
            prev.map((item) =>
                item.colorId === variante.colorId && item.tallaId === variante.tallaId
                    ? { ...item, cantidad_stock: quantity }
                    : item
            )
        )
    }

    const updatePriceVariante = (variante: Variante, precio_extra: number) => {

        setvariantes((prev) =>
            prev.map((item) =>
                item.colorId === variante.colorId && item.tallaId === variante.tallaId
                    ? { ...item, precio_extra: precio_extra }
                    : item

            )
        )

    }


    return {
        onToggleColor,
        onToggleZises,

        selectedColors,
        selectedZises,

        variantes,
        generarVariantes,

        eliminarVariante,
        updateStockVariante,
        updatePriceVariante

    }


}