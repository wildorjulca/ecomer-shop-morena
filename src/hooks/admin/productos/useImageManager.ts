'use client'

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export type ImageColorItem = {
    imagen_id: string; //!! Solo para eleminar la imagen
    // producto_id: number;
    color_id: number;
    url_imagen: string;
    publicId: string;
    orden?: number;
    es_principal?: boolean

}


export const useImageManager = () => {


    const [imagenesPorColor, setImagenesPorColor] = useState<ImageColorItem[]>([])

    // ✅ NUEVO: agregar imagen desde Cloudinary
    const agregarImagenCloudinary = (
        color_id: number,
        secure_url: string,
        public_id: string
    ) => {
        setImagenesPorColor(prev => {
            // evitar duplicados
            const exists = prev.some(img => img.publicId === public_id)

            if (exists) return prev

            const imagenesDelColor = prev.filter(i => i.color_id === color_id)

            return [
                ...prev,
                {
                    imagen_id: uuidv4(),
                    color_id,
                    url_imagen: secure_url,
                    publicId: public_id,
                    orden: imagenesDelColor.length + 1,
                    es_principal: imagenesDelColor.length === 0,
                },
            ]
        })
    }



    const subirImagenesColor = (color_id: number, e: React.ChangeEvent<HTMLInputElement>) => {

        const files = Array.from(e.target.files || []);

        if (files.length === 0) {
            console.warn("No se selecionaron archivos de imagen para esa color")
        }

        const imagesMap: ImageColorItem[] = files.map((f) => {
            return {
                imagen_id: uuidv4(),
                color_id: color_id,
                url_imagen: URL.createObjectURL(f),
                publicId: ""
                // publicId:
                // es_principal: 
            }
        })

        // 🔥 Agregar sin borrar las anteriores
        setImagenesPorColor((prev) => [
            ...prev,
            ...imagesMap
        ])

        e.target.value = ""
    }


    const onDeleteImagen = (imagen_id: string) => {
        const updateImages = imagenesPorColor.filter((item) => item.imagen_id !== imagen_id)
        setImagenesPorColor(updateImages)

    }

    const handleUpdateImage = (imagen_id: string, e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files


        const isArray = Array.from(e.target.files || [])

        if (!file || file.length === 0) return

        if (isArray.length > 1) {
            console.warn("No se puede agregar mas de una imagen")
            return
        }

        setImagenesPorColor(prev =>
            prev.map(item =>
                item.imagen_id === imagen_id
                    ? { ...item, url_imagen: URL.createObjectURL(file[0]) }
                    : item
            )
        )
        // limpiar input
        e.target.value = ""


    }

    const onSetPrincipal = (imagen_id: string) => {


    }



    return {
        subirImagenesColor,
        agregarImagenCloudinary,
        onDeleteImagen,
        handleUpdateImage,
        imagenesPorColor
    }

}