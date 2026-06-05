import { Inter, Montserrat_Alternates, Poppins } from 'next/font/google'

// 🔤 FUENTE PRINCIPAL (texto, descripción, UI)
export const bodyFont = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-body',
})

// 🏷️ FUENTE DE TÍTULOS (más estilo fashion)
export const titleFont = Poppins({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
})



export const titleFontSlug = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});
