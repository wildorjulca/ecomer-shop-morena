'use client'

import { Plus, Download, Upload } from "lucide-react";
import Link from "next/link";

export default function ColorHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Colores</h1>
                <p className="text-sm mt-0.5" style={{ color: "rgba(0,0,0,0.45)" }}>
                    Gestiona el catálogo de tu tienda
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium transition-colors"
                    style={{
                        border: "1px solid rgba(0,0,0,0.15)",
                        color: "rgba(0,0,0,0.6)",
                        background: "#fff",
                    }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#fff")
                    }
                >
                    <Upload size={15} />
                    <span className="hidden sm:inline">Importar</span>
                </button>
                <button
                    className="flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium transition-colors"
                    style={{
                        border: "1px solid rgba(0,0,0,0.15)",
                        color: "rgba(0,0,0,0.6)",
                        background: "#fff",
                    }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#fff")
                    }
                >
                    <Download size={15} />
                    <span className="hidden sm:inline">Exportar</span>
                </button>
                <Link
                    href="/dashboard/colores/nuevo"
                    className="flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-semibold text-white transition-all"
                    style={{ background: "#6A148E" }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#56107a")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#6A148E")
                    }
                >
                    <Plus size={16} />
                    Nueva marca
                </Link>
            </div>
        </div>
    );
}
