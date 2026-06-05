'use server'

import { prisma } from "@/libs"

export const getDepartments = async () => {
    const departments = await prisma.departamento.findMany({
        select: {
            id: true,
            nombre: true
        }
    })

    return departments
}
