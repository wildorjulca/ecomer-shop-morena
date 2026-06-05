'use server'

import { prisma } from "@/libs"

export const getCategories = async () => {

  const categories = await prisma.categoria.findMany({
    select: {
      nombre: true,
      slug: true,
      subcategoria: {
        select: {
          _count: {
            select: {
              producto: true
            }
          }
        }
      }
    }
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