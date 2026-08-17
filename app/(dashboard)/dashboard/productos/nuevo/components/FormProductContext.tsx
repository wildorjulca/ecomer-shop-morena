'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useProductBuilderContext } from './ProductBuilderContext'
import { saveProduct } from '@/actions/admin'
import { toast } from 'sonner'

export type ProductFormValues = {
    nombre: string
    slug: string
    descripcion?: string
    caracteristicas?: string

    precio_base_venta: number
    precio_compra: number
    precio_descuento?: number

    // categoria_id: number
    subcategoriaId: number
    generoId: number
    marcaId?: number

    nuevo?: boolean
    activo?: boolean
}

interface Props {
    children: React.ReactNode
}

const FormProductContext = ({ children }: Props) => {
    const methods = useForm<ProductFormValues>({
        defaultValues: {
            activo: true,
            nuevo: true,
        },
    })

    // 👇 obtenemos variantes e imágenes del contexto compartido
    const { variantes, imagenesPorColor } = useProductBuilderContext()

    const onSubmit = async (data: ProductFormValues) => {

        const payload = {
            ...data,

            variantes: variantes.map((item) => ({
                colorId: item.colorId,
                codigo_hex: item.codigo_hex,
                tallaId: item.tallaId,
                precio_extra: item.precio_extra,
                cantidad_stock: item.cantidad_stock,
            })),
            imagenes: imagenesPorColor.map((item => ({
                color_id: item.color_id,
                url_imagen: item.url_imagen,
                publicId: item.publicId,
                orden: item.orden,
                es_principal: item.es_principal
            }))),
        }

        console.log('PAYLOAD COMPLETO', payload)

        const res = await saveProduct(payload)
        if (!res.ok) {
            toast.error(res.message)
            return
        }
        toast.success(res.message)
        methods.reset()


    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}

export default FormProductContext