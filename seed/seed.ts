import bcrypt from 'bcrypt'

type MarcaType = {
    nombre: string;
    slug: string;
    imagen?: string

}

type ColorType = {
    nombre: string;
    slug: string;
    codigo_hex: string
}

type GeneroType = {
    nombre: string;
    slug: string;
    imagen?: string;
}

type Tipo_talla = {
    nombre: string;
    descripcion: string;
}

type Talla = {
    valor: string;
    tipoTalla: string;
}
type CategoriaType = {
    nombre: string;
    slug: string;
}

type SubcategoriaType = {
    nombre: string;
    slug: string;
    categoriaNombre: string;
}

type ProductoType = {
    nombre: string;
    slug?: string;
    descripcion: string;
    precio_base_venta: number;
    precio_descuento?: number
    porcentaje_descuento?: number,
    en_oferta?: boolean,
    generoNombre: string; //!! Aplica para hacer eñ seed y buscar a que genero pertenece este item del producto
    categoriaNombre: string;
    subcategoriaNombre?: string;
    marcaNombre?: string;
    es_nuevo?: boolean;
    es_destacado?: boolean;
    tipoTallaNombre: string; // !! Me va a servir para ponder indentificar a que tupi de talla pertenece
    atributos?: {
        nombre: string;
        valor: string;
    }[];
    imagenes: {
        url: string, colorNombre: string
    }[]
    combinaciones: {
        colorNombre: string;
        tallaValor: string;
        cantidad_stock: number;
        // precio_base_venta?: number;
    }[];
};

type UsuarioType = {
    nombre: string;
    email: string;
    password_hash: string;
    rol?: 'cliente' | 'admin' | 'vendedor' | 'almacenero'
}



interface SeedData {
    marcas: MarcaType[];
    colores: ColorType[];
    generos: GeneroType[];
    tipo_tallas: Tipo_talla[];
    tallas: Talla[];
    categorias: CategoriaType[];
    subcategorias: SubcategoriaType[];
    usuarios: UsuarioType[];
    productos: ProductoType[];

}


export const intialData: SeedData = {
    marcas: [
        {
            nombre: "Nike",
            slug: "nike",
        },
        {
            nombre: "Adidas",
            slug: "adidas",
        },
        {
            nombre: "Puma",
            slug: "puma",
        },
        {
            nombre: "Columbia",
            slug: "columbia",
        },
        {
            nombre: "Reebok",
            slug: "reebok",
        },
        {
            nombre: "New Balance",
            slug: "new-balance",
        },
        {
            nombre: "Converse",
            slug: "converse",
        },
        {
            nombre: "Vans",
            slug: "vans",
        },
        {
            nombre: "Fila",
            slug: "fila",
        },
        {
            nombre: "Asics",
            slug: "asics",
        },
        {
            nombre: "Under Armour",
            slug: "under-armour",
        },
        {
            nombre: "Skechers",
            slug: "skechers",
        },
        {
            nombre: "Jordan",
            slug: "jordan",
        },
        {
            nombre: "Joma",
            slug: "joma",
        },
        {
            nombre: "Hoka",
            slug: "hoka",
        },
        {
            nombre: "Salomon",
            slug: "salomon",
        },
        {
            nombre: "Merrell",
            slug: "merrell",
        },
        {
            nombre: "Timberland",
            slug: "timberland",
        },
        {
            nombre: "Clarks",
            slug: "clarks",
        },
        {
            nombre: "Dr. Martens",
            slug: "dr-martens",
        }
    ],
    colores: [
        // Básicos
        { nombre: "Negro", slug: "negro", codigo_hex: "#000000" },
        { nombre: "Blanco", slug: "blanco", codigo_hex: "#FFFFFF" },
        { nombre: "Gris", slug: "gris", codigo_hex: "#808080" },
        { nombre: "Gris Claro", slug: "gris-claro", codigo_hex: "#D3D3D3" },
        { nombre: "Gris Oscuro", slug: "gris-oscuro", codigo_hex: "#4F4F4F" },

        // Azules
        { nombre: "Azul", slug: "azul", codigo_hex: "#0057FF" },
        { nombre: "Azul Marino", slug: "azul-marino", codigo_hex: "#001F3F" },
        { nombre: "Azul Claro", slug: "azul-claro", codigo_hex: "#87CEEB" },


        // Rojos y rosados
        { nombre: "Rojo", slug: "rojo", codigo_hex: "#FF0000" },
        { nombre: "Borgoña", slug: "borgona", codigo_hex: "#800020" },
        { nombre: "Rosado", slug: "rosado", codigo_hex: "#FF69B4" },

        // Verdes
        { nombre: "Verde", slug: "verde", codigo_hex: "#008000" },
        { nombre: "Verde Oliva", slug: "verde-oliva", codigo_hex: "#556B2F" },
        { nombre: "Verde Militar", slug: "verde-militar", codigo_hex: "#4B5320" },

        // Amarillos y naranjas
        { nombre: "Amarillo", slug: "amarillo", codigo_hex: "#FFD700" },
        { nombre: "Mostaza", slug: "mostaza", codigo_hex: "#FFDB58" },
        { nombre: "Naranja", slug: "naranja", codigo_hex: "#FFA500" },

        // Marrones y beige
        { nombre: "Marrón", slug: "marron", codigo_hex: "#8B4513" },
        { nombre: "Café", slug: "cafe", codigo_hex: "#6F4E37" },
        { nombre: "Beige", slug: "beige", codigo_hex: "#F5F5DC" },
        { nombre: "Crema", slug: "crema", codigo_hex: "#FFFDD0" },

        // Especiales / moda
        { nombre: "Morado", slug: "morado", codigo_hex: "#800080" },
        { nombre: "Lavanda", slug: "lavanda", codigo_hex: "#E6E6FA" },
        { nombre: "Turquesa", slug: "turquesa", codigo_hex: "#40E0D0" },
        { nombre: "Dorado", slug: "dorado", codigo_hex: "#FFD700" },
        { nombre: "Plateado", slug: "plateado", codigo_hex: "#C0C0C0" }
    ],
    generos: [
        { nombre: "Hombre", slug: "hombre" },
        { nombre: "Mujer", slug: "mujer" },
        { nombre: "Unisex", slug: "unisex" },
        { nombre: "Niños", slug: "ninos" },
        { nombre: "Niñas", slug: "ninas" },
        { nombre: "Bebés", slug: "bebes" },
    ],
    tallas: [
        // 👕 POLOS (letras) Prendas superiores
        { valor: "XS", tipoTalla: "Prendas superiores" },
        { valor: "S", tipoTalla: "Prendas superiores" },
        { valor: "M", tipoTalla: "Prendas superiores" },
        { valor: "L", tipoTalla: "Prendas superiores" },
        { valor: "XL", tipoTalla: "Prendas superiores" },

        // 👖 PANTALONES (números) Prendas inferiores
        { valor: "28", tipoTalla: "Prendas inferiores" },
        { valor: "30", tipoTalla: "Prendas inferiores" },
        { valor: "32", tipoTalla: "Prendas inferiores" },
        { valor: "34", tipoTalla: "Prendas inferiores" },
        { valor: "36", tipoTalla: "Prendas inferiores" },
        { valor: "38", tipoTalla: "Prendas inferiores" },

        // 👗 VESTIDOS (letras pero diferente fit) Prendas completas
        { valor: "XS", tipoTalla: "Prendas completas" },
        { valor: "S", tipoTalla: "Prendas completas" },
        { valor: "M", tipoTalla: "Prendas completas" },
        { valor: "L", tipoTalla: "Prendas completas" },

        // 👟 CALZADO
        { valor: "35", tipoTalla: "Calzado" },
        { valor: "36", tipoTalla: "Calzado" },
        { valor: "37", tipoTalla: "Calzado" },
        { valor: "38", tipoTalla: "Calzado" },
        { valor: "39", tipoTalla: "Calzado" },
        { valor: "40", tipoTalla: "Calzado" },

        // 🧢 ACCESORIOS
        { valor: "Único", tipoTalla: "Accesorios" },
        { valor: "Ajustable", tipoTalla: "Accesorios" }
    ],
    tipo_tallas: [
        // { nombre: "Polos" },
        // { nombre: "Pantalones" },
        // { nombre: "Vestidos" },
        {
            nombre: "Calzado",
            descripcion: "Tallas de zapatos, zapatillas, sandalias (ej: 38, 39, 40)."
        },
        {
            nombre: "Accesorios",
            descripcion: "Productos complementarios como gorras, lentes, correas, relojes, mochilas, etc."
        },
        {
            nombre: "Prendas superiores",
            descripcion: "Ropa de la parte superior del cuerpo (polos, camisas, poleras, casacas). Tallas tipo S, M, L."
        },
        {
            nombre: "Prendas inferiores",
            descripcion: "Ropa de la parte inferior (pantalones, shorts, bóxers). Tallas numéricas o S, M, L según el caso."
        },
        {
            nombre: "Prendas completas",
            descripcion: "Ropa que cubre todo el cuerpo (vestidos, enterizos). Tallas tipo S, M, L o numéricas."
        }

    ],
    categorias: [
        { nombre: "Ropa", slug: "ropa" },
        { nombre: "Calzado", slug: "calzado" },
        { nombre: "Accesorios", slug: "accesorios" }
    ],
    subcategorias: [
        // ROPA
        { nombre: "Polos", slug: "polos", categoriaNombre: "Ropa" },
        { nombre: "Pantalones", slug: "pantalones", categoriaNombre: "Ropa" },
        { nombre: "Vestidos", slug: "vestidos", categoriaNombre: "Ropa" },
        { nombre: "Casacas", slug: "casacas", categoriaNombre: "Ropa" },
        { nombre: "Poleras", slug: "poleras", categoriaNombre: "Ropa" },
        { nombre: "Camisas", slug: "camisas", categoriaNombre: "Ropa" },


        // CALZADO
        { nombre: "Zapatillas", slug: "zapatillas", categoriaNombre: "Calzado" },
        { nombre: "Botas", slug: "botas", categoriaNombre: "Calzado" },
        { nombre: "Sandalias", slug: "sandalias", categoriaNombre: "Calzado" }, // 👈 aquí
        { nombre: "Pantuflas", slug: "pantuflas", categoriaNombre: "Calzado" },
        { nombre: "Tacones", slug: "tacones", categoriaNombre: "Calzado" },
        { nombre: "Deportivo", slug: "deportivo", categoriaNombre: "Calzado" },
        { nombre: "Botines", slug: "botines", categoriaNombre: "Calzado" },

        // ACCESORIOS
        { nombre: "Gorras", slug: "gorras", categoriaNombre: "Accesorios" },
        { nombre: "Mochilas", slug: "mochilas", categoriaNombre: "Accesorios" }
    ],
    usuarios: [
        {
            nombre: "Admin User",
            email: "admin@example.com",
            password_hash: bcrypt.hashSync("123456", 10),
            rol: "admin"
        },
        {
            nombre: "John Doe",
            email: "john.doe@example.com",
            password_hash: bcrypt.hashSync("123456", 10),
            rol: "cliente"
        }
    ],
    productos: [

        // Accesorios hombre mujer
        {
            nombre: "Gorra de beisbol 3 tiras new logo",
            descripcion: "Informal, fresca y cómoda: esta gorra de béisbol adidas Adicolor lo tiene todo. Su confección en sarga de algodón le da una sensación suave y resistente al desgaste que mejora con cada uso.",
            precio_base_venta: 50,
            generoNombre: "Hombre",
            categoriaNombre: "Accesorios",
            subcategoriaNombre: "Gorras",
            marcaNombre: "adidas",
            tipoTallaNombre: "Accesorios",
            imagenes: [
                { colorNombre: "Rojo", url: "236.png" },
                { colorNombre: "Rojo", url: "237.png" },

                { colorNombre: "Negro", url: "238.png" },
                { colorNombre: "Negro", url: "239.png" },

                // { colorNombre: "Rojo", url: "198.png" },
                // { colorNombre: "Rojo", url: "199.png" },


            ],
            combinaciones: [
                { colorNombre: "Rojo", tallaValor: "ajustable", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "ajustable", cantidad_stock: 6 },
            ],
        },

        {
            nombre: "Gorra de beisbol trifolio clasica adicolor",
            descripcion: "Informal, fresca y cómoda: esta gorra de béisbol adidas Adicolor lo tiene todo. Su confección en sarga de algodón le da una sensación suave y resistente al desgaste que mejora con cada uso.",
            precio_base_venta: 75,
            generoNombre: "Hombre",
            categoriaNombre: "Accesorios",
            subcategoriaNombre: "Gorras",
            marcaNombre: "adidas",
            tipoTallaNombre: "Accesorios",
            imagenes: [
                { colorNombre: "Azul", url: "240.png" },
                { colorNombre: "Azul", url: "241.png" }
            ],
            combinaciones: [
                { colorNombre: "Azul", tallaValor: "ajustable", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Gorra adicolor bucket",
            descripcion: " Está hecho de sarga de algodón con una banda de algodón alrededor de la corona y lleva una visera precurvada que ayuda a mantener el sol alejado de tus ojos. Un pequeño logo del Trifolio bordado da el toque final.",
            precio_base_venta: 100,
            generoNombre: "Hombre",
            categoriaNombre: "Accesorios",
            subcategoriaNombre: "Gorras",
            marcaNombre: "adidas",
            tipoTallaNombre: "Accesorios",
            imagenes: [
                { colorNombre: "Negro", url: "242.png" },
                { colorNombre: "Negro", url: "243.png" },

                // { colorNombre: "Rojo", url: "198.png" },
                // { colorNombre: "Rojo", url: "199.png" },


            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "ajustable", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Gorra de beisbol con efecto lavado",
            descripcion: "Informal, fresca y cómoda: esta gorra de béisbol adidas Adicolor lo tiene todo. Su confección en sarga de algodón le da una sensación suave y resistente al desgaste que mejora con cada uso.",
            precio_base_venta: 50,
            generoNombre: "Hombre",
            categoriaNombre: "Accesorios",
            subcategoriaNombre: "Gorras",
            marcaNombre: "adidas",
            tipoTallaNombre: "Accesorios",
            imagenes: [
                { colorNombre: "Gris", url: "244.png" },
                { colorNombre: "Gris", url: "245.png" },

                { colorNombre: "Azul claro", url: "246.png" },
                { colorNombre: "Azul Claro", url: "247.png" },

                // { colorNombre: "Rojo", url: "198.png" },
                // { colorNombre: "Rojo", url: "199.png" },


            ],
            combinaciones: [
                { colorNombre: "Gris", tallaValor: "ajustable", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "ajustable", cantidad_stock: 6 },
            ],
        },

        // polos hombre adidas
        {
            nombre: "Polo 3 Tiras",
            descripcion: "Polo elegante con un ajuste clásico y el emblemático diseño de las 3 Tiras.",
            precio_base_venta: 80,
            generoNombre: "Hombre",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Polos",
            marcaNombre: "adidas",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Blanco", url: "234.png" },
                { colorNombre: "Blanco", url: "235.png" },
                // { colorNombre: "Rojo", url: "198.png" },
                // { colorNombre: "Rojo", url: "199.png" },


            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "XL", cantidad_stock: 6 },

            ],
        },
        // =========================================
        //  *** CATEGORÍA: Calzado Deportivo ***  // 
        // ========================================
        // **subcattegoria: Zapatillas Urbanas 
        //NIKE
        {
            nombre: "Nike Air Max 90",
            slug: "nike-air-max-90",
            descripcion: "Zapatilla icónica con amortiguación Air Max y diseño urbano.",
            precio_base_venta: 399.9,
            generoNombre: "Hombre",
            categoriaNombre: "Zapatillas",
            subcategoriaNombre: "Zapatillas",
            marcaNombre: "Nike",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Rojo", url: "01.png" },
                { colorNombre: "Rojo", url: "02.png" },
                { colorNombre: "Rojo", url: "03.png" },
                { colorNombre: "Rojo", url: "05.png" },
                { colorNombre: "Marrón", url: "11.png" },
                { colorNombre: "Marrón", url: "12.png" },
                { colorNombre: "Marrón", url: "13.png" },
                { colorNombre: "Marrón", url: "14.png" },
                // 
                { colorNombre: "Blanco", url: "15.png" },
                { colorNombre: "Blanco", url: "16.png" },
                { colorNombre: "Blanco", url: "17.png" },
            ],
            combinaciones: [
                { colorNombre: "Rojo", tallaValor: "38", cantidad_stock: 15 },
                { colorNombre: "Rojo", tallaValor: "39", cantidad_stock: 12 },
                { colorNombre: "Rojo", tallaValor: "40", cantidad_stock: 10 },
                { colorNombre: "Rojo", tallaValor: "41", cantidad_stock: 6 },

                { colorNombre: "Marrón", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "40", cantidad_stock: 6 },

                { colorNombre: "Blanco", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "41", cantidad_stock: 6 },
            ]
        },
        {
            nombre: "Nike Court Borough Low Next Bloom",
            slug: "nike-court-borough-low-next-bloom",
            descripcion: "Inspiradas en el estilo retro de baloncesto, las Court Borough están confeccionadas con piel sintética para ofrecer un toque clásico y se han reinventado con una comodidad moderna, como el espacio adicional en la puntera.",
            precio_base_venta: 320,
            generoNombre: "Hombre",
            categoriaNombre: "Zapatillas",
            subcategoriaNombre: "Zapatillas",
            tipoTallaNombre: "Calzado",
            marcaNombre: "Nike",
            imagenes: [
                { colorNombre: "Azul", url: "18.png" },
                { colorNombre: "Azul", url: "19.png" },
                { colorNombre: "Azul", url: "20.png" },
                { colorNombre: "Rojo", url: "21.png" },
                { colorNombre: "Negro", url: "22.png" },
                { colorNombre: "Negro", url: "23.png" },
                { colorNombre: "Negro", url: "24.png" },
                { colorNombre: "Negro", url: "25.png" },

            ],
            combinaciones: [
                { colorNombre: "Azul", tallaValor: "38", cantidad_stock: 15 },
                { colorNombre: "Azul", tallaValor: "39", cantidad_stock: 12 },
                { colorNombre: "Azul", tallaValor: "40", cantidad_stock: 10 },
                { colorNombre: "Azul", tallaValor: "41", cantidad_stock: 8 },

                { colorNombre: "Negro", tallaValor: "38", cantidad_stock: 10 },
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 12 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 40 },
            ]
        },
        // // ADIDAS
        {
            nombre: "Zapatillas Running Hombre Adidas Runblaze",
            slug: "zapatillas-running-hombre-adidas-runblaze",
            descripcion: "Zapatilla icónica con amortiguación Nike Max y diseño urbano.",
            precio_base_venta: 170,
            generoNombre: "Hombre",
            categoriaNombre: "Zapatillas",
            subcategoriaNombre: "Zapatillas",
            marcaNombre: "Adidas",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Negro", url: "26.png" },
                { colorNombre: "Negro", url: "27.png" },

                // 
                { colorNombre: "Azul", url: "28.png" },
                { colorNombre: "Azul", url: "29.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 6 },

                { colorNombre: "Azul", tallaValor: "38", cantidad_stock: 15 },
                { colorNombre: "Azul", tallaValor: "39", cantidad_stock: 12 },
                { colorNombre: "Azul", tallaValor: "40", cantidad_stock: 10 },
                { colorNombre: "Azul", tallaValor: "41", cantidad_stock: 6 },

            ]
        },
        // Joma
        {
            nombre: "Zapatillas Futbol Sala Cancha 2601 IN Blanco Morado Negro",
            slug: "Zapatillas-Futbol-Sala-Cancha-2601-IN-Blanco-Morado-Negro",
            descripcion: "Zapatillas de fútbol sala diseñadas para un rendimiento confiable en cancha. El modelo Cancha acompaña el juego con una combinación equilibrada de confort, control y estabilidad, pensado para jugadores que buscan precisión en los gestos técnicos propios del futsal.",
            precio_base_venta: 190,
            generoNombre: "Hombre",
            categoriaNombre: "Calzado Deportivo",
            subcategoriaNombre: "Deportivo",
            marcaNombre: "joma",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Morado", url: "88.png" },
                { colorNombre: "Morado", url: "89.png" },
                { colorNombre: "Morado", url: "90.png" },
                { colorNombre: "Morado", url: "91.png" },
            ],
            combinaciones: [
                { colorNombre: "Morado", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Morado", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Morado", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Morado", tallaValor: "41", cantidad_stock: 6 },

            ]
        },
        {
            nombre: "Zapatillas Futbol Sala Cancha 2605 IN Celeste",
            slug: "Zapatillas-Futbol-Sala-Cancha-2605-IN-Celeste",
            descripcion: "Zapatillas de fútbol sala diseñadas para un rendimiento confiable en cancha. El modelo Cancha acompaña el juego con una combinación equilibrada de confort, control y estabilidad, pensado para jugadores que buscan precisión en los gestos técnicos propios del futsal.",
            precio_base_venta: 200,
            generoNombre: "Hombre",
            categoriaNombre: "Deportivo",
            subcategoriaNombre: "Deportivo",
            marcaNombre: "joma",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Azul Claro", url: "92.png" },
                { colorNombre: "Azul Claro", url: "93.png" },
                { colorNombre: "Azul Claro", url: "94.png" },
                { colorNombre: "Azul Claro", url: "95.png" },
            ],
            combinaciones: [
                { colorNombre: "Azul Claro", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "41", cantidad_stock: 6 },
            ]
        },
        {
            nombre: "Zapatillas Futbol Sala Top Flex Plus 15 IN Turquesa",
            slug: "Zapatillas-Futbol-Sala-Top-Flex-Plus-15-IN-Turquesa",
            descripcion: "Zapatillas de fútbol sala diseñadas para un rendimiento confiable en cancha. El modelo Cancha acompaña el juego con una combinación equilibrada de confort, control y estabilidad, pensado para jugadores que buscan precisión en los gestos técnicos propios del futsal.",
            precio_base_venta: 380,
            generoNombre: "Hombre",
            categoriaNombre: "Deportivo",
            subcategoriaNombre: "Deportivo",
            marcaNombre: "joma",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Turquesa", url: "96.png" },
                { colorNombre: "Turquesa", url: "97.png" },
                { colorNombre: "Turquesa", url: "98.png" },
                { colorNombre: "Turquesa", url: "99.png" },
            ],
            combinaciones: [
                { colorNombre: "Turquesa", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Turquesa", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Turquesa", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Turquesa", tallaValor: "41", cantidad_stock: 6 },
            ]
        },
        // Calzado especializado
        {
            nombre: "Calzado de seguridad Kotka Werken ",
            slug: "Calzado-de-seguridad-Kotka-Werken",
            descripcion: "Calzado de seguridad Kotka Werken. Calzado de seguridad con puntera de acero, suela antideslizante y diseño ergonómico para protección y comodidad en el trabajo.",
            precio_base_venta: 150,
            generoNombre: "Hombre",
            categoriaNombre: "Calzado Especializado",
            subcategoriaNombre: "Botas",
            marcaNombre: "",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Negro", url: "100.png" },
                { colorNombre: "Negro", url: "101.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 6 },
            ],

        },
        {
            nombre: "Calzado de seguridad Grizzly Werken",
            slug: "Calzado-de-seguridad-Grizzly-Werken",
            descripcion: "Calzado de seguridad Grizzly Werken. Calzado de seguridad con puntera de acero, suela antideslizante y diseño ergonómico para protección y comodidad en el trabajo.",
            precio_base_venta: 150,
            generoNombre: "Hombre",
            categoriaNombre: "Calzado Especializado",
            subcategoriaNombre: "Botas",
            tipoTallaNombre: "Calzado",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Marrón", url: "102.png" },
                { colorNombre: "Marrón", url: "103.png" },
            ],
            combinaciones: [
                { colorNombre: "Marrón", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "40", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Calzado de Seguridad Eins Dielectrico Kofi NTP ISO 20345 Marrón",
            slug: "Calzado-de-Seguridad-Eins-Dielectrico-Kofi-NTP-ISO-20345-Marrón",
            descripcion: "Calzado de seguridad Eins Dielectrico Kofi NTP ISO 20345 Marrón. Calzado de seguridad con puntera de acero, suela antideslizante y diseño ergonómico para protección y comodidad en el trabajo.",
            precio_base_venta: 150,
            generoNombre: "Hombre",
            categoriaNombre: "Calzado Especializado",
            subcategoriaNombre: "Botas",
            marcaNombre: "",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Marrón", url: "104.png" },
                { colorNombre: "Marrón", url: "105.png" },
            ],
            combinaciones: [
                { colorNombre: "Marrón", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "40", cantidad_stock: 6 },
            ],
        },

        // ** subcatgegoria zapatillas-casuales

        // 
        {
            nombre: "Zapatillas Urbanas Hombre Nike Pacific",
            slug: "zapatillas-urbanas-hombre-nike-pacific",
            descripcion: "Zapatilla icónica con amortiguación Nike Max y diseño urbano.",
            precio_base_venta: 80,
            generoNombre: "Hombre",
            categoriaNombre: "Zapatillas",
            subcategoriaNombre: "Zapatillas",
            marcaNombre: "Nike",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Negro", url: "30.png" },
                { colorNombre: "Negro", url: "31.png" },

                // 
                { colorNombre: "Azul", url: "28.png" },
                { colorNombre: "Azul", url: "29.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad_stock: 6 },
            ]
        },

        // Marca columbia
        {
            nombre: "Botines Para Hombre Outdry™ Peakfreak™ II Plomos Columbia",
            slug: "Botines-para-hombre-outdry-peakfreak-II-Plomos-Columbia",
            descripcion: "Botines Para Hombre Outdry™ Peakfreak™ II Plomos Columbia.Aventura sin límites. Estos botines de senderismo de media caña y alto rendimiento no solo son impermeables, sino que también cuentan con una suela ultra adherente para una tracción excepcional en senderos húmedos o secos.",
            precio_base_venta: 550,
            generoNombre: "Hombre",
            categoriaNombre: "Botines y Botas",
            subcategoriaNombre: "Botines",
            marcaNombre: "Columbia",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Negro", url: "32.png" },
                { colorNombre: "Negro", url: "33.png" },
                { colorNombre: "Negro", url: "34.png" },
                { colorNombre: "Negro", url: "35.png" },
                { colorNombre: "Negro", url: "36.png" },

                // 
                { colorNombre: "Azul", url: "37.png" },
                { colorNombre: "Azul", url: "38.png" },
                { colorNombre: "Azul", url: "39.png" },
                { colorNombre: "Azul", url: "40.png" },
                { colorNombre: "Azul", url: "41.png" },

            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad_stock: 6 },

                { colorNombre: "azul", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "42", cantidad_stock: 6 },

            ]
        },
        {
            nombre: "Botas Para Mujer Impermeable strata Trail™ Grises Columbia",
            slug: "Botas-para-Mujer-Impermeable-strata-Trail-Grises-Columbia",
            descripcion: "Botas Para Mujer Impermeablestrata Trail™ Grises Columbia. Impermeable y adherente. Estos zapatos livianos de altura media te permitirán caminar por senderos en condiciones difíciles y están confeccionados con una lengüeta reforzada para evitar la entrada de escombros, para que tus pies se mantengan cómodos.",
            precio_base_venta: 500,
            generoNombre: "Mujer",
            categoriaNombre: "Botines y Botas",
            subcategoriaNombre: "Botines",
            marcaNombre: "Columbia",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Café", url: "42.png" },
                { colorNombre: "Café", url: "43.png" },
                { colorNombre: "Café", url: "44.png" },
                { colorNombre: "Café", url: "45.png" },
            ],
            combinaciones: [
                { colorNombre: "Café", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Café", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Café", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Café", tallaValor: "41", cantidad_stock: 6 },

            ]
        },

        {
            nombre: "Botines Para Hombre Botas de Cuero Newton Wander™ Negras Columbia",
            slug: "Botines-Para-Hombre-Botas-de-Cuero-Newton-Wander-Negras-Columbia",
            descripcion: "Botas Para Mujer Impermeablestrata Trail™ Grises Columbia. Impermeable y adherente. Estos zapatos livianos de altura media te permitirán caminar por senderos en condiciones difíciles y están confeccionados con una lengüeta reforzada para evitar la entrada de escombros, para que tus pies se mantengan cómodos.",
            precio_base_venta: 580,
            generoNombre: "Hombre",
            categoriaNombre: "Botines y Botas",
            subcategoriaNombre: "Botines",
            marcaNombre: "Columbia",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Marrón", url: "46.png" },
                { colorNombre: "Marrón", url: "47.png" },
                { colorNombre: "Marrón", url: "48.png" },
                { colorNombre: "Marrón", url: "49.png" },
                { colorNombre: "Marrón", url: "50.png" },

                { colorNombre: "Gris Oscuro", url: "51.png" },
                { colorNombre: "Gris Oscuro", url: "52.png" },
                { colorNombre: "Gris Oscuro", url: "53.png" },
                { colorNombre: "Gris Oscuro", url: "54.png" },

                { colorNombre: "Negro", url: "55.png" },
                { colorNombre: "Negro", url: "56.png" },
                { colorNombre: "Negro", url: "57.png" },
                { colorNombre: "Negro", url: "58.png" },
            ],
            combinaciones: [
                { colorNombre: "Marrón", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "42", cantidad_stock: 6 },

                { colorNombre: "Gris Oscuro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Gris Oscuro", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Gris Oscuro", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Gris Oscuro", tallaValor: "42", cantidad_stock: 6 },

                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "42", cantidad_stock: 6 },
            ],
        },

        // Zandalias
        {
            nombre: "Nike Air Max Cirro",
            slug: "Nike-Air-Max-Cirro",
            descripcion: "Ya sea que vayas al gimnasio o a la tienda, creamos el punto medio perfecto que brinda estilo rápido y comodidad increíble. El Air visible y grande en el talón se combina con una plantilla de espuma cómoda para dar una declaración total de comodidad.",
            precio_base_venta: 580,
            generoNombre: "Hombre",
            categoriaNombre: "Sandalias",
            subcategoriaNombre: "Sandalias",
            marcaNombre: "Nike",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Turquesa", url: "59.png" },
                { colorNombre: "Turquesa", url: "60.png" },
                { colorNombre: "Turquesa", url: "61.png" },
                { colorNombre: "Turquesa", url: "62.png" },

                { colorNombre: "Negro", url: "63.png" },
                { colorNombre: "Negro", url: "64.png" },
                { colorNombre: "Negro", url: "65.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "42", cantidad_stock: 6 },

                { colorNombre: "Turquesa", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Turquesa", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Turquesa", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Turquesa", tallaValor: "42", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Sandalias Deportivas Nike Victori One",
            slug: "Sandalias-Deportivas-Nike-Victori-One",
            descripcion: "Las sandalias Nike Victori One combinan un diseño moderno con la comodidad de una plantilla acolchada, ofreciendo un estilo versátil para cualquier ocasión. Con correas ajustables y una suela duradera, estas sandalias son perfectas para mantener tus pies frescos y cómodos durante todo el día.",
            precio_base_venta: 120,
            generoNombre: "Hombre",
            categoriaNombre: "Sandalias",
            subcategoriaNombre: "Sandalias",
            marcaNombre: "Nike",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Blanco", url: "106.png" },
                { colorNombre: "Blanco", url: "107.png" },
                { colorNombre: "Blanco", url: "108.png" },
                { colorNombre: "Blanco", url: "109.png" },
                { colorNombre: "Negro", url: "110.png" },
                { colorNombre: "Negro", url: "111.png" },
                { colorNombre: "Negro", url: "112.png" },

            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "42", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "42", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Sandalias Nike Offcourt",
            slug: "Sandalias-Nike-Offcourt",
            descripcion: "Las sandalias Nike Offcourt combinan un diseño moderno con la comodidad de una plantilla acolchada, ofreciendo un estilo versátil para cualquier ocasión. Con correas ajustables y una suela duradera, estas sandalias son perfectas para mantener tus pies frescos y cómodos durante todo el día.",
            precio_base_venta: 150,
            generoNombre: "Hombre",
            categoriaNombre: "Sandalias",
            subcategoriaNombre: "Sandalias",
            marcaNombre: "Nike",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Marrón", url: "113.png" },
                { colorNombre: "Marrón", url: "114.png" },
                { colorNombre: "Marrón", url: "115.png" },
                { colorNombre: "Negro", url: "116.png" },
                { colorNombre: "Negro", url: "117.png" },
            ],
            combinaciones: [
                { colorNombre: "Marrón", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "42", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "42", cantidad_stock: 6 },
            ],
        },

        // pantuflas
        {
            nombre: "Sandalias pantuflas ugg cozetta curly mujer",
            slug: "SANDALIAS-PANTUFLAS-UGG-COZETTA-CURLY-MUJER",
            descripcion: "Además de un empeine de piel de oveja rizada supersuave y nuestro emblemático forro UGGplush™, las Cozetta cuentan con una suela de espuma SugarSole™ de origen sostenible hecha con caña de azúcar renovable, que ofrece amortiguación tanto en interiores como en exteriores para que puedas llevarte la sensación de UGG vayas donde vayas. Combínalas con tu ropa de fin de semana favorita. Material Piel de Oveja.",
            precio_base_venta: 80,
            generoNombre: "Mujer",
            categoriaNombre: "Pantuflas y Calzado de Casa",
            subcategoriaNombre: "Pantuflas",
            marcaNombre: "",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Rosado", url: "78.png" },
                { colorNombre: "Rosado", url: "79.png" },
                { colorNombre: "Rosado", url: "80.png" },

            ],
            combinaciones: [
                { colorNombre: "Rosado", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "40", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Pantufla Infantil con Diseño",
            slug: "Pantufla-Infantil-con-Diseño",
            descripcion: "Pantuflas infantiles con diseño estampado y suela firma y resistente.",
            precio_base_venta: 40,
            generoNombre: "Niñas",
            categoriaNombre: "Pantuflas y Calzado de Casa",
            subcategoriaNombre: "Pantuflas",
            marcaNombre: "",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Azul Claro", url: "81.png" },
                { colorNombre: "Azul Claro", url: "82.png" },

                { colorNombre: "Rosado", url: "83.png" },
                { colorNombre: "Rosado", url: "84.png" },


            ],
            combinaciones: [
                { colorNombre: "Azul Claro", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "40", cantidad_stock: 6 },

                { colorNombre: "Rosado", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "40", cantidad_stock: 6 },



            ],
        },

        {
            nombre: "Pantuflas Mujer Unicornio Hypnotic",
            slug: "Pantuflas-Mujer-Unicornio-Hypnotic",
            descripcion: "Pantuflas mujer Disfruta de lo nuevo en Lencería, Pantuflas Mujer Unicornio Hypnotic. Compra Online solo en calazdoAmazonica.pe",
            precio_base_venta: 60,
            generoNombre: "Mujer",
            categoriaNombre: "Pantuflas y Calzado de Casa",
            subcategoriaNombre: "Pantuflas",
            marcaNombre: "",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Rosado", url: "85.png" },
                { colorNombre: "Rosado", url: "86.png" },
                { colorNombre: "Rosado", url: "87.png" },
            ],
            combinaciones: [
                { colorNombre: "Rosado", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "40", cantidad_stock: 6 },
            ],
        },
        // Tacos  y tacones

        {
            nombre: "Impuls Sandalias Taco Mujer Negro Ariana04",
            slug: "Impuls-Sandalias-Taco-Mujer-Negro-Ariana04",
            descripcion: "Impuls Sandalias Taco Mujer Negro Ariana04 de la marca Impuls. Sandalias con taco que elevan tu estilo con elegancia y actitud. Diseñadas para realzar la figura y destacar en cada ocasión, combinan líneas modernas con detalles que marcan la diferencia.",
            precio_base_venta: 180,
            generoNombre: "Mujer",
            categoriaNombre: "Tacos y Tacones",
            subcategoriaNombre: "Tacones",
            tipoTallaNombre: "Calzado",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Negro", url: "66.png" },
                { colorNombre: "Negro", url: "67.png" },

            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
            ],
        },

        {
            nombre: "Impuls Sandalia Taco Mujer Blanco Natasha03",
            slug: "Impuls-Sandalia-Taco-Mujer-Blanco-Natasha03",
            descripcion: "Impuls Sandalia Taco Mujer Blanco Natasha03 de la marca Impuls. Sandalias con taco que elevan tu estilo con elegancia y actitud. Diseñadas para realzar la figura y destacar en cada ocasión, combinan líneas modernas con detalles que marcan la diferencia.",
            precio_base_venta: 120,
            generoNombre: "Mujer",
            categoriaNombre: "Tacos y Tacones",
            subcategoriaNombre: "Tacones",
            tipoTallaNombre: "Calzado",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "crema", url: "68.png" },
                { colorNombre: "crema", url: "69.png" },
                { colorNombre: "crema", url: "70.png" },
                { colorNombre: "crema", url: "71.png" },

            ],
            combinaciones: [
                { colorNombre: "crema", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "crema", tallaValor: "39", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Impuls Taco elegante Mujer Negro Meja sort",
            slug: "impuls-taco-elegante-mujer-negro-meja-sort",
            descripcion: "Impuls Sandalias Taco Mujer Negro Meja06 de la marca Impuls. Sandalias con taco que elevan tu estilo con elegancia y actitud. Diseñadas para realzar la figura y destacar en cada ocasión, combinan líneas modernas con detalles que marcan la diferencia.",
            precio_base_venta: 120,
            generoNombre: "Mujer",
            categoriaNombre: "Tacos y Tacones",
            subcategoriaNombre: "Tacones",
            marcaNombre: "",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Negro", url: "72.png" },
                { colorNombre: "Negro", url: "73.png" },
                { colorNombre: "Negro", url: "74.png" },

            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Impuls Sandalia Taco Mujer Hielo Meja04",
            slug: "impuls-taco-elegante-mujer-negro-meja-sort-elegante-diseño",
            descripcion: "Impuls Sandalias Taco Mujer Negro Meja06 de la marca Impuls. Sandalias con taco que elevan tu estilo con elegancia y actitud. Diseñadas para realzar la figura y destacar en cada ocasión, combinan líneas modernas con detalles que marcan la diferencia.",
            precio_base_venta: 120,
            generoNombre: "Mujer",
            categoriaNombre: "Tacos y Tacones",
            subcategoriaNombre: "Tacones",
            marcaNombre: "",
            tipoTallaNombre: "Calzado",
            imagenes: [
                { colorNombre: "Blanco", url: "75.png" },
                { colorNombre: "Blanco", url: "76.png" },
                { colorNombre: "Blanco", url: "77.png" },

            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "38", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "39", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "40", cantidad_stock: 6 },

            ],
        },

        // Polos mujeres hombres niños niñas unisex com marca y sin marca

        {
            nombre: "Polos Top Tee Deportivo Forte ultra",
            descripcion: " Disponible En Morado De Responsabilidad: Debido Al Proceso De Impresión, Puede Producirse Una Diferencia En La Saturación. Cada Prenda Es Única. La Ubicación De La Impresión Variará.",
            precio_base_venta: 80,
            generoNombre: "Hombre",
            categoriaNombre: "Polos",
            subcategoriaNombre: "Polos",
            tipoTallaNombre: "Prendas superiores",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Blanco", url: "118.png" },
                { colorNombre: "Blanco", url: "119.png" },
                { colorNombre: "Negro", url: "120.png" },
                { colorNombre: "Negro", url: "121.png" },
            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "Xl", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Polos Top Tee Deportivo Forte",
            descripcion: "Descargo De Responsabilidad: Debido Al Proceso De Impresión, Puede Producirse Una Diferencia En La Saturación. Cada Prenda Es Única. La Ubicación De La Impresión Variará.",
            precio_base_venta: 80,
            generoNombre: "Hombre",
            categoriaNombre: "Polos",
            subcategoriaNombre: "Polos",
            tipoTallaNombre: "Prendas superiores",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Morado", url: "122.png" },
                { colorNombre: "Morado", url: "123.png" },
            ],
            combinaciones: [
                { colorNombre: "Morado", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Morado", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Morado", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Morado", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Polos  De Manga Corta Dragon Ball Z Trunks",
            descripcion: "De Manga Corta Dragon Ball Z Trunks De Manga Corta Dragon Ball Z Trunks Debido Al Proceso De Impresión, Puede Producirse Una Diferencia En La Saturación. Cada Prenda Es Única. La Ubicación De La Impresión Variará.",
            precio_base_venta: 70,
            generoNombre: "Mujer",
            categoriaNombre: "Polos",
            subcategoriaNombre: "Polos",
            tipoTallaNombre: "Prendas superiores",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Negro", url: "124.png" },
                { colorNombre: "Negro", url: "125.png" },
                { colorNombre: "Negro", url: "126.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },
        // Camisas
        {
            nombre: "Camisa Top Crown Rugby Striped Quarter Zip - Azul",
            descripcion: "De Manga Corta Dragon Ball Z Trunks De Manga Corta Dragon Ball Z Trunks Debido Al Proceso De Impresión, Puede Producirse Una Diferencia En La Saturación. Cada Prenda Es Única. La Ubicación De La Impresión Variará.",
            precio_base_venta: 70,
            generoNombre: "Mujer",
            categoriaNombre: "Polos",
            subcategoriaNombre: "Camisas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Azul", url: "127.png" },
                { colorNombre: "Azul", url: "128.png" },
                { colorNombre: "Azul", url: "129.png" },
            ],
            combinaciones: [
                { colorNombre: "Azul", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Polo Top Barbie Classic Jersey",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 50,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Polos",
            tipoTallaNombre: "Prendas superiores",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Rosado", url: "135.png" },
                { colorNombre: "Rosado", url: "136.png" },

            ],
            combinaciones: [
                { colorNombre: "Rosado", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Polo elegante Top Barbies Classic Jersey",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 60,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Polos",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Naranja", url: "137.png" },
                { colorNombre: "Naranja", url: "138.png" },
                { colorNombre: "Naranja", url: "139.png" },



            ],
            combinaciones: [
                { colorNombre: "Naranja", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Naranja", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Naranja", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Naranja", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },
        // Polo mujer nike
        {
            nombre: "Polo crochet Tee",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 145,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Polos",
            marcaNombre: "Nike",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Rojo", url: "232.png" },
                { colorNombre: "Rojo", url: "233.png" },
            ],
            combinaciones: [
                { colorNombre: "Rojo", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },
        // {
        //     nombre: "Polo essentials small logo cooton",
        //     descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
        //     precio_base_venta: 59,
        //     generoNombre: "Mujer",
        //     categoriaNombre: "Poleras",
        //     subcategoriaNombre: "Polos",
        //     marcaNombre: "Nike",
        //     tipoTallaNombre: "Prendas superiores",
        //     imagenes: [
        //         { colorNombre: "Rojo", url: "234.png" },
        //         { colorNombre: "Rojo", url: "235.png" },
        //     ],
        //     combinaciones: [
        //         { colorNombre: "Rojo", tallaValor: "S", cantidad_stock: 6 },
        //         { colorNombre: "Rojo", tallaValor: "M", cantidad_stock: 6 },
        //         { colorNombre: "Rojo", tallaValor: "L", cantidad_stock: 6 },
        //         { colorNombre: "Rojo", tallaValor: "Xl", cantidad_stock: 6 },
        //     ],
        // },
        {
            nombre: "Camisa Top All Star Crochet Cropped ",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 60,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Camisas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Verde", url: "140.png" },
                { colorNombre: "Verde", url: "141.png" },

                { colorNombre: "Rojo", url: "142.png" },
                { colorNombre: "Rojo", url: "143.png" },
                { colorNombre: "Rojo", url: "144.png" },



            ],
            combinaciones: [
                { colorNombre: "Verde", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Verde", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Verde", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Verde", tallaValor: "Xl", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Camisa Top All Star Crochet Cropped",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 60,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Poleras",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Negro", url: "131.png" },
                { colorNombre: "Negro", url: "132.png" },

                { colorNombre: "Rojo", url: "133.png" },
                { colorNombre: "Rojo", url: "134.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "Xl", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Polo NBA LA Lakers Washed Oversized",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 35,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Poleras",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Morado", url: "145.png" },
                { colorNombre: "Morado", url: "146.png" },
            ],
            combinaciones: [
                { colorNombre: "Morado", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Morado", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Morado", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Morado", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Polo NBA  LA Lakers Camo - Camuflaje",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 35,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Polos",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Marrón", url: "147.png" },
                { colorNombre: "Marrón", url: "148.png" },
                { colorNombre: "Marrón", url: "149.png" },
                { colorNombre: "Marrón", url: "150.png" },

            ],
            combinaciones: [
                { colorNombre: "Marrón", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Marrón", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Polo De Manga Corta Conquer Your Fears",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 55,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Camisas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Azul Claro", url: "151.png" },
                { colorNombre: "Azul Claro", url: "152.png" },
            ],
            combinaciones: [
                { colorNombre: "Azul Claro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Camisa de playa elegante TY",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 35,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Polos",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Rosado", url: "153.png" },
                { colorNombre: "Rosado", url: "154.png" },
            ],
            combinaciones: [
                { colorNombre: "Rosado", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Camisa Polo Strikeout Short Sleeve - Negro",
            descripcion: "Polo Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 35,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Camisas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Negro", url: "157.png" },
                { colorNombre: "Negro", url: "158.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Camisa Bold Metric Cuban - Vino Tinto",
            descripcion: "Camisa Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 35,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Camisas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Naranjado", url: "159.png" },
                { colorNombre: "Naranjado", url: "160.png" },
                { colorNombre: "Rojo", url: "161.png" },
                { colorNombre: "Rojo", url: "162.png" },
            ],
            combinaciones: [
                { colorNombre: "Narranjado", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Naranjado", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Naranjado", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Naranjado", tallaValor: "Xl", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Camisa Darceys Poplin",
            descripcion: "Camisa Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 70,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Camisas",
            tipoTallaNombre: "Prendas superiores",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Rojo", url: "163.png" },
                { colorNombre: "Rojo", url: "164.png" },
            ],
            combinaciones: [
                { colorNombre: "Rojo", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Camisa Long Live Linens",
            descripcion: "Camisa Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 70,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Camisas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Blanco", url: "165.png" },
                { colorNombre: "Blanco", url: "166.png" },
            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Camisa Abotonada Dean Textured Long Sleeve",
            descripcion: "Camisa Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 70,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Camisas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Negro", url: "167.png" },
                { colorNombre: "Negro", url: "168.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Camisa Abotonada Ryland",
            descripcion: "Camisa Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 70,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Camisas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Blanco", url: "169.png" },
                { colorNombre: "Blanco", url: "170.png" },
                { colorNombre: "Negro", url: "171.png" },
                { colorNombre: "Negro", url: "172.png" },
            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "Xl", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "Xl", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Polo De Manga Corta Bless Dreams Oversized",
            descripcion: "Camisa Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 70,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Polos",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Blanco", url: "173.png" },
                { colorNombre: "Blanco", url: "174.png" },
            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Camisa Mini Ashford Linen - Bronceado",
            descripcion: "Camisa Top Barbie Classic Jersey confeccionado en tela suave tipo jersey, con estilo moderno y fit favorecedor para resaltar tu outfit en cualquier ocasión.",
            precio_base_venta: 70,
            generoNombre: "Niños",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Camisas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Negro", url: "175.png" },
                { colorNombre: "Negro", url: "176.png" },
                { colorNombre: "Crema", url: "177.png" },
                { colorNombre: "Crema", url: "178.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "Xl", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "Xl", cantidad_stock: 6 },
            ],
        },

        // PANTALONES (Mujer)
        {
            nombre: "Pantalón Iman Pinstripe Trouser",
            descripcion: "Pantalón de mujer Iman Pinstripe Trouser con diseño de rayas finas, corte recto y ajuste cómodo. Ideal para outfits formales, oficina o looks casuales elegantes. Confeccionado en tela ligera y versátil, perfecto para combinar con blusas, camisas o blazers.",
            precio_base_venta: 100,
            generoNombre: "Mujer",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Pantalones",
            marcaNombre: "",
            tipoTallaNombre: "Prendas inferiores",
            imagenes: [
                { colorNombre: "Negro", url: "206.png" },
                { colorNombre: "Negro", url: "207.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "29", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "30", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "31", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "32", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "33", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "34", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Pantalón De Mezclilla Holgado Never Changing - Deslavado Medio",
            descripcion: "Pantalón de mujer Iman Pinstripe Trouser con diseño de rayas finas, corte recto y ajuste cómodo. Ideal para outfits formales, oficina o looks casuales elegantes. Confeccionado en tela ligera y versátil, perfecto para combinar con blusas, camisas o blazers.",
            precio_base_venta: 100,
            generoNombre: "Mujer",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Pantalones",
            marcaNombre: "",
            tipoTallaNombre: "Prendas inferiores",
            imagenes: [
                { colorNombre: "Azul Claro", url: "208.png" },
                { colorNombre: "Azul Claro", url: "209.png" }
            ],
            combinaciones: [
                { colorNombre: "Azul Claro", tallaValor: "29", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "30", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "31", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "32", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "33", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "34", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Pantalón de Mezclilla Ajustado Limitless Pedal Pusher - Deslavado Oscuro",
            descripcion: "Pantalón de mujer Iman Pinstripe Trouser con diseño de rayas finas, corte recto y ajuste cómodo. Ideal para outfits formales, oficina o looks casuales elegantes. Confeccionado en tela ligera y versátil, perfecto para combinar con blusas, camisas o blazers.",
            precio_base_venta: 70,
            generoNombre: "Mujer",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Pantalones",
            marcaNombre: "",
            tipoTallaNombre: "Prendas inferiores",
            imagenes: [
                { colorNombre: "Azul", url: "210.png" },
                { colorNombre: "Azul", url: "211.png" }
            ],
            combinaciones: [
                { colorNombre: "Azul", tallaValor: "29", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "30", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "31", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "32", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "33", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "34", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Pantalón Conjunto Polly Halter Capri  Negro",
            descripcion: "Pantalón de mujer Iman Pinstripe Trouser con diseño de rayas finas, corte recto y ajuste cómodo. Ideal para outfits formales, oficina o looks casuales elegantes. Confeccionado en tela ligera y versátil, perfecto para combinar con blusas, camisas o blazers.",
            precio_base_venta: 110,
            generoNombre: "Mujer",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Pantalones",
            marcaNombre: "",
            tipoTallaNombre: "Prendas inferiores",
            imagenes: [
                { colorNombre: "Negro", url: "212.png" },
                { colorNombre: "Negro", url: "213.png" }
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "29", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "30", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "31", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "32", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "33", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "34", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Pantalón Mallas Valentina Solid Lace Trim Capri",
            descripcion: "Pantalón de mujer Iman Pinstripe Trouser con diseño de rayas finas, corte recto y ajuste cómodo. Ideal para outfits formales, oficina o looks casuales elegantes. Confeccionado en tela ligera y versátil, perfecto para combinar con blusas, camisas o blazers.",
            precio_base_venta: 80,
            generoNombre: "Mujer",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Pantalones",
            marcaNombre: "",
            tipoTallaNombre: "Prendas inferiores",
            imagenes: [
                { colorNombre: "Blanco", url: "214.png" },
                { colorNombre: "Blanco", url: "215.png" },

                { colorNombre: "Rojo", url: "216.png" },
                { colorNombre: "Rojo", url: "217.png" },

                { colorNombre: "Azul", url: "218.png" },
                { colorNombre: "Azul", url: "219.png" },
            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "29", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "30", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "31", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "32", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "33", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "34", cantidad_stock: 6 },

                { colorNombre: "Rojo", tallaValor: "29", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "30", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "31", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "32", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "33", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "34", cantidad_stock: 6 },

                { colorNombre: "Azul", tallaValor: "29", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "30", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "31", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "32", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "33", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "34", cantidad_stock: 6 },

            ],
        },

        // PANTALONS (Hombre)
        {
            nombre: "Pantalón De Mezclilla Chaos Embroidery Straigh",
            descripcion: "Pantalón Iman Pinstripe Trouser para hombre, con diseño de líneas finas que aportan elegancia y estilizan la silueta. Corte recto de inspiración sastrera, con caída fluida y acabado sofisticado. Ideal para looks formales o combinaciones smart casual con un toque moderno.",
            precio_base_venta: 130,
            generoNombre: "Hombre",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Pantalones",
            marcaNombre: "",
            tipoTallaNombre: "Prendas inferiores",
            imagenes: [
                { colorNombre: "Negro", url: "220.png" },
                { colorNombre: "Negro", url: "221.png" },
            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "29", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "30", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "31", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "32", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "33", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "34", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Pantalón Show Up Relaxed - Hueso",
            descripcion: "Pantalón Iman Pinstripe Trouser para hombre, con diseño de líneas finas que aportan elegancia y estilizan la silueta. Corte recto de inspiración sastrera, con caída fluida y acabado sofisticado. Ideal para looks formales o combinaciones smart casual con un toque moderno.",
            precio_base_venta: 110,
            generoNombre: "Hombre",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Pantalones",
            marcaNombre: "",
            tipoTallaNombre: "Prendas inferiores",
            imagenes: [
                { colorNombre: "Blanco", url: "222.png" },
                { colorNombre: "Blanco", url: "223.png" },
            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "29", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "30", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "31", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "32", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "33", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "34", cantidad_stock: 6 },

            ],
        },

        // VESTIDOS (Mujer)
        {
            nombre: "Vestido Midi De Malla Evening Of Romance",
            descripcion: "Vestido largo de mujer con diseño elegante y silueta fluida que realza la figura. Confeccionado en tela ligera y de caída suave, ideal para ocasiones especiales o looks sofisticados. Su estilo versátil permite combinarlo con tacones o sandalias para un acabado impecable.",
            precio_base_venta: 100,
            generoNombre: "Mujer",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Vestidos",
            marcaNombre: "",
            tipoTallaNombre: "Prendas completas",
            imagenes: [
                { colorNombre: "Rosado", url: "224.png" },
                { colorNombre: "Rosado", url: "225.png" },
            ],
            combinaciones: [
                { colorNombre: "Rosado", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "XS", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Vestido Maxi De Chifón Ingrid - Azul-Combinado",
            descripcion: "Vestido largo de mujer con diseño elegante y silueta fluida que realza la figura. Confeccionado en tela ligera y de caída suave, ideal para ocasiones especiales o looks sofisticados. Su estilo versátil permite combinarlo con tacones o sandalias para un acabado impecable.",
            precio_base_venta: 150,
            generoNombre: "Mujer",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Vestidos",
            marcaNombre: "",
            tipoTallaNombre: "Prendas completas",
            imagenes: [
                { colorNombre: "Azul Claro", url: "229.png" },
                { colorNombre: "Azul Claro", url: "230.png" },
                { colorNombre: "Azul Claro", url: "231.png" },
            ],
            combinaciones: [
                { colorNombre: "Azul Claro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "XS", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Vestido Midi Building A Dynasty Jacquard",
            descripcion: "Vestido largo de mujer con diseño elegante y silueta fluida que realza la figura. Confeccionado en tela ligera y de caída suave, ideal para ocasiones especiales o looks sofisticados. Su estilo versátil permite combinarlo con tacones o sandalias para un acabado impecable.",
            precio_base_venta: 150,
            generoNombre: "Mujer",
            categoriaNombre: "Ropa",
            subcategoriaNombre: "Vestidos",
            marcaNombre: "",
            tipoTallaNombre: "Prendas completas",
            imagenes: [
                { colorNombre: "Rosado", url: "226.png" },
                { colorNombre: "Rosado", url: "227.png" },
                { colorNombre: "Rosado", url: "228.png" },
            ],
            combinaciones: [
                { colorNombre: "Rosado", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "XS", cantidad_stock: 6 },

            ],
        },
        // CASACAS
        {
            nombre: "Casaca Trucker High Standards 90's Boyfriend Denim - Deslavado Medio",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 110,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Azul", url: "179.png" },
                { colorNombre: "Azul", url: "180.png" },
            ],
            combinaciones: [
                { colorNombre: "Azul", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "L", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Casaca Shacket Most Unfettered Denim",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 85,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Gris", url: "181.png" },
                { colorNombre: "Gris", url: "182.png" },
                { colorNombre: "Gris", url: "183.png" },
            ],
            combinaciones: [
                { colorNombre: "Gris", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Gris", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Gris", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Gris", tallaValor: "xL", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Casaca moda para toda ocasion Most Unfettered Denim",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 150,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            tipoTallaNombre: "Prendas superiores",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Blanco", url: "188.png" },
                { colorNombre: "Blanco", url: "189.png" },
                { colorNombre: "Blanco", url: "190.png" },
                { colorNombre: "Negro", url: "191.png" },
                { colorNombre: "Negro", url: "192.png" },
            ],
            combinaciones: [
                { colorNombre: "Blanco", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Blanco", tallaValor: "xL", cantidad_stock: 6 },

                { colorNombre: "Negro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "L", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Casaca Sheracket Love You More Denim",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 85,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            tipoTallaNombre: "Prendas superiores",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Rosado", url: "184.png" },
                { colorNombre: "Rosado", url: "185.png" },
            ],
            combinaciones: [
                { colorNombre: "Rosado", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "xL", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Casaca Chamarwra Sydnsrey Windbreakser",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 40,
            generoNombre: "Mujer",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            tipoTallaNombre: "Prendas superiores",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Rosado", url: "186.png" },
                { colorNombre: "Rosado", url: "187.png" },
            ],
            combinaciones: [
                { colorNombre: "Rosado", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rosado", tallaValor: "xL", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Casaca Chamarra Noven Eedge Suedew",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 120,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Negro", url: "193.png" },
                { colorNombre: "Negro", url: "194.png" },


            ],
            combinaciones: [
                { colorNombre: "Negro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Negro", tallaValor: "L", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Casaca Abwotonada Jeweleds Dwiamond Drift Denim",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 100,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            tipoTallaNombre: "Prendas superiores",
            marcaNombre: "",
            imagenes: [
                { colorNombre: "Azul Claro", url: "195.png" },
                { colorNombre: "Azul Claro", url: "196.png" },


            ],
            combinaciones: [
                { colorNombre: "Azul Claro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "L", cantidad_stock: 6 },
            ],
        },
        {
            nombre: "Casaca Sudadera Tysfon Marino",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 100,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Azul", url: "200.png" },
                { colorNombre: "Azul", url: "201.png" },
                { colorNombre: "Rojo", url: "202.png" },
                { colorNombre: "Rojo", url: "203.png" },
            ],
            combinaciones: [
                { colorNombre: "Azul", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Azul", tallaValor: "XL", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Rojo", tallaValor: "XL", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Casaca  Abotonada Reodeo Denim",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 100,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Azul Claro", url: "198.png" },
                { colorNombre: "Azul Claro", url: "199.png" },


            ],
            combinaciones: [
                { colorNombre: "Azul Claro", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Azul Claro", tallaValor: "XL", cantidad_stock: 6 },

            ],
        },
        {
            nombre: "Casaca Sudadera Lasso Embroideryse",
            descripcion: "Casaca Trucker 90’s Boyfriend Denim – Deslavado Medio. Fit oversize, estilo retro, con bolsillos frontales y cierre de botones metálicos. Denim cómodo y versátil para uso casual.",
            precio_base_venta: 62,
            generoNombre: "Hombre",
            categoriaNombre: "Poleras",
            subcategoriaNombre: "Casacas",
            marcaNombre: "",
            tipoTallaNombre: "Prendas superiores",
            imagenes: [
                { colorNombre: "Marron", url: "204.png" },
                { colorNombre: "Marron", url: "205.png" },
            ],
            combinaciones: [
                { colorNombre: "Marron", tallaValor: "S", cantidad_stock: 6 },
                { colorNombre: "Marron", tallaValor: "M", cantidad_stock: 6 },
                { colorNombre: "Marron", tallaValor: "L", cantidad_stock: 6 },
                { colorNombre: "Marron", tallaValor: "XL", cantidad_stock: 6 },

            ],
        },


    ]
}



