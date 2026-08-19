'use client'

import Link from "next/link";
import {
  // Facebook,
  // Instagram,
  // Twitter,
  // Youtube,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────

const genders = [
  { label: "Mujer", href: "/genero/mujer" },
  { label: "Hombre", href: "/genero/hombre" },
  { label: "Unisex", href: "/genero/unisex" },
  { label: "Niños", href: "/genero/ninos" },
  { label: "Niñas", href: "/genero/ninas" },
];

const ayuda = [
  { label: "Seguimiento de pedido", href: "/my-account" },
  { label: "Devoluciones y cambios", href: "#" },
  { label: "Métodos de pago", href: "#" },
  { label: "Guía de tallas", href: "#" },
  { label: "Preguntas frecuentes", href: "#" },
  { label: "Contáctanos", href: "#" },
];

const empresa = [
  { label: "Sobre nosotros", href: "#" },
  { label: "Blog de moda", href: "#" },
  { label: "Trabaja con nosotros", href: "#" },
  { label: "Términos y condiciones", href: "#" },
  { label: "Política de privacidad", href: "#" },
];

const social = [
  { icon: CreditCard, label: "Instagram", href: "#" },
  { icon: CreditCard, label: "Facebook", href: "#" },
  { icon: CreditCard, label: "Twitter / X", href: "#" },
  { icon: CreditCard, label: "YouTube", href: "#" },
];

const benefits = [
  {
    icon: Truck,
    title: "Envío gratis",
    desc: "En compras mayores a S/ 99",
  },
  {
    icon: RotateCcw,
    title: "Devolución fácil",
    desc: "30 días para devolver",
  },
  {
    icon: CreditCard,
    title: "Pago seguro",
    desc: "Visa, Mastercard y más",
  },
  {
    icon: ShieldCheck,
    title: "Compra protegida",
    desc: "Garantía en cada compra",
  },
];

// ──────────────────────────────────────────────
// FOOTER COMPONENT
// ──────────────────────────────────────────────

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#111111] text-white font-[Poppins,sans-serif] mt-28 md:mt-16">

      {/* ── BENEFIT BAR ── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6A148E]/20">
                  <Icon className="h-5 w-5 text-[#b94fd4]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">

          {/* COL 1 — BRAND */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <Link
              href="/"
              className="text-3xl font-black tracking-[6px] text-gray-100 hover:text-[#b94fd4] transition-colors"
            >
              ASOS
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              Tu tienda de moda favorita. Encuentra las últimas tendencias en
              ropa, calzado y accesorios para toda la familia.
            </p>

            {/* Contact */}
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[#6A148E]" />
                Lima, Perú
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#6A148E]" />
                +51 900 000 000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#6A148E]" />
                hola@asos.com.pe
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-1">
              {social.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10
                             text-gray-400 transition-all hover:border-[#6A148E] hover:bg-[#6A148E]/20 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* COL 2 — CATEGORÍAS */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[3px] text-gray-300">
              Categorías
            </h3>
            <ul className="flex flex-col gap-2">
              {genders.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#6A148E] transition-transform group-hover:translate-x-0.5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — AYUDA */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[3px] text-gray-300">
              Ayuda
            </h3>
            <ul className="flex flex-col gap-2">
              {ayuda.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#6A148E] transition-transform group-hover:translate-x-0.5" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — EMPRESA + NEWSLETTER */}
          <div className="flex flex-col gap-8">
            {/* Empresa */}
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[3px] text-gray-300">
                Empresa
              </h3>
              <ul className="flex flex-col gap-2">
                {empresa.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-[#6A148E] transition-transform group-hover:translate-x-0.5" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[3px] text-gray-300">
                Newsletter
              </h3>
              <p className="mb-3 text-xs text-gray-400">
                Suscríbete y recibe un{" "}
                <span className="font-semibold text-[#b94fd4]">10% de descuento</span>{" "}
                en tu primera compra.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2"
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-none border border-white/10 bg-white/5 px-3 py-2 text-sm
                             text-white placeholder-gray-500 outline-none focus:border-[#6A148E]
                             transition-colors"
                  aria-label="Email para newsletter"
                />
                <button
                  type="submit"
                  className="w-full bg-[#6A148E] py-2 text-sm font-semibold uppercase
                             tracking-widest text-white transition-colors hover:bg-[#7e1ba8]"
                >
                  Suscribirme
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-5">
          {/* Desktop bottom */}
          <div className="hidden md:flex items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {year} ASOS. Todos los derechos reservados.
            </p>

            {/* Payment icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 mr-1">Pagamos con:</span>
              {["VISA", "MC", "AMEX", "YAPE"].map((card) => (
                <span
                  key={card}
                  className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px]
                             font-bold tracking-wide text-gray-300"
                >
                  {card}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-xs text-gray-500">
              <Link href="#" className="hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Términos
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>

          {/* Mobile bottom */}
          <div className="md:hidden flex flex-col items-center gap-3 text-center">
            {/* Payment icons */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {["VISA", "MC", "AMEX", "YAPE"].map((card) => (
                <span
                  key={card}
                  className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px]
                             font-bold tracking-wide text-gray-300"
                >
                  {card}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-xs text-gray-500">
              <Link href="#" className="hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Términos
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>

            <p className="text-xs text-gray-600">
              © {year} ASOS. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
