'use server'

import { prisma } from "@/libs"

export const saveCategoria = async (value: string) => {
    try {
        const nombre = value.trim()
        const slug = nombre.toLowerCase().replaceAll(" ", "_")

        const categoriaExistente = await prisma.categoria.findUnique({
            where: { slug }
        })

        if (categoriaExistente) {
            throw new Error("La marca ya existe")
        }

        const newCategoria = await prisma.categoria.create({
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

        return newCategoria

    } catch (error) {
        // 👇 log real del servidor (MUY importante)
        console.error("❌ Error en saveCategoria:", error)

        // 👇 si ya es un error conocido, lo respetamos
        if (error instanceof Error) {
            throw error
        }

        // 👇 fallback para errores raros (DB caída, Prisma crash, etc.)
        throw new Error("Error interno del servidor")
    }
}