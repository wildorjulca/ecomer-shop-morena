"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  Tag,
  BarChart2,
  Settings,
  LogOut,
  ChevronDown,
  Package,
  Palette,
  Ruler,
  Star,
  ShoppingCart,
  Layers,
  TrendingUp,
  FileText,
  Heart,
  Shirt,
  X,
  Landmark,
  Building2,
  MapPin,
} from "lucide-react";
import clsx from "clsx";

interface NavChild {
  href: string;
  label: string;
}
interface NavItem {
  href?: string;
  label: string;
  icon: React.ElementType;
  children?: NavChild[];
}
interface NavSection {
  section: string;
  items: NavItem[];
}

const nav: NavSection[] = [
  {
    section: "Manage",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/ordenes", label: "Órdenes", icon: ClipboardList },
      { href: "/dashboard/configuracion", label: "Configuración", icon: Settings },
    ],
  },
  {
    section: "Catálogo",
    items: [
      {
        label: "Productos",
        icon: ShoppingBag,
        children: [
          { href: "/dashboard/productos", label: "Lista" },
          { href: "/dashboard/categorias", label: "Categorías" },
          { href: "/dashboard/marcas", label: "Marcas" },
          { href: "/dashboard/colores", label: "Colores" },
          { href: "/dashboard/tallas", label: "Tallas" },
        ],
      },
      {
        label: "Ventas",
        icon: ShoppingCart,
        children: [
          { href: "/dashboard/orders", label: "Ordenes" },
          { href: "/dashboard/transacciones", label: "Transacciones" },
        ],
      },
    ],
  },
  {
    section: "Direcciones",
    items: [
      {
        label: "Ubicaciones",
        icon: MapPin,
        children: [
          {
            href: "/dashboard/departamentos",
            label: "Departamentos",

            // icon: Building2,
          },
          {
            href: "/dashboard/provincias",
            label: "Provincias",
            // icon: Landmark,
          },
          {
            href: "/dashboard/distritos",
            label: "Distritos",
            // icon: Home,
          },
        ],
      },
    ],
  },
  {
    section: "Clientes",
    items: [
      { href: "/dashboard/clientes", label: "Usuarios", icon: Users },
      { href: "/dashboard/resenas", label: "Reseñas", icon: Star },
      { href: "/dashboard/wishlists", label: "Favoritos", icon: Heart },
    ],
  },
  {
    section: "Reportes",
    items: [
      {
        label: "Reportes",
        icon: BarChart2,
        children: [
          { href: "/dashboard/reportes/ventas", label: "Ventas" },
          { href: "/dashboard/reportes/inventario", label: "Inventario" },
        ],
      },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const allItems = nav.flatMap((s) => s.items);
  const [open, setOpen] = useState<string[]>(() =>
    allItems
      .filter((i) => i.children?.some((c) => pathname.startsWith(c.href)))
      .map((i) => i.label)
  );

  const toggle = (label: string) =>
    setOpen((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  const Inner = () => (
    <aside
      className="w-[260px] h-full flex flex-col select-none"
      style={{ background: "#fff", borderRight: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* ─── Logo ─── */}
      <div className="flex items-center justify-between px-5 py-[18px] shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#6A148E" }}
          >
            <Shirt size={16} className="text-white" />
          </div>
          <span
            className="text-[17px] font-bold tracking-tight"
            style={{ color: "#1a1a2e" }}
          >
            Morena
          </span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden rounded-full p-1 transition-colors"
          style={{ color: "rgba(0,0,0,0.4)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "transparent")
          }
        >
          <X size={18} />
        </button>
      </div>

      {/* ─── Nav (custom thin scrollbar) ─── */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden py-2"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#e0e0e0 transparent" }}
      >
        <style>{`
          .mui-scroll::-webkit-scrollbar { width: 4px; }
          .mui-scroll::-webkit-scrollbar-track { background: transparent; }
          .mui-scroll::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }
          .mui-scroll::-webkit-scrollbar-thumb:hover { background: #bdbdbd; }
        `}</style>

        <div className="mui-scroll h-full">
          {nav.map((section) => (
            <div key={section.section}>
              {/* Section label */}
              <p
                className="px-5 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: "rgba(0,0,0,0.38)" }}
              >
                {section.section}
              </p>

              {section.items.map((item) => {
                const Icon = item.icon;

                /* ── Single link ── */
                if (item.href && !item.children) {
                  const active =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-150 mb-0.5 group"
                      style={{
                        color: active ? "#6A148E" : "rgba(0,0,0,0.6)",
                        background: active ? "rgba(106,20,142,0.08)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!active)
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(0,0,0,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (!active)
                          (e.currentTarget as HTMLElement).style.background =
                            "transparent";
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: active ? "#6A148E" : "rgba(0,0,0,0.38)" }}
                      />
                      <span className="leading-none">{item.label}</span>
                    </Link>
                  );
                }

                /* ── Module with children ── */
                const isExpanded = open.includes(item.label);
                const hasActive = item.children?.some((c) =>
                  pathname.startsWith(c.href)
                );

                return (
                  <div key={item.label} className="mb-0.5">
                    <button
                      onClick={() => toggle(item.label)}
                      className="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-150 w-[calc(100%-16px)]"
                      style={{
                        color: hasActive ? "#6A148E" : "rgba(0,0,0,0.6)",
                        background: hasActive
                          ? "rgba(106,20,142,0.08)"
                          : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!hasActive)
                          (e.currentTarget as HTMLElement).style.background =
                            "rgba(0,0,0,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (!hasActive)
                          (e.currentTarget as HTMLElement).style.background =
                            hasActive ? "rgba(106,20,142,0.08)" : "transparent";
                      }}
                    >
                      <Icon
                        size={20}
                        style={{
                          color: hasActive ? "#6A148E" : "rgba(0,0,0,0.38)",
                          flexShrink: 0,
                        }}
                      />
                      <span className="flex-1 text-left leading-none">
                        {item.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className="transition-transform duration-200 shrink-0"
                        style={{
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          color: hasActive ? "#6A148E" : "rgba(0,0,0,0.38)",
                        }}
                      />
                    </button>

                    {/* Children */}
                    <div
                      className="overflow-hidden transition-all duration-200 ease-in-out"
                      style={{ maxHeight: isExpanded ? "300px" : "0px" }}
                    >
                      <div className="pl-[52px] pr-3 pt-0.5 pb-1 space-y-0.5">
                        {item.children?.map((child) => {
                          const active =
                            pathname === child.href ||
                            pathname.startsWith(child.href + "/");
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150"
                              style={{
                                color: active ? "#6A148E" : "rgba(0,0,0,0.54)",
                                background: active
                                  ? "rgba(106,20,142,0.06)"
                                  : "transparent",
                              }}
                              onMouseEnter={(e) => {
                                if (!active)
                                  (e.currentTarget as HTMLElement).style.background =
                                    "rgba(0,0,0,0.04)";
                              }}
                              onMouseLeave={(e) => {
                                if (!active)
                                  (e.currentTarget as HTMLElement).style.background =
                                    "transparent";
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{
                                  background: active
                                    ? "#6A148E"
                                    : "rgba(0,0,0,0.2)",
                                }}
                              />
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "0 16px" }} />

      {/* ─── User footer ─── */}
      <div className="flex items-center gap-3 px-5 py-4 shrink-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: "#6A148E" }}
        >
          AD
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-[13.5px] font-semibold leading-tight truncate"
            style={{ color: "rgba(0,0,0,0.87)" }}
          >
            Administrador
          </p>
          <p
            className="text-[12px] leading-tight mt-0.5 truncate"
            style={{ color: "rgba(0,0,0,0.45)" }}
          >
            admin@morena.pe
          </p>
        </div>
        <Link
          href="/"
          title="Ir a la tienda"
          className="rounded-full p-1.5 transition-colors shrink-0"
          style={{ color: "rgba(0,0,0,0.38)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "transparent")
          }
        >
          <LogOut size={16} />
        </Link>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex shrink-0 h-screen sticky top-0">
        <Inner />
      </div>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "lg:hidden fixed inset-0 z-50 transition-all duration-300",
          isOpen ? "visible" : "invisible pointer-events-none"
        )}
      >
        <div
          className={clsx(
            "absolute inset-0 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={onClose}
        />
        <div
          className={clsx(
            "absolute top-0 left-0 h-full transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
          style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.15)" }}
        >
          <Inner />
        </div>
      </div>
    </>
  );
}
