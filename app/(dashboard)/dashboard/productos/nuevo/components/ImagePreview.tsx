'use client'

import { ImageColorItem } from '@/src/hooks/admin/productos/useImageManager'
import { Check, Edit2, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
    imagen: ImageColorItem
    onDelete?: (image_id: string) => void
    onSetPrincipal?: (id: string) => void
    // onUpdate?: (id: string, file: File) 
    handleUpdateImage?: (imagen_id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImagePreview = ({
    imagen,
    onDelete,
    // onUpdate
    handleUpdateImage,
    onSetPrincipal,
    //   onUpdate,
}: Props) => {

    //   const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0]
    //     if (!file) return
    //     onUpdate?.(imagen.id, file)
    //   }

    return (
        <div className="relative h-44 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">

            {/* Imagen */}
            <Image
                src={imagen.url_imagen}
                alt="Imagen producto"
                fill
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay suave */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

            {/* Imagen principal badge */}
            {imagen.es_principal && (
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
                    <Check size={14} />
                    Principal
                </div>
            )}

            {/* Botón eliminar */}
            <button
                type='button'
                onClick={() => onDelete?.(imagen.imagen_id)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-red-500 hover:text-white"
            >
                <Trash2 size={16} />
            </button>

            {/* Acciones inferiores */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition">

                {/* Cambiar imagen */}
                <label className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition">
                    <Upload size={16} />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpdateImage?.(imagen.imagen_id, e)}
                    />
                </label>

                {/* Marcar como principal */}
                <button
                    type='button'
                    onClick={() => onSetPrincipal?.(imagen.imagen_id)}
                    className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition"
                >
                    <Edit2 size={16} />
                </button>

            </div>
        </div>
    )
}

export default React.memo(ImagePreview)