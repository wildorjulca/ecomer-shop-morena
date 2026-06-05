'use server'

import { getCategorias } from "./getCategoria"
import { getMarcas } from "./getMarca"
import { getSubcategoria } from "./getSubcategoria"
import { getTallas } from "./getTallas"


interface Props {
    categoriaSlug: string,
    generoSlug: string
}
export const getCategorizacionSidebar = async ({ categoriaSlug, generoSlug }: Props) => {

    const [categorias, subcategorias, marcas, tallas] = await Promise.all([
        getCategorias(generoSlug),
        getSubcategoria(categoriaSlug, generoSlug),
        getMarcas(),
        getTallas(),


        // getColores()
    ])


    return {
        categorias,
        subcategorias,
        marcas,
        tallas,
        // colores
    }
}