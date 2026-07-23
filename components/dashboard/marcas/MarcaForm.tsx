'use client'

import FloatingInput from '@/components/ui/FloatingInput'
import { useCreateMarca } from '@/src/hooks/admin'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Marca } from './columns'

type Props = {
    marca: Marca | null
    onClose: () => void
}


type MarcaFormInputs = {
    nombre: string;

}
export default function MarcaForm({ marca, onClose }: Props) {


    const marcaMutation = useCreateMarca()
    const { handleSubmit, register, reset, formState: { errors } } = useForm<MarcaFormInputs>()


    useEffect(() => {
        reset({
            nombre: marca?.nombre ?? ""
        })
    }, [marca, reset])

    const onSubmit: SubmitHandler<MarcaFormInputs> = (data) => {
        marcaMutation.mutate(data.nombre)
    }


    // const handleSubmit = async (
    //     e: React.FormEvent<HTMLFormElement>
    // ) => {
    //     e.preventDefault()

    //     if (!nombre.trim()) {
    //         alert('Ingrese el nombre de la marca')
    //         return
    //     }

    //     try {
    //         setLoading(true)

    //         // Tu petición al backend
    //         // await createMarca({
    //         //     nombre
    //         // })

    //         console.log({
    //             nombre
    //         })

    //         limpiarFormulario()
    //         onClose()

    //     } catch (error) {
    //         console.error(error)
    //         alert('Ocurrió un error')
    //     } finally {
    //         setLoading(false)
    //     }
    // }

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
                    label='Marca'
                    {...register("nombre", { required: "Este campo es requerido" })}
                    error={errors.nombre?.message}
                />


                {marcaMutation.isError &&
                    <span className='text-red-500 mt-1 text-sm block'>
                        {marcaMutation.error.message}
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
                    disabled={marcaMutation.isPending}
                    className={clsx(
                        'h-9 px-4 rounded-md text-white transition',
                        marcaMutation.isPending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#6A148E] hover:bg-[#54106f] cursor-pointer'
                    )}
                >
                    {marcaMutation.isPending ? 'Guardando...' : `${marca ? 'Editar' : 'Guardar'}`}
                </button>
            </div>
        </form>
    )
}