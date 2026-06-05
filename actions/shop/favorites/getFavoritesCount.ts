'use server'

import { auth } from "@/auth"
import { prisma } from "@/libs"

export const getFavoriteCount = async () => {
    const session = await auth()
    const userId = Number(session?.user?.id)


    if (!userId) return 0

    const count = await prisma.wishlist.count({
        where: { usuario_id: userId }
    })


    return count
}