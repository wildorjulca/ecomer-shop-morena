/**
 * Tipos del dominio "Carrito".
 *
 * Se mantienen en un solo lugar para que el store, las server actions
 * y los componentes de UI compartan siempre la misma forma de dato.
 */

/** Producto tal como vive dentro del carrito (local o en BD). */
export interface CartProduct {
    id?: number
    varianteId: number
    nombre: string
    precio: number
    porcentaje_descuento?: number
    precio_descuento?: number
    en_oferta?: boolean
    cantidad: number
    imagen: string
    color: string
    talla: string
}



/** Payload mínimo para operar sobre una línea del carrito en el servidor. */
export interface CartLineInput {
    varianteId: number
    cantidad: number
}

/** Respuesta estándar de toda server action del carrito. */
export interface CartActionResult {
    ok: boolean
    message: string
}

/** Totales calculados a partir del listado de productos del carrito. */
export interface CartSummary {
    subTotal: number
    total: number
    itemsInCart: number
}