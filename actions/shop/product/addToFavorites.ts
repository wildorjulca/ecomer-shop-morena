'use server'

import { auth } from "@/auth"
import { prisma, sleep } from "@/libs"
import { redirect } from "next/navigation"

export const addToFavorites = async (producto_id: number) => {

    await sleep(1)

    const session = await auth()

    if (!session?.user) {
        // console.log("No ay ")
        // return {
        //     ok: false,
        //     message: "No ha iniciado session"
        // }
        redirect("/auth/login")
    }

    try {
        const usuario_id = Number(session?.user.id)


        const existing = await prisma.wishlist.findFirst({
            where: {
                usuario_id: usuario_id,
                producto_id: producto_id
            }
        })

        if (existing) {
            const res = await prisma.wishlist.delete({
                where: { id: existing.id }
            })

            return {
                ok: true,
                message: "removed favorites"
            }
        }

        const res = await prisma.wishlist.create({
            data: {
                producto_id: producto_id,
                usuario_id: usuario_id
            }
        })

        return {
            ok: true,
            message: "WishList add favorites correct!"
        }





    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Error deconocido"
        }
    }



}