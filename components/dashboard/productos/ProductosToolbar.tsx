"use client";

import { Search, Filter, Loader2 } from "lucide-react";

const CATEGORIAS = ["Todas", "Calzado", "Ropa", "Accesorios"];
const ESTADOS = [
  { value: "todos",     label: "Todos"     },
  { value: "activo",    label: "Activo"    },
  { value: "oferta",    label: "En oferta" },
  { value: "sin_stock", label: "Sin stock" },
  { value: "inactivo",  label: "Inactivo"  },
];

interface Props {
  search:      string;
  categoria:   string;
  estado:      string;
  isFetching:  boolean;
  total:       number | undefined;
  onSearch:    (v: string) => void;
  onCategoria: (v: string) => void;
  onEstado:    (v: string) => void;
}

export default function ProductosToolbar({
  search, categoria, estado, isFetching, total,
  onSearch, onCategoria, onEstado,
}: Props) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* Search */}
      <div
        className="flex items-center gap-2 h-9 px-3 rounded-lg flex-1 max-w-xs"
        style={{ border: "1px solid rgba(0,0,0,0.15)", background: "#fafafa" }}
      >
        <Search size={15} style={{ color: "rgba(0,0,0,0.38)", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Buscar por nombre, SKU, marca..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: "rgba(0,0,0,0.87)" }}
        />
        {isFetching && (
          <Loader2
            size={13}
            className="animate-spin shrink-0"
            style={{ color: "#6A148E" }}
          />
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Categoría — tab group */}
        <div
          className="flex items-center rounded-lg overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.12)" }}
        >
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => onCategoria(c)}
              className="h-8 px-3 text-xs font-medium transition-all"
              style={{
                background: categoria === c ? "#6A148E" : "transparent",
                color:      categoria === c ? "#fff"     : "rgba(0,0,0,0.6)",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Estado — select */}
        <div
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg"
          style={{ border: "1px solid rgba(0,0,0,0.12)" }}
        >
          <Filter size={13} style={{ color: "rgba(0,0,0,0.38)" }} />
          <select
            value={estado}
            onChange={(e) => onEstado(e.target.value)}
            className="bg-transparent text-xs outline-none cursor-pointer"
            style={{ color: "rgba(0,0,0,0.6)" }}
          >
            {ESTADOS.map((e) => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultado count */}
      <p className="text-xs ml-auto shrink-0" style={{ color: "rgba(0,0,0,0.38)" }}>
        {total != null ? `${total} resultado${total !== 1 ? "s" : ""}` : "—"}
      </p>
    </div>
  );
}
