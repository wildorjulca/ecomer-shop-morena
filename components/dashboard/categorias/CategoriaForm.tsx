'use client'

import FloatingInput from '@/components/ui/FloatingInput';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Categoria } from './columns';
import clsx from 'clsx';
import { useCreateCategoria } from '@/src/hooks/admin';


type Props = {
    categoria: Categoria | null
    onClose: () => void
}

type CategoriaFormInputs = {
    nombre: string;

}
const CategoriaForm = ({ categoria, onClose }: Props) => {

    const categoriaMutation = useCreateCategoria()
    const { handleSubmit, register, reset, formState: { errors } } = useForm<CategoriaFormInputs>()


    const onSubmit: SubmitHandler<CategoriaFormInputs> = (data) => {
        // marcaMutation.mutate(data.nombre)
        categoriaMutation.mutate(data.nombre, {
            onSuccess: () => {
                handleCancelar()
            },

        })
    }

    console.log(errors)

    const handleCancelar = () => {
        reset()
        onClose()
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div>
                {/* <label className="block text-sm font-medium mb-2">
                       Nombre de la marca
                   </label> */}


                <FloatingInput
                    label='Categoria'
                    {...register("nombre", { required: "Este campo es requerido" })}
                    error={errors.nombre?.message}
                />


                {categoriaMutation.isError &&
                    <span className='text-red-500 mt-1 text-sm block font-normal'>
                        {categoriaMutation.error.message}
                    </span>
                }

            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={handleCancelar}
                    className="h-9 px-4 border rounded-md"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    disabled={categoriaMutation.isPending}
                    className={clsx(
                        'h-9 px-4 rounded-md text-white transition',
                        categoriaMutation.isPending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#6A148E] hover:bg-[#54106f] cursor-pointer'
                    )}
                >
                    {categoriaMutation.isPending ? 'Guardando...' : `${categoria ? 'Editar' : 'Guardar'}`}
                </button>
            </div>
        </form>
    )
}

export default CategoriaForm