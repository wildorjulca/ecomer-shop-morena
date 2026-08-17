'use server'

import { prisma } from "@/libs"

export const getCategories = async (gender: string) => {

  const categories = await prisma.categoria.findMany({
    select: {
      nombre: true,
      slug: true,
      subcategoria: {
        select: {
          _count: {
            select: {
              producto: {
                where: {
                  genero: { slug: gender.toLowerCase()}
                },
              }
            }
          }
        }
      }
    },
  })

  return categories.map(category => ({
    nombre: category.nombre,
    slug: category.slug,
    count: category.subcategoria.reduce(
      (total, sub) => total + sub._count.producto,
      0
    )
  }))
}