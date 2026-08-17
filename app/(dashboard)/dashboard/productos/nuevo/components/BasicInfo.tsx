'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FloatingInput from '@/components/ui/FloatingInput'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ProductFormValues } from './FormProductContext'

const BasicInfo = () => {

    const { register, formState: { errors } } = useFormContext<ProductFormValues>()
    return (
        <Card>
            <CardContent>
                <CardTitle className='mb-6'>
                    Información producto
                </CardTitle>


                <div className='flex flex-col gap-3 mt-6"'>
                    <div>
                        <FloatingInput
                            label='Nombre'
                            {...register("nombre", {
                                required: "Campo requerido."
                            })}
                            error={errors.nombre?.message}
                        />

                    </div>
                    <div>
                        <FloatingInput
                            label='Descripcion'
                            {...register("descripcion")}

                        />
                    </div>

                    <div>
                        <span className='font-medium'>Cotiza tu precio</span>
                        <div className='flex items-center gap-3'>
                            <div>
                                <FloatingInput
                                    label="Precio compra*"
                                    type='number'
                                    {...register("precio_compra", {
                                        required: "Campo requerido.",
                                        valueAsNumber: true
                                    })}
                                    error={errors.precio_compra?.message}

                                />
                            </div>
                            <div>
                                <FloatingInput
                                    label="Precio venta*"
                                    type='number'
                                    {...register("precio_base_venta", {
                                        required: "Campo requerido",
                                        valueAsNumber: true
                                    })}
                                    error={errors.precio_base_venta?.message}

                                />
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>

        </Card>
    )
}

export default BasicInfo