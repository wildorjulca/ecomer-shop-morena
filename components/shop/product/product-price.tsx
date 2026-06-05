import React from 'react'

interface Props {
    en_oferta: boolean;
    precio_base_venta: number;
    precio_descuento: number;
}
const ProductPrice = ({ en_oferta, precio_base_venta, precio_descuento }: Props) => {

    if (en_oferta) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-sm">
                    S/.{precio_base_venta.toFixed(2)}
                </span>

                <span className="font-semibold text-[#ef5353]">
                    S/.{precio_descuento.toFixed(2)}
                </span>
            </div>
        )
    }

    return (
        <p className='font-semibold'>
            S/.{precio_base_venta.toFixed(2)}
        </p>
    )
}

export default ProductPrice