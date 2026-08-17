'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { ProductFormValues } from './FormProductContext';

interface Props {

    subCategorias: {
        id: number;
        nombre: string;
    }[],

    marcas: {
        id: number;
        nombre: string;
    }[],
    generos: {
        id: number;
        nombre: string;
    }[],
}
const CategorySection = ({ subCategorias, marcas, generos }: Props) => {

    const { register, formState: { errors } } = useFormContext<ProductFormValues>()
    return (
        <Card>
            <CardContent>
                <CardTitle>
                    Categorización
                </CardTitle>

                <div className='flex flex-col gap-4 mt-6'>

                    {/* Categoria */}
                    <div>
                        <span>Selecionar categoria *</span>
                        <select
                            className="w-full rounded-md border border-gray-300 py-2 px-4 outline-none focus:ring-2 focus:ring-[#6A148E]"
                            {...register('subcategoriaId', { required: 'la categoria es obligatorio', valueAsNumber: true })}
                        >
                            <option value="">Seleccione</option>
                            {subCategorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.subcategoriaId && (
                            <p className="text-red-500 text-sm">
                                {errors.subcategoriaId?.message}
                            </p>
                        )}

                        {/* Marca */}
                    </div>
                    <div>
                        <span>Selecionar marca </span>
                        <select
                            className="w-full rounded-md border border-gray-300 py-2 px-4 outline-none focus:ring-2 focus:ring-[#6A148E]"
                            {...register('marcaId', { valueAsNumber: true})}
                        >
                            <option value="">Seleccione</option>
                            {marcas.map((ma) => (
                                <option key={ma.id} value={ma.id}>
                                    {ma.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* Genero */}
                <div>
                    <span>Seleccionar género *</span>
                    <select
                        {...register('generoId', { required: 'El género es obligatorio', valueAsNumber: true })}
                        className="w-full rounded-md border border-gray-300 py-2 px-4 outline-none focus:ring-2 focus:ring-[#6A148E]"
                    >
                        <option value="">Seleccione</option>
                        {generos.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.nombre}
                            </option>
                        ))}
                    </select>

                    {errors.generoId && (
                        <p className="text-red-500 text-sm">
                            {errors.generoId.message}
                        </p>
                    )}
                </div>




            </CardContent>
        </Card >
    )
}

export default CategorySection