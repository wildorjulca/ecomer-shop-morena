import { AlertTriangle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const items = [
  { nombre: "Nike Air Max 270",   variante: "Negro · T.42",   stock: 2, min: 5 },
  { nombre: "Puma Phase Mochila", variante: "Rojo · Único",   stock: 3, min: 5 },
  { nombre: "Adidas Ultraboost",  variante: "Blanco · T.40",  stock: 1, min: 5 },
  { nombre: "Nike Dri-FIT Polo",  variante: "Azul · M",       stock: 4, min: 5 },
];

export default function StockAlerts() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#fff8e1" }}
          >
            <AlertTriangle size={18} style={{ color: "#f9a825" }} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-gray-500">Requieren atención</p>
            <p className="text-base font-bold text-gray-900">Stock bajo</p>
          </div>
        </div>
        <Link
          href="/dashboard/reportes/inventario"
          className="flex items-center gap-1 text-sm font-semibold hover:underline"
          style={{ color: "#6A148E" }}
        >
          Inventario <ArrowUpRight size={15} />
        </Link>
      </div>

      <div>
        {items.map((item) => {
          const isCritical = item.stock <= 2;
          const pct = Math.round((item.stock / item.min) * 100);
          return (
            <div
              key={item.nombre + item.variante}
              className="flex items-center gap-4 px-6 py-4"
              style={{ borderTop: "1px solid #f5f5f5" }}
            >
              {/* Stock number badge */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0"
                style={{
                  background: isCritical ? "#ffebee" : "#fff8e1",
                  color:      isCritical ? "#c62828" : "#f9a825",
                }}
              >
                {item.stock}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.nombre}</p>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-3 shrink-0"
                    style={{
                      background: isCritical ? "#ffebee" : "#fff8e1",
                      color:      isCritical ? "#c62828" : "#f9a825",
                    }}
                  >
                    {isCritical ? "Crítico" : "Bajo"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{item.variante}</p>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f5f5f5" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: isCritical ? "#ef5350" : "#ffca28",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
