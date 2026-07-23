'use client'

import { saveCategoria } from "@/actions/admin"
import { Categoria } from "@/components/dashboard/categorias/columns"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"



export const useCreateCategoria = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: saveCategoria,
        onError(error, variables, onMutateResult, context) {
            console.log({ error: variables, onMutateResult, context })
        },
        onSuccess(data, variables, onMutateResult, context) {


            // AGREGAR la nueva categoría al caché
            queryClient.setQueriesData(
                { queryKey: ["categorias"] }, // ← Cambia "marcas" por "categorias"
                (oldData: {
                    categorias: Categoria[],
                    total: number;
                    totalPage: number;
                } | undefined) => {

                    if (!oldData) return oldData

                    return {
                        ...oldData,
                        categorias: [...oldData.categorias, data], // ← AGREGAR al final
                        total: oldData.total + 1, // ← Incrementar total
                        // totalPage: oldData.totalPage // ← Si es página, se mantiene igual
                    }
                }
            )


            console.log({ data, variables, onMutateResult, context })
            toast.success("Categoria guardada correctamente.")
        },
    })

    return mutation
}