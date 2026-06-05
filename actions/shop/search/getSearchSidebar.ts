'use server'

import { getCategories } from "./getCategories"
import { getGenders } from "./getGenders"
import { getSubcategoria } from "./getSubcategoria"

export const getSearchSidebar = async (generoSlug?: string, categoriaSlug?: string) => {

    const [genders, categories, subcategorias] = await Promise.all([
        getGenders(),
        getCategories(generoSlug),
        getSubcategoria(categoriaSlug, generoSlug)
    ])

    return {
        genders,
        categories,
        subcategorias
    }
}