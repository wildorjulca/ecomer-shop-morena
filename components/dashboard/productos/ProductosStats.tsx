type Props = {
  stats: {
    total: number;
    activos: number;
    sinStock: number;
    enOferta: number;
  };
};

export default function ProductosStats({ stats }: Props) {
  const data = [
    {
      label: "Total productos",
      value: stats.total,
      sub: "en catálogo",
      color: "#6A148E",
      bg: "#f3e5f5",
    },
    {
      label: "Activos",
      value: stats.activos,
      sub: "publicados",
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
    {
      label: "Sin stock",
      value: stats.sinStock,
      sub: "necesitan restock",
      color: "#c62828",
      bg: "#ffebee",
    },
    {
      label: "En oferta",
      value: stats.enOferta,
      sub: "con descuento",
      color: "#f9a825",
      bg: "#fff8e1",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4"
          style={{ boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0"
            style={{ background: s.bg, color: s.color }}
          >
            {s.value}
          </div>

          <div>
            <p className="text-xl font-bold text-gray-900 leading-tight">
              {s.value}
            </p>

            <p
              className="text-xs font-medium leading-tight mt-0.5"
              style={{ color: "rgba(0,0,0,0.45)" }}
            >
              {s.label}
            </p>

            <p
              className="text-[11px] leading-tight mt-0.5"
              style={{ color: s.color }}
            >
              {s.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}