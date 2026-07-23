"use client";

import { Bell, Search, Menu, ChevronDown, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/productos": "Productos",
  "/dashboard/categorias": "Categorías",
  "/dashboard/marcas": "Marcas",
  "/dashboard/colores": "Colores",
  "/dashboard/tallas": "Tallas",
  "/dashboard/ordenes": "Órdenes",
  "/dashboard/transacciones": "Transacciones",
  "/dashboard/clientes": "Clientes",
  "/dashboard/resenas": "Reseñas",
  "/dashboard/wishlists": "Favoritos",
  "/dashboard/reportes/ventas": "Reportes · Ventas",
  "/dashboard/reportes/inventario": "Reportes · Inventario",
  "/dashboard/configuracion": "Configuración",
};

interface Props {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  const pathname = usePathname();
  const title = routeTitles[pathname] ?? "Dashboard";

  return (
    <header
      className="h-16 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0 bg-white"
      style={{ boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.08)" }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger — solo mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm">
          <span className="text-gray-400 font-medium">Inicio</span>
          <span className="text-gray-300">›</span>
          <span className="font-semibold text-gray-800">{title}</span>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Search input */}
        <div className="hidden md:flex items-center gap-2 h-9 px-3.5 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 w-52 cursor-text hover:border-gray-300 transition-colors">
          <Search size={15} className="shrink-0" />
          <span>Buscar...</span>
          <kbd className="ml-auto text-[10px] text-gray-300 font-mono bg-white border border-gray-200 px-1.5 py-0.5 rounded hidden lg:inline">
            ⌘K
          </kbd>
        </div>

        {/* Settings */}
        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <Settings size={18} />
        </button>

        {/* Bell */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell size={18} />
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-white"
            style={{ background: "#6A148E" }}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* User chip */}
        <button className="flex items-center gap-2.5 h-9 pl-1 pr-3 rounded-xl hover:bg-gray-100 transition-colors">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: "#6A148E" }}
          >
            AD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
            <p className="text-xs text-gray-400 leading-tight">Super Admin</p>
          </div>
          <ChevronDown size={14} className="text-gray-400 hidden md:block" />
        </button>
      </div>
    </header>
  );
}
