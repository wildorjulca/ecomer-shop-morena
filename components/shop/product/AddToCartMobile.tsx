'use client'

import { MinusCircle, PlusCircleIcon } from 'lucide-react'

interface Props {
    className: string;
    loadingStock?: boolean
    handleAddToCart?: () => void
    quantity: number
    onValueQuantityChanged: (value: number) => void
}

const AddToCartMobile = ({
    className,
    loadingStock,
    handleAddToCart,
    quantity,
    onValueQuantityChanged
}: Props) => {
    return (
        <div className={`fixed bottom-0 left-0 z-50 bg-white  p-3 ${className}`}>

            <div className="flex items-center justify-between gap-3">

                {/* 🔢 CANTIDAD */}
                <div className="flex items-center gap-3">
                    <button onClick={() => onValueQuantityChanged(-1)}>
                        <MinusCircle size={24} />
                    </button>

                    <span className="text-lg font-semibold">
                        {quantity}
                    </span>

                    <button onClick={() => onValueQuantityChanged(1)}>
                        <PlusCircleIcon size={24} />
                    </button>
                </div>

                {/* 🛒 BOTÓN */}
                <button
                    disabled={loadingStock}
                    onClick={handleAddToCart}
                    className={`flex-1 ml-3 py-3 text-sm font-medium rounded-md text-white
            bg-[#6A148E] hover:bg-[#58117A] transition
            ${loadingStock ? "opacity-70 cursor-not-allowed" : ""}
          `}
                >
                    {loadingStock ? 'Verificando...' : 'Agregar'}
                </button>

            </div>
        </div>
    )
}

export default AddToCartMobile