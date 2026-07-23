// ─────────────────────────────────────────────────────────────
// Simulación de base de datos — en producción reemplaza
// fetchProductos por una Server Action que llame a Prisma
// ─────────────────────────────────────────────────────────────

export type EstadoProducto = "activo" | "inactivo" | "sin_stock" | "oferta";

export interface ProductoRow {
  id: number;
  nombre: string;
  sku: string;
  categoria: string;
  genero: string;
  marca: string;
  precio: number;
  descuento: number | null;
  stock: number;
  vendidos: number;
  rating: number;
  estado: EstadoProducto;
  activo: boolean;
  creado_en: string;
}

export interface ProductosResponse {
  data: ProductoRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ProductosQuery {
  page: number;
  pageSize: number;
  search?: string;
  categoria?: string;
  estado?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

// ── Dataset (simula 20 filas en BD) ──────────────────────────
const DB: ProductoRow[] = [
  { id:1,  nombre:"Nike Air Max 270",          sku:"NAM270-BLK", categoria:"Calzado",    genero:"Hombre", marca:"Nike",         precio:420, descuento:359,  stock:23,  vendidos:142, rating:4.8, estado:"oferta",    activo:true,  creado_en:"2025-01-10" },
  { id:2,  nombre:"Adidas Ultraboost 22",       sku:"AUB22-WHT",  categoria:"Calzado",    genero:"Mujer",  marca:"Adidas",       precio:380, descuento:null, stock:45,  vendidos:98,  rating:4.6, estado:"activo",    activo:true,  creado_en:"2025-01-15" },
  { id:3,  nombre:"Polo Adidas Essentials",     sku:"PAE-NAV-M",  categoria:"Ropa",       genero:"Unisex", marca:"Adidas",       precio:90,  descuento:75,   stock:67,  vendidos:210, rating:4.4, estado:"oferta",    activo:true,  creado_en:"2025-01-20" },
  { id:4,  nombre:"Mochila Puma Phase 22L",     sku:"MPP22-RED",  categoria:"Accesorios", genero:"Unisex", marca:"Puma",         precio:150, descuento:null, stock:3,   vendidos:75,  rating:4.5, estado:"sin_stock", activo:true,  creado_en:"2025-02-01" },
  { id:5,  nombre:"Short Nike Dri-FIT",         sku:"SND-BLK-L",  categoria:"Ropa",       genero:"Hombre", marca:"Nike",         precio:90,  descuento:null, stock:44,  vendidos:61,  rating:4.2, estado:"activo",    activo:true,  creado_en:"2025-02-05" },
  { id:6,  nombre:"Zapatillas Reebok Nano X3",  sku:"ZRN-PNK-38", categoria:"Calzado",    genero:"Mujer",  marca:"Reebok",       precio:310, descuento:260,  stock:18,  vendidos:54,  rating:4.3, estado:"oferta",    activo:true,  creado_en:"2025-02-10" },
  { id:7,  nombre:"Casaca Under Armour Storm",  sku:"CUA-GRY-XL", categoria:"Ropa",       genero:"Hombre", marca:"Under Armour", precio:220, descuento:null, stock:0,   vendidos:32,  rating:4.1, estado:"sin_stock", activo:true,  creado_en:"2025-02-15" },
  { id:8,  nombre:"Medias Nike Everyday x3",    sku:"MNE-WHT-U",  categoria:"Accesorios", genero:"Unisex", marca:"Nike",         precio:40,  descuento:null, stock:130, vendidos:320, rating:4.7, estado:"activo",    activo:true,  creado_en:"2025-02-20" },
  { id:9,  nombre:"Polo New Balance Sport",     sku:"PNB-BLU-M",  categoria:"Ropa",       genero:"Hombre", marca:"New Balance",  precio:110, descuento:89,   stock:28,  vendidos:47,  rating:4.0, estado:"oferta",    activo:true,  creado_en:"2025-03-01" },
  { id:10, nombre:"Riñonera Adidas Classic",    sku:"RAC-BLK-U",  categoria:"Accesorios", genero:"Unisex", marca:"Adidas",       precio:80,  descuento:null, stock:55,  vendidos:88,  rating:4.3, estado:"activo",    activo:true,  creado_en:"2025-03-05" },
  { id:11, nombre:"Zapatillas Puma Drift Cat",  sku:"ZPD-GRY-42", categoria:"Calzado",    genero:"Mujer",  marca:"Puma",         precio:260, descuento:null, stock:0,   vendidos:22,  rating:3.9, estado:"inactivo",  activo:false, creado_en:"2025-03-10" },
  { id:12, nombre:"Chompa Nike Tech Fleece",    sku:"CNT-BLK-L",  categoria:"Ropa",       genero:"Hombre", marca:"Nike",         precio:290, descuento:240,  stock:11,  vendidos:39,  rating:4.6, estado:"oferta",    activo:true,  creado_en:"2025-03-15" },
  { id:13, nombre:"Pantaloneta Fila Sport",     sku:"PFS-RED-S",  categoria:"Ropa",       genero:"Mujer",  marca:"Fila",         precio:75,  descuento:null, stock:34,  vendidos:29,  rating:4.0, estado:"activo",    activo:true,  creado_en:"2025-03-20" },
  { id:14, nombre:"Gorro Nike Dri-FIT",         sku:"GND-NVY-U",  categoria:"Accesorios", genero:"Unisex", marca:"Nike",         precio:55,  descuento:45,   stock:72,  vendidos:115, rating:4.5, estado:"oferta",    activo:true,  creado_en:"2025-04-01" },
  { id:15, nombre:"Zapatillas Converse All Star",sku:"ZCA-WHT-40",categoria:"Calzado",    genero:"Unisex", marca:"Converse",     precio:200, descuento:null, stock:19,  vendidos:63,  rating:4.4, estado:"activo",    activo:true,  creado_en:"2025-04-05" },
  { id:16, nombre:"Camiseta Puma Liga",         sku:"CPL-YEL-M",  categoria:"Ropa",       genero:"Hombre", marca:"Puma",         precio:85,  descuento:null, stock:0,   vendidos:18,  rating:3.8, estado:"sin_stock", activo:true,  creado_en:"2025-04-10" },
  { id:17, nombre:"Bolso New Balance",          sku:"BNB-GRN-U",  categoria:"Accesorios", genero:"Unisex", marca:"New Balance",  precio:95,  descuento:null, stock:41,  vendidos:52,  rating:4.2, estado:"activo",    activo:true,  creado_en:"2025-04-15" },
  { id:18, nombre:"Vans Old Skool Classic",     sku:"VOC-BLK-41", categoria:"Calzado",    genero:"Unisex", marca:"Vans",         precio:230, descuento:190,  stock:8,   vendidos:77,  rating:4.7, estado:"oferta",    activo:true,  creado_en:"2025-04-20" },
  { id:19, nombre:"Leggings Adidas Techfit",    sku:"LAT-BLK-S",  categoria:"Ropa",       genero:"Mujer",  marca:"Adidas",       precio:130, descuento:null, stock:36,  vendidos:94,  rating:4.5, estado:"activo",    activo:true,  creado_en:"2025-05-01" },
  { id:20, nombre:"Gorra Reebok Classic",       sku:"GRC-RED-U",  categoria:"Accesorios", genero:"Unisex", marca:"Reebok",       precio:50,  descuento:null, stock:0,   vendidos:14,  rating:3.7, estado:"inactivo",  activo:false, creado_en:"2025-05-05" },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Simula latencia de red + query en BD (300–700ms)
export async function fetchProductos(q: ProductosQuery): Promise<ProductosResponse> {
  await sleep(300 + Math.random() * 400);

  let rows = [...DB];

  if (q.search) {
    const s = q.search.toLowerCase();
    rows = rows.filter(
      (p) =>
        p.nombre.toLowerCase().includes(s) ||
        p.sku.toLowerCase().includes(s) ||
        p.marca.toLowerCase().includes(s),
    );
  }

  if (q.categoria && q.categoria !== "Todas")
    rows = rows.filter((p) => p.categoria === q.categoria);

  if (q.estado && q.estado !== "todos")
    rows = rows.filter((p) => p.estado === q.estado);

  if (q.sortBy) {
    rows.sort((a, b) => {
      const av = a[q.sortBy as keyof ProductoRow];
      const bv = b[q.sortBy as keyof ProductoRow];
      if (av == null) return 1;
      if (bv == null) return -1;
      const d = q.sortDir === "desc" ? -1 : 1;
      return av < bv ? -d : av > bv ? d : 0;
    });
  }

  const total      = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / q.pageSize));
  const start      = (q.page - 1) * q.pageSize;

  return {
    data: rows.slice(start, start + q.pageSize),
    total,
    page: q.page,
    pageSize: q.pageSize,
    totalPages,
  };
}
