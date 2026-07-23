"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import type { ProductoRow } from "@/lib/data/productos-mock";

interface Props {
  producto: ProductoRow;
}

export function RowActions({ producto }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cierra el menú al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const actions = [
    { icon: Eye,    label: "Ver detalle", color: "rgba(0,0,0,0.7)", onClick: () => console.log("ver", producto.id) },
    { icon: Edit,   label: "Editar",      color: "rgba(0,0,0,0.7)", onClick: () => console.log("editar", producto.id) },
    { icon: Trash2, label: "Eliminar",    color: "#c62828",          onClick: () => console.log("eliminar", producto.id) },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        style={{ color: "rgba(0,0,0,0.38)" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-9 w-44 rounded-xl overflow-hidden z-30"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.14)", background: "#fff" }}
        >
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                onClick={() => { a.onClick(); setOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors"
                style={{ color: a.color }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <Icon size={15} />
                {a.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
