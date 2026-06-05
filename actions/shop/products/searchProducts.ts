"use server";

import { productoWhereInput } from "@/generated/prisma/models";
import { prisma } from "@/libs";

interface Props {
    query: string;
    genero?: string;
    categoria?: string[];
    subcategoria?: string[];
    marca?: string[];

    page?: number;
    limit?: number;
}

export const searchProducts = async ({
    query,
    genero,
    categoria,
    subcategoria,
    marca,

    page = 1,
    limit = 12,
}: Props) => {
    try {


        // const cleanQuery = query.toLowerCase().trim();

        // const words = cleanQuery
        //     .split(/\s+/)
        //     .filter((w) => w.length >= 2);

        const skip = (page - 1) * limit;

        const where: productoWhereInput = {
            activo: true,
        };

        // ===============================
        // BÚSQUEDA POR TEXTO (OPCIONAL)
        // ===============================
        if (query?.trim()) {
            const cleanQuery = query.toLowerCase().trim();

            const words = cleanQuery
                .split(/\s+/)
                .filter((w) => w.length >= 2);

            if (words.length > 0) {
                where.OR = words.map((word) => ({
                    OR: [
                        {
                            nombre: {
                                contains: word,
                            },
                        },
                        {
                            descripcion: {
                                contains: word,
                            },
                        },
                    ],
                }));
            }
        }

        // ===============================
        // GÉNERO
        // ===============================
        if (genero) {
            where.genero = {
                slug: genero.toLowerCase(),
            };
        }

        // ===============================
        // CATEGORÍA / SUBCATEGORÍA
        // ===============================
        if (categoria?.length || subcategoria?.length) {
            where.subcategoria = {
                ...(categoria?.length && {
                    categoria: {
                        slug: {
                            in: categoria,
                        },
                    },
                }),

                ...(subcategoria?.length && {
                    slug: {
                        in: subcategoria,
                    },
                }),
            };
        }

        // ===============================
        // MARCAS
        // ===============================
        if (marca?.length) {
            where.marca = {
                slug: {
                    in: marca,
                },
            };
        }
        const products = await prisma.producto.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                id: "desc",
            },
            select: {
                id: true,
                nombre: true,
                slug: true,
                precio_base_venta: true,
                precio_descuento: true,
                porcentaje_descuento: true,
                en_oferta: true,

                imagen: {
                    select: {
                        colorId: true,
                        url_imagen: true,
                        es_principal: true,
                    },
                },

                variante: {
                    select: {
                        color: {
                            select: {
                                id: true,
                                nombre: true,
                                codigo_hex: true,
                            },
                        },
                    },
                },
            },
        });

        // ===============================
        // FORMAT (IGUAL A TU CATEGORY)
        // ===============================
        const formatProducts = products.map((p) => {
            const coloresMap = new Map();

            p.variante.forEach((v) => {
                coloresMap.set(v.color.id, v.color);
            });

            const colores_disponibles = Array.from(coloresMap.values());

            const imagenPrincipal =
                p.imagen.find((img) => img.es_principal) || p.imagen[0];

            if (!imagenPrincipal) {
                return {
                    id: p.id,
                    nombre: p.nombre,
                    slug: p.slug,
                    precio_base_venta: Number(p.precio_base_venta),
                    precio_descuento: Number(p.precio_descuento),
                    porcentaje_descuento: Number(p.porcentaje_descuento),
                    en_oferta: p.en_oferta,
                    imagenes: [],
                    color_default: null,
                    colores_disponibles,
                };
            }

            const color_default = colores_disponibles.find(
                (c) => c.id === imagenPrincipal.colorId
            );

            const imagenes = p.imagen
                .filter((img) => img.colorId === imagenPrincipal.colorId)
                .sort(
                    (a, b) => Number(b.es_principal) - Number(a.es_principal)
                )
                .map((img) => img.url_imagen);

            const colores_ordenados = [...colores_disponibles].sort(
                (a, b) => {
                    if (a.id === color_default?.id) return -1;
                    if (b.id === color_default?.id) return 1;
                    return 0;
                }
            );

            return {
                id: p.id,
                nombre: p.nombre,
                slug: p.slug,
                precio_base_venta: Number(p.precio_base_venta),
                precio_descuento: Number(p.precio_descuento),
                porcentaje_descuento: Number(p.porcentaje_descuento),
                en_oferta: p.en_oferta,
                imagenes,
                color_default,
                colores_disponibles: colores_ordenados,
            };
        });

        const total = await prisma.producto.count({
            where,
        });

        return {
            ok: true,
            products: formatProducts,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            products: [],
            total: 0,
            page: 1,
            totalPages: 0,
        };
    }
};