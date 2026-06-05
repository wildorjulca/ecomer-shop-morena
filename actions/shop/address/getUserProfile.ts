'use server'

import { prisma } from "@/libs"


export const getUserProfile = async (email: string) => {
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
            documento_tipo: user.documento_tipo ?? "",
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