
export type Categories = {
    nombre: string;
    slug: string;
    count: number

}
export type Subcategorias = {
    nombre: string;
    slug: string;
    count: number

}

export type Marca = {
    nombre: string;
    slug: string;
    count: number
}

export type Talla = {
    id: number;
    nombre: string;
}

export type Color = {
    id: number,
    nombre: string;
    slug: string;
    codigo_hex: string;
}