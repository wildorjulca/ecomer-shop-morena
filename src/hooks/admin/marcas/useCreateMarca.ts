'use client'

import { saveMarca } from '@/actions/admin'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// import { saveMarca } from '../actions/saveMarca'
// import type { Marca } from '../types/marca'

export const useCreateMarca = () => {

    const mutation = useMutation({
        mutationFn: saveMarca,

    })


    return mutation

}