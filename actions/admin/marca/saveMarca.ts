'use server'

import { prisma } from "@/libs"

export const saveMarca = async (value: string) => {
    try {
        const nombre = value.trim()
        const slug = nombre.toLowerCase()

        const marcaExistente = await prisma.marca.findUnique({
            where: { slug }
        })

        if (marcaExistente) {
            throw new Error("La marca ya existe")
        }

        const newMarca = await prisma.marca.create({
            data: {
                nombre,
                slug
            },
            select: {
                id: true,
                nombre: true,
                activo: true
            }
        })

        return newMarca

    } catch (error) {
        // 👇 log real del servidor (MUY importante)
        console.error("❌ Error en saveMarca:", error)

        // 👇 si ya es un error conocido, lo respetamos
        if (error instanceof Error) {
            throw error
        }

        // 👇 fallback para errores raros (DB caída, Prisma crash, etc.)
        throw new Error("Error interno del servidor")
    }
}