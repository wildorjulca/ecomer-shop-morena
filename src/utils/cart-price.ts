import { CartProduct } from "../interface/cart"

/**
 * Devuelve el precio final de un producto, respetando la oferta si aplica.
 * Centralizado acá para no repetir la misma condición en cada componente
 * (CartItem, CartList, OrderSumary, etc.).
 */
export function getFinalPrice(product: CartProduct): number {
    const tieneOferta = Boolean(product.en_oferta && product.precio_descuento)
    return tieneOferta ? (product.precio_descuento as number) : product.precio
}