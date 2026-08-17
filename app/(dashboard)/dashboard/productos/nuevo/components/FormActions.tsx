'use client'

import React from 'react'
import { Loader2, Save } from 'lucide-react'
import { ProductFormValues } from './FormProductContext'
import { useFormContext } from 'react-hook-form'

const FormActions = () => {
    const {
        formState: { isSubmitting },
    } = useFormContext<ProductFormValues>()

    return (
        <div className="flex flex-col gap-2.5 mt-8">
            <button
                type="submit"
                disabled={isSubmitting}
                className={`
          w-full rounded-sm transition-colors
          flex items-center justify-center gap-2.5
          border py-3
          text-neutral-100
          ${isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#6A148E] hover:bg-[#5c127c] cursor-pointer'
                    }
        `}
            >
                {isSubmitting ? (
                    <>
                        <Loader2
                            size={20}
                            className="animate-spin"
                            strokeWidth={1.5}
                        />
                        Guardando...
                    </>
                ) : (
                    <>
                        <Save
                            color="#fff"
                            strokeWidth={1.5}
                        />
                        Guardar producto
                    </>
                )}
            </button>
        </div>
    )
}

export default FormActions