// import { getCldImageUrl } from "next-cloudinary"

import { getCldImageUrl } from "next-cloudinary"

// /**
//  * Devuelve la ruta completa y válida de una imagen
//  */
// export const getImageSrc = (url?: string): string => {
//     if (!url) return '/images/no-image.png'

//     // ✅ Cloudinary — e_background_removal elimina el fondo con IA
//     // Requiere activar el add-on gratuito en: cloudinary.com → Add-ons → Background Removal
//     if (url.includes('res.cloudinary.com')) {
//         // return url.replace('/upload/', '/upload/e_background_removal/')

//         // extraer el public_id
//         const match = url.match(
//             /\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|avif)$/i
//         )

//         console.log({match})

//         if (!match) return url

//         const publicId = match[1]

//         return getCldImageUrl({
//             width: 960,
//             height: 600,
//             src: publicId,
//             removeBackground: true
//         })

//     }

//     // ✅ Otras URLs remotas
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//         return url
//     }

//     // ✅ Backend uploads
//     if (url.startsWith('/uploads') || url.includes('uploads')) {
//         return `http://localhost:3100${url.startsWith('/') ? url : `/${url}`}`
//     }

//     // ✅ Imágenes locales
//     return `/images/products/${url}`
// }





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


            // ✅ generar URL real
            const finalUrl = getCldImageUrl({
                width: 600,
                height: 600,
                src: publicId,
                removeBackground: true
                // removeBackground: true,
            })


            return finalUrl
        }
    }

    return `/images/products/${url}`
}