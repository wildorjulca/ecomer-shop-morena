export interface Color {
    id: number;
    nombre: string;
    codigo_hex: string;
}

export interface VarianteSizes {
    variante_id: number;
    talla_id: number;
    talla_valor: string;
    precio_extra: number;
    stock: number;
}

export interface ProductSlug {
    id: number;
    nombre: string;
    slug: string;
    descripcion: string;

    precio_base_venta: number;
    precio_descuento?: number;
    porcentaje_descuento?: number;
    genero: string;
    subcategoria: string;
    en_oferta: boolean;

    coloresDisponibles: Color[];
    isFavorite: boolean;
    imagenes: string[]
    color_default: {
        codigo_hex: string;
        id: number;
        nombre: string;
    }
}
