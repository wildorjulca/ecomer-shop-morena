import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const products = [
  { pos: 1, nombre: "Nike Air Max 270 — Negro", cat: "Calzado · Hombre",  vendidos: 142, ingreso: "S/ 42,600", pct: 100 },
  { pos: 2, nombre: "Polo Adidas Essentials",   cat: "Ropa · Unisex",     vendidos: 98,  ingreso: "S/ 8,820",  pct: 69  },
  { pos: 3, nombre: "Mochila Puma Phase 22L",   cat: "Accesorios",        vendidos: 75,  ingreso: "S/ 11,250", pct: 53  },
  { pos: 4, nombre: "Short Nike Dri-FIT",       cat: "Ropa · Hombre",     vendidos: 61,  ingreso: "S/ 5,490",  pct: 43  },
  { pos: 5, nombre: "Medias Adidas Pack x3",    cat: "Accesorios",        vendidos: 58,  ingreso: "S/ 2,320",  pct: 41  },
];

const posBadge = [
  { bg: "#6A148E", color: "#fff" },
  { bg: "#f3e5f5", color: "#6A148E" },
  { bg: "#f3e5f5", color: "#6A148E" },
];

export default function TopProducts() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <p className="text-[13px] font-medium text-gray-500">Este mes</p>
          <p className="text-base font-bold text-gray-900 mt-0.5">Top productos</p>
        </div>
        <Link
          href="/dashboard/productos"
          className="flex items-center gap-1 text-sm font-semibold hover:underline"
          style={{ color: "#6A148E" }}
        >
          Ver todos <ArrowUpRight size={15} />
        </Link>
      </div>

      <div>
        {products.map((p, i) => {
          const badge = posBadge[p.pos - 1] ?? posBadge[2];
          return (
            <div
              key={p.nombre}
              className="flex items-center gap-4 px-6 py-4 transition-colors cursor-pointer"
              style={{ borderTop: "1px solid #f5f5f5" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Position badge */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: badge.bg, color: badge.color }}
              >
                {p.pos}
              </div>

              {/* Info + bar */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{p.nombre}</p>
                <p className="text-xs text-gray-400 mt-0.5 mb-2">{p.cat}</p>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f5f0f7" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${p.pct}%`, background: "#6A148E" }}
                  />
                </div>
              </div>

              {/* Revenue + units */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-800">{p.ingreso}</p>
                <p className="text-xs text-gray-400 mt-0.5">{p.vendidos} uds</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
