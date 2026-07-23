"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  ArrowUp, ArrowDown, ChevronsUpDown,
  ChevronLeft, ChevronRight, Trash2,
} from "lucide-react";
import type { ProductoRow } from "@/lib/data/productos-mock";

// Columnas que se ocultan en pantallas pequeñas
const HIDDEN_MD = ["categoria"];
const HIDDEN_LG = ["vendidos", "rating"];

interface Props {
  data: ProductoRow[];
  totalPages: number;
  total: number;
  page: number;
  pageSize: number;
  isLoading: boolean;
  isFetching: boolean;
  sorting: SortingState;
  onSortChange: (s: SortingState) => void;
  onPageChange: (p: number) => void;
  columns: ColumnDef<ProductoRow, any>[];
}

export default function DataTable({
  data, totalPages, total, page, pageSize,
  isLoading, isFetching, sorting, onSortChange, onPageChange, columns,
}: Props) {
  const [rowSel, setRowSel] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: { sorting, rowSelection: rowSel },
    manualPagination: true,
    manualSorting: true,
    enableRowSelection: true,
    // onSortingChange: onSortChange,  //
    onRowSelectionChange: setRowSel,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
  });

  const selectedCount = Object.keys(rowSel).length;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.06)" }}
    >
      {/* Bulk action bar */}
      {selectedCount > 0 && (
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ background: "rgba(106,20,142,0.05)", borderBottom: "1px solid rgba(106,20,142,0.1)" }}
        >
          <span className="text-sm font-medium" style={{ color: "#6A148E" }}>
            {selectedCount} producto{selectedCount > 1 ? "s" : ""} seleccionado{selectedCount > 1 ? "s" : ""}
          </span>
          <button
            onClick={() => setRowSel({})}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={{ background: "#ffebee", color: "#c62828" }}
          >
            <Trash2 size={13} />
            Eliminar seleccionados
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto relative">
        {/* Overlay sutil mientras refetch — no borra los datos */}
        {isFetching && !isLoading && (
          <div
            className="absolute inset-0 z-10 pointer-events-none transition-opacity"
            style={{ background: "rgba(255,255,255,0.5)" }}
          />
        )}

        <table className="w-full">
          {/* ── Head ── */}
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr
                key={hg.id}
                style={{ background: "#fafafa", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  const id = header.column.id;

                  return (
                    <th
                      key={header.id}
                      className={[
                        "px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] whitespace-nowrap select-none",
                        id === "select" ? "px-5" : "",
                        canSort ? "cursor-pointer hover:bg-black/[0.03] transition-colors" : "",
                        HIDDEN_MD.includes(id) ? "hidden md:table-cell" : "",
                        HIDDEN_LG.includes(id) ? "hidden lg:table-cell" : "",
                      ].join(" ")}
                      style={{ color: "rgba(0,0,0,0.38)" }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          sorted === "asc" ? <ArrowUp size={12} style={{ color: "#6A148E" }} /> :
                            sorted === "desc" ? <ArrowDown size={12} style={{ color: "#6A148E" }} /> :
                              <ChevronsUpDown size={12} style={{ color: "rgba(0,0,0,0.2)" }} />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* ── Body ── */}
          <tbody>
            {isLoading ? (
              /* Skeleton */
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  {[40, 220, 110, 80, 60, 70, 60, 90, 36].map((w, j) => (
                    <td key={j} className="px-4 py-4">
                      <div
                        className="h-4 rounded-lg animate-pulse"
                        style={{ width: w, background: "rgba(0,0,0,0.07)" }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <p className="text-sm" style={{ color: "rgba(0,0,0,0.38)" }}>
                    No se encontraron productos
                  </p>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, i) => {
                const sel = row.getIsSelected();
                return (
                  <tr
                    key={row.id}
                    className="transition-colors cursor-pointer"
                    style={{
                      borderBottom: i < table.getRowModel().rows.length - 1
                        ? "1px solid rgba(0,0,0,0.04)" : "none",
                      background: sel ? "rgba(106,20,142,0.03)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!sel) (e.currentTarget as HTMLElement).style.background = "#fafafa";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        sel ? "rgba(106,20,142,0.03)" : "transparent";
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const id = cell.column.id;
                      return (
                        <td
                          key={cell.id}
                          className={[
                            "px-4 py-3.5",
                            id === "select" ? "px-5" : "",
                            HIDDEN_MD.includes(id) ? "hidden md:table-cell" : "",
                            HIDDEN_LG.includes(id) ? "hidden lg:table-cell" : "",
                          ].join(" ")}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <p className="text-sm" style={{ color: "rgba(0,0,0,0.45)" }}>
          {isLoading ? "Cargando..." : (
            <>
              <span className="font-semibold" style={{ color: "rgba(0,0,0,0.7)" }}>
                {start}–{end}
              </span>{" "}
              de{" "}
              <span className="font-semibold" style={{ color: "rgba(0,0,0,0.7)" }}>
                {total}
              </span>{" "}
              resultados
            </>
          )}
        </p>

        <div className="flex items-center gap-1">
          <PaginationButton
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            icon={<ChevronLeft size={18} />}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              className="w-8 h-8 rounded-full text-sm font-semibold transition-all"
              style={{
                background: page === n ? "#6A148E" : "transparent",
                color: page === n ? "#fff" : "rgba(0,0,0,0.54)",
              }}
              onMouseEnter={(e) => {
                if (page !== n)
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                if (page !== n)
                  (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {n}
            </button>
          ))}
          <PaginationButton
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            icon={<ChevronRight size={18} />}
          />
        </div>
      </div>
    </div>
  );
}

/* ── small helper ── */
function PaginationButton({
  onClick, disabled, icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ color: "rgba(0,0,0,0.54)" }}
      onMouseEnter={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {icon}
    </button>
  );
}
