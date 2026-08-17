'use client'

import { CldImage } from 'next-cloudinary'


import Image from 'next/image'

/**
 * Devuelve la ruta completa y válida de una imagen
 */

/**
 * Devuelve la ruta completa y válida de una imagen
 */
import { getCldImageUrl } from 'next-cloudinary'


export const getImageSrc = (url?: string): string => {
    if (!url) return '/images/no-image.png'

    // Si es una URL de Cloudinary
    if (url.includes('res.cloudinary.com')) {
        const parts = url.split('/image/upload/')

        if (parts.length === 2) {
            let publicId = parts[1]

            const segments = publicId.split('/')

            // ✅ quitar versión v123456
            if (/^v\d+$/.test(segments[0] ?? '')) {
                segments.shift()
            }

            publicId = segments.join('/')

            // ✅ quitar extensión
            publicId = publicId.replace(/\.[^/.]+$/, '')

            console.log('PUBLIC ID =>', publicId)

            // ✅ generar URL real
            const finalUrl = getCldImageUrl({
                width: 600,
                height: 600,
                src: publicId,
                removeBackground: true
                // removeBackground: true,
            })

            console.log('FINAL URL =>', finalUrl)

            return finalUrl
        }
    }

    return `/images/products/${url}`
}
export default function Page() {


    const src = getImageSrc(
        "https://res.cloudinary.com/br2gxwx3/image/upload/v1786634652/shop-morena/products/zzbgeiitn7fl7z00628c.jpg"
    )

    return (
        <div className='bg-gray-100 w-full h-screen flex items-center justify-center gap-4'>
            <CldImage
                width={960}
                height={600}
                src="shop-morena/products/bamdvxy7vxihf7gpvgcx"
                alt="Turtle"
                removeBackground={true}
            // className='bg-gray-100'
            />
            <CldImage
                width={960}
                height={600}
                src={getImageSrc("https://res.cloudinary.com/br2gxwx3/image/upload/v1786634652/shop-morena/products/zzbgeiitn7fl7z00628c.jpg")}
                alt="Turtle"
                removeBackground={true}
            // className='bg-gray-100'
            />

            <div className="bg-gray-100 w-full h-screen flex items-center justify-center gap-4">
                <Image
                    alt="dhhdhd"
                    width={600}
                    height={600}
                    title="ddhhd"
                    src={src}
                />
            </div>
        </div>
    )
}