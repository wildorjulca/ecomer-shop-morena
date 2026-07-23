"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  totalPages: number;
}

/**
 * Paginación auto-suficiente.
 *
 * ¿Por qué no recibe `onPageChange` por prop?
 * Porque quien la usa (ej. GenderPage) es un Server Component, y los
 * Server Components NO pueden pasarle funciones a un Client Component
 * — no son serializables al cruzar esa frontera. Por eso `onPageChange`
 * llegaba `undefined` y no pasaba nada al hacer clic.
 *
 * En vez de depender de una función externa, este componente arma la
 * URL él mismo: toma los query params ACTUALES (brands, categoria,
 * sort, lo que sea), les cambia solo `page`, y navega con
 * `router.push`. Así funciona sin importar qué página lo use, sin
 * acoplarse a props que un Server Component no puede darle.
 */
export default function Pagination({ page, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  /** Navega a `nuevaPagina`, preservando el resto de los filtros de la URL. */
  const irAPagina = (nuevaPagina: number) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nuevaPagina));

    router.push(`${pathname}?${params.toString()}`);
  };

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-end pt-4 pb-2">
      <div className="bg-white rounded-md p-2">
        <ul className="flex items-center gap-2">

          {/* Anterior */}
          <li>
            <button
              onClick={() => irAPagina(page - 1)}
              disabled={page === 1}
              className="
                flex items-center justify-center
                size-8
                rounded-sm
                transition-colors
                duration-200
                text-gray-700
                hover:bg-gray-100
                disabled:text-gray-400
                disabled:cursor-not-allowed
              "
            >
              <ChevronLeft />
            </button>
          </li>

          {/* Números */}
          {pages.map((item, index) => (
            <li key={`${item}-${index}`}>
              {item === "..." ? (
                <span className="px-3 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => irAPagina(Number(item))}
                  className={clsx(
                    "flex py-1.5 px-3.5 rounded-sm transition-colors duration-200",
                    {
                      "bg-brand text-white": page === item,
                      "bg-gray-100 text-gray-800 hover:bg-gray-200":
                        page !== item,
                    }
                  )}
                >
                  {item}
                </button>
              )}
            </li>
          ))}

          {/* Siguiente */}
          <li>
            <button
              onClick={() => irAPagina(page + 1)}
              disabled={page === totalPages}
              className="
                flex items-center justify-center
                size-8
                rounded-sm
                transition-colors
                duration-200
                text-gray-700
                hover:bg-gray-100
                disabled:text-gray-400
                disabled:cursor-not-allowed
              "
            >
              <ChevronRight />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}