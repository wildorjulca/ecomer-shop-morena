import Link from "next/link";
import { Plus, ShoppingCart, Tag, Users, BarChart2, Package } from "lucide-react";

const actions = [
  { label: "Nuevo producto",  href: "/dashboard/productos/nuevo",      icon: Plus,         iconBg: "#f3e5f5", iconColor: "#6A148E" },
  { label: "Ver órdenes",     href: "/dashboard/ordenes",               icon: ShoppingCart, iconBg: "#e3f2fd", iconColor: "#1976d2" },
  { label: "Categorías",      href: "/dashboard/categorias",            icon: Tag,          iconBg: "#e0f2f1", iconColor: "#00897b" },
  { label: "Clientes",        href: "/dashboard/clientes",              icon: Users,        iconBg: "#ede7f6", iconColor: "#5e35b1" },
  { label: "Inventario",      href: "/dashboard/reportes/inventario",   icon: Package,      iconBg: "#fff8e1", iconColor: "#f9a825" },
  { label: "Reportes",        href: "/dashboard/reportes/ventas",       icon: BarChart2,    iconBg: "#fce4ec", iconColor: "#c62828" },
];

export default function QuickActions() {
  return (
    <div
      className="bg-white rounded-2xl p-6 h-full flex flex-col"
      style={{ boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)" }}
    >
      <p className="text-[13px] font-medium text-gray-500 mb-1">Accesos rápidos</p>
      <p className="text-base font-bold text-gray-900 mb-5">Gestión rápida</p>
      <div className="grid grid-cols-3 gap-3 flex-1">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.label}
              href={a.href}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-150 group"
              style={{ background: "#fafafa" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#f5f5f5";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#fafafa";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: a.iconBg }}
              >
                <Icon size={20} style={{ color: a.iconColor }} />
              </div>
              <span className="text-[12.5px] font-medium text-gray-600 text-center leading-tight group-hover:text-gray-900 transition-colors">
                {a.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
