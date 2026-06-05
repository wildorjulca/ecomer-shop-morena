
import { prisma } from "@/libs";
import { intialData } from "./seed";
import { initialCountrie } from "./seed-countries";

async function main() {

    const {
        marcas,
        colores,
        generos,
        tipo_tallas,
        tallas,
        categorias,
        subcategorias,
        usuarios,
        productos
    } = intialData

    await Promise.all([
        // prisma.marca.deleteMany(),
        // prisma.color.deleteMany(),
        // prisma.usuario.deleteMany(),
        prisma.wishlist.deleteMany(),
        prisma.producto_imagen.deleteMany(),
        prisma.variante_producto.deleteMany(),
        prisma.producto.deleteMany(),
        // prisma.subcategoria.deleteMany(),
        // prisma.categoria.deleteMany(),
        // prisma.talla.deleteMany(),
        // prisma.tipo_talla.deleteMany(),
    ])

    //  Inserccion de tablas ( Independientes )

    // await prisma.usuario.createMany({
    //     data: usuarios
    // })
    // await prisma.marca.createMany({ data: marcas })
    // await prisma.color.createMany({ data: colores })
    // await prisma.genero.createMany({ data: generos })
    // await prisma.tipo_talla.createMany({ data: tipo_tallas })


    // !! Inercion de las tallas segun al tipo de talla
    // const tipoTallaData = await prisma.tipo_talla.findMany()

    // for (const item of tallas) {

    //     const itemTipoTalla = await prisma.tipo_talla.findFirst({ where: { nombre: item.tipoTalla } })

    //     if (!itemTipoTalla) {
    //         throw new Error(`No exixte el tipo de talla ${item.tipoTalla} en nuestra DB`)
    //     }
    //     await prisma.talla.create({
    //         data: {
    //             valor: item.valor,
    //             tipoTallaId: itemTipoTalla.id
    //         }
    //     })
    // }


    // !! inserccion de las catgoerias  y categoria  

    // await prisma.categoria.createMany({
    //     data: categorias,
    //     skipDuplicates: true
    // });

    // const categoriasDB = await prisma.categoria.findMany();
    // const categoriaMap = new Map(
    //     categoriasDB.map(cat => [cat.nombre, cat.id])
    // );

    // const subcategoriasData = subcategorias.map(sub => {
    //     const categoriaId = categoriaMap.get(sub.categoriaNombre);

    //     if (!categoriaId) {
    //         throw new Error(`No existe la categoría ${sub.nombre}`);
    //     }
    //     return {
    //         nombre: sub.nombre,
    //         slug: sub.slug,
    //         categoriaId
    //     };
    // });

    // await prisma.subcategoria.createMany({
    //     data: subcategoriasData,
    //     skipDuplicates: true
    // });


    // !! INserccion de los producto + (Imagenes, Combinaciones)

    // !! Inserción de los productos + (Imagenes, Combinaciones)
    for (const item of productos) {
        const generoIndex = await prisma.genero.findFirst({ where: { nombre: item.generoNombre } })
        const marcaIndex = await prisma.marca.findFirst({ where: { nombre: item.marcaNombre } })
        const subcategoriaIndex = await prisma.subcategoria.findFirst({ where: { nombre: item.subcategoriaNombre } })

        if (!generoIndex || !subcategoriaIndex) {
            console.log(`Faltan los IDs requeridos para el producto: ${item.nombre}`)
            console.log({ producto: item.nombre, generoIndex, marcaIndex, subcategoriaIndex })
            throw new Error(`Faltan datos para el producto: ${item.nombre}`)
        }

        // logica para poner decuento
        const aplicarDescuento = Math.random() > 0.5

        let precioDescuento = null
        let porcentajeDescuento = 0
        let enOferta = false

        if (aplicarDescuento) {

            porcentajeDescuento =
                Math.floor(Math.random() * 31) + 10

            precioDescuento =
                item.precio_base_venta -
                (item.precio_base_venta * porcentajeDescuento / 100)

            enOferta = true
        }
        // Preparar las imagenes 
        const imagenesMap = []
        for (const img of item.imagenes) {
            const imgColorIndex = await prisma.color.findFirst({ where: { nombre: img.colorNombre } })
            if (!imgColorIndex) {
                console.log(`No existe el color ${img.colorNombre} para el producto ${item.nombre}`);
                continue;
            }
            imagenesMap.push({
                colorId: imgColorIndex.id,
                url_imagen: img.url,
                es_principal: imagenesMap.length === 0, // La primera imagen es la principal
                orden: imagenesMap.length
            });
        }

        // Preparar las Variantes del Producto
        // Preparar las Variantes del Producto
        const variante_producto_map = []
        for (const vp of item.combinaciones) {
            const var_color_index = await prisma.color.findFirst({
                where: { nombre: vp.colorNombre }
            })

            // ✅ Buscar talla por valor Y tipo de talla (usando item.tipoTallaNombre)
            const var_talla_index = await prisma.talla.findFirst({
                where: {
                    valor: vp.tallaValor,
                    tipoTalla: {
                        nombre: item.tipoTallaNombre  // ← Usar el tipo del producto
                    }
                }
            })

            if (!var_color_index) {
                console.log(`No existe el color ${vp.colorNombre} para la variante del producto ${item.nombre}`);
                continue;
            }
            if (!var_talla_index) {
                console.log(`No existe talla "${vp.tallaValor}" para tipo "${item.tipoTallaNombre}" en producto ${item.nombre}`);
                continue;
            }

            variante_producto_map.push({
                colorId: var_color_index.id,
                tallaId: var_talla_index.id,
                cantidad_stock: vp.cantidad_stock,
                stock_minimo: 5,
                costo_compra: item.precio_base_venta * 0.6,
                precio_extra: 0,
                activo: true,
            })
        }

        // Verificar que hay variantes antes de crear el producto
        if (variante_producto_map.length === 0) {
            console.log(`⚠️ El producto ${item.nombre} no tiene variantes válidas, se omite`);
            continue;
        }

        // Crear el producto
        await prisma.producto.create({
            data: {
                nombre: item.nombre,
                slug: item.slug ? item.slug.toLowerCase().replace(/\s/g, '-') : item.nombre.toLowerCase().replace(/\s/g, '-'),
                descripcion: item.descripcion,
                precio_base_venta: item.precio_base_venta,
                precio_descuento: precioDescuento,
                porcentaje_descuento: porcentajeDescuento,
                en_oferta: enOferta,
                subcategoriaId: subcategoriaIndex.id,
                generoId: generoIndex.id,
                marcaId: marcaIndex?.id || null,
                activo: true,
                nuevo: true,
                destacado: false,


                // Crear relaciones
                imagen: {  // Nota: es 'imagen' no 'producto_imagen' según tu schema
                    createMany: {
                        data: imagenesMap
                    }
                },
                variante: {  // Esto es correcto, se llama 'variante' en el schema
                    createMany: {
                        data: variante_producto_map
                    }
                }
            }
        })

        console.log(`✅ Producto creado: ${item.nombre}`);
    }

}



async function mainCountry() {
    const countries = initialCountrie

    // const region = countries.map((item) => ({
    //     nombre: item.departamento
    // }))
    // await prisma.departamento.createMany({ data: region })
    for (const item of countries) {
        const departamentoIndex = await prisma.departamento.findFirst({ where: { nombre: item.departamento } })
        if (departamentoIndex) {
            for (const i of item.provincias) {
                await prisma.provincia.create({
                    data: {
                        nombre: i.nombre,
                        departamentoId: departamentoIndex.id,
                        distrito: {
                            create: i.distritos.map((dist) => ({
                                nombre: dist
                            }))
                        }

                    },
                })
            }
        }

    }

}
(async () => {
    if (process.env.NODE_ENV === "production") {
        console.log("❌ No se puede ejecutar seed en producción");
        return;
    }
    try {
        await main();
        // await mainCountry();
    } catch (error) {
        console.error("❌ Error durante la ejecución del seed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();