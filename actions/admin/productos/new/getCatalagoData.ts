'use server'

import { getCategorias } from "./getCategorias"
import { getColores } from "./getColores"
import { getGeneros } from "./getGeneros"
import { getMarcas } from "./getMarcas"
import { getSubCategorias } from "./getSubCategorias"
import { getTipoTallas } from "./getTipoTallas"


export const getCatalagoData = async () => {

    const [colores, subCategorias, tipoTallas, marcas, generos] = await Promise.all([
        getColores(),
        getSubCategorias(),
        getTipoTallas(),
        // getCategorias(),
        getMarcas(),
        getGeneros()
    ])

    return {
        colores,
        subCategorias,
        tipoTallas,
        marcas,
        generos
    }

}