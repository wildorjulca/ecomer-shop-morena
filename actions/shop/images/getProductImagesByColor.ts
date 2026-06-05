
'use server'

import { prisma, sleep } from "@/libs"


export const getProductImagesByColor = async (productoId: number, colorId: number) => {
    await sleep(1)
    try {
        const images = await prisma.producto_imagen.findMany({
            select: {
                url_imagen: true
            },
            where: {
                productoId,
                colorId
            }
        })
        return {
            ok: true,
            product_imagenes: images.map(img => img.url_imagen)
        }
    } catch (error) {
        console.error('❌ getProductsAll error:', error)
        return {
            ok: false,
            product_imagenes: []
        }

    }


}