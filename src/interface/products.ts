
export type Talla = {
  id: number
  valor: string
  stock: number
  disponible: boolean
}

export interface Color {
  id: number
  nombre: string
  codigo_hex: string
  tallas: Talla[]
}

export interface Product {
  id: number
  nombre: string
  slug: string
  precio_base_venta: number
  precio_descuento: number
  porcentaje_descuento: number
  en_oferta: boolean
  imagenes: string[]

  color_default: Color | null
  colores_disponibles: Color[]
  isFavorite: boolean;
}