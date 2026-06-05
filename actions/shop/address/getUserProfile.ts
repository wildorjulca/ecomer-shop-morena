'use server'

import { prisma } from "@/libs"


type Inputs = {
    id: number
    nombre: string
    apellido: string
    email: string
    telefono: string
    documento_tipo: "DNI" | "CE" | "PASAPORTE" | "RUC"
    documento_numero: string

}

type GetUserProfileResponse =
  | {
      ok: true
      profile: Inputs
    }
  | {
      ok: false
      error: string
    }

export const getUserProfile = async (
  email: string
): Promise<GetUserProfileResponse> => {
    try {
        const user = await prisma.usuario.findUnique({
            where: { email: email },
            select: {
                id: true,
                nombre: true,
                apellido: true,
                email: true,
                telefono: true,
                documento_tipo: true,
                documento_numero: true
                // password_hash: true
            }
        })

        if (!user) {
            return {
                ok: false,
                error: "Usuario no encontrado"
            }
        }

        const profile = {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido ?? "",
            email: user.email,
            telefono: user.telefono ?? "",
            documento_tipo: user.documento_tipo ?? "DNI",
            documento_numero: user.documento_numero ?? ""
        }

        return {
            ok: true,
            profile
        }

    } catch (error) {
        console.error("ERROR getUserProfile:", error)

        return {
            ok: false,
            error: "Error interno del servidor"
        }
    }
}