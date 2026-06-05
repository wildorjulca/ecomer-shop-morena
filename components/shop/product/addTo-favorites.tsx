'use client'

import { addToFavorites } from '@/actions/shop/product/addToFavorites'
import { useLoader } from '@/components/provider/LoaderProvider'
import { ProductSlug } from '@/src/interface/ProductSlug'
import { useQueryClient } from '@tanstack/react-query'
import { HeartIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
    product: ProductSlug,
    isFavorite: boolean   // TODO: recibara como props  si en caso esta coom favorito
}
const AddTofavorites = ({ product, isFavorite }: Props) => {
    const queryClient = useQueryClient()
    const { setLoading } = useLoader()
    const [favorite, setFavorite] = useState(isFavorite)

    const handleAddToFavorites = async () => {
        setLoading(true)
        try {
            const res = await addToFavorites(product.id)

            // 🔥 SOLO cambia si el servidor respondió OK
            if (res?.ok) {
                setFavorite(prev => !prev)
                queryClient.invalidateQueries({ queryKey: ["favorites-count"] })
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <button
                className="absolute flex items-center rounded-full justify-center top-2 right-2 bg-white z-10 w-[35px] h-[35px]"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleAddToFavorites()
                }}
            >
                {
                    favorite ? (
                        <HeartIcon size={20} strokeWidth={1} fill='#6A148E' />
                    ) : (
                        <HeartIcon size={20} strokeWidth={1} className="text-gray-600" />
                    )
                }

            </button>
        </>
    )
}

export default AddTofavorites