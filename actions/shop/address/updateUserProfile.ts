'use server'

import { auth } from "@/auth"
import { prisma } from "@/libs"
import { sleep } from "@/libs/sleep"
import { revalidatePath } from "next/cache"

type UpdateUserProfile = {
    nombre: string
    apellido: string
    telefono: string
    documento_tipo: "DNI" | "CE" | "PASAPORTE" | "RUC"
    documento_numero: string
}

export const updateUserProfile = async (data: UpdateUserProfile) => {

    const session = await auth()
    const user = session?.user

    await sleep(2)

    if (!user?.email) {
        return {
            ok: false,
            message: "No estás autenticado"
        }
    }

    try {


        const updatedUser = await prisma.usuario.update({
            where: {
                email: user.email
            },
            data: {
                nombre: data.nombre,
                apellido: data.apellido || null,
                telefono: data.telefono || null,
                documento_tipo: data.documento_tipo,
                documento_numero: data.documento_numero || null
            }
        })

        revalidatePath("/my-account/perfil")
        return {
            ok: true,
            message: "Perfil actualizado correctamente",
            profile: updatedUser
        }

    } catch (error) {
        console.error("ERROR updateUserProfile:", error)

        return {
            ok: false,
            message: "Error al actualizar el perfil"
        }
    }
}