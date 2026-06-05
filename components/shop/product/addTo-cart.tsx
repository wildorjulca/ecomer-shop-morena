// import { Button } from '@/components/ui/button'
// import { Spinner } from '@/components/ui/spinner'
import { MinusCircle, PlusCircleIcon } from 'lucide-react'

interface Props {
    className?: string;
    loadingStock?: boolean
    handleAddToCart?: () => void
    quantity: number
    onValueQuantityChanged: (value: number) => void

}

const AddToCart = ({ className, loadingStock, handleAddToCart, quantity, onValueQuantityChanged }: Props) => {
    return (
        <div className={`w-full flex flex-col ${className}`}>
            <div className='mb-4'>
                <h3 className='text-sm font-semibold'>Cantidad</h3>
                <div className='flex items-center gap-5 mt-2'>
                    <button
                        onClick={() => onValueQuantityChanged(-1)}
                        className='w-[28px] flex justify-center items-center hover:cursor-pointer'>
                        <MinusCircle size={28} />
                    </button>
                    <span className='text-[20px]'>
                        {quantity}
                    </span>
                    <button
                        onClick={() => onValueQuantityChanged(+1)}
                        className='w-[28px] flex justify-center items-center hover:cursor-pointer'>
                        <PlusCircleIcon size={28} />
                    </button>
                </div>

            </div>
            <div className='mt-4'>
                <button
                    disabled={loadingStock}
                    className={`bg-[#6A148E] hover:bg-[#58117A] transition text-white px-4 py-3 w-full rounded-sm flex justify-center items-center
        ${loadingStock ? "opacity-70 cursor-not-allowed" : ""}
    `}
                    onClick={handleAddToCart}
                >
                    {loadingStock ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                            Verificando stock...
                        </span>
                    ) : (
                        "Agregar a la bolsa"
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddToCart