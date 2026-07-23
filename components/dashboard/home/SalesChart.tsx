"use client";

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
const values = [8200, 12400, 9800, 15600, 18200, 24580];
const maxVal = Math.max(...values);

export default function SalesChart() {
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div
      className="bg-white rounded-2xl p-6 h-full flex flex-col"
      style={{ boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-[13px] font-medium text-gray-500">Ingresos acumulados</p>
          <p className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">
            S/ {total.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">Enero — Junio 2025</p>
        </div>
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: "#e8f5e9", color: "#2e7d32" }}
        >
          +18.4% ↑
        </span>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-3 mt-6" style={{ height: 110 }}>
        {values.map((val, i) => {
          const pct = (val / maxVal) * 100;
          const isActive = i === values.length - 1;
          return (
            <div key={months[i]} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full flex items-end justify-center" style={{ height: 88 }}>
                {/* Tooltip */}
                <div
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                  style={{ background: "#1a1a2e", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                >
                  S/ {val.toLocaleString()}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a2e]" />
                </div>

                <div
                  className="w-full rounded-t-lg transition-all duration-500 cursor-pointer"
                  style={{
                    height: `${pct}%`,
                    background: isActive
                      ? "#6A148E"
                      : "rgba(106,20,142,0.15)",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              </div>
              <span
                className="text-[12px] font-semibold"
                style={{ color: isActive ? "#6A148E" : "#9e9e9e" }}
              >
                {months[i]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer stats */}
      <div
        className="mt-5 pt-4 grid grid-cols-2 gap-4"
        style={{ borderTop: "1px solid #f0f0f0" }}
      >
        <div>
          <p className="text-xs text-gray-400 mb-1">Mejor mes</p>
          <p className="text-sm font-bold text-gray-800">Jun — S/ 24,580</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Promedio mensual</p>
          <p className="text-sm font-bold text-gray-800">
            S/ {Math.round(total / values.length).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
