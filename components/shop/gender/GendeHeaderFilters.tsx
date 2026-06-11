"use client"

import { useState } from "react"
import FiltersDrawer from "../drawer/filters/FiltersDrawer"
import { ArrowUpDown, ChevronDown, SlidersHorizontal } from "lucide-react"

const filters = [
    {
        label: "Tallas",
        view: "sizes"
    },
    {
        label: "Marcas",
        view: "brands"
    },
    {
        label: "Precios",
        view: "prices"
    },
    {
        label: "Color",
        view: "colors"
    },
    
]

export type FilterView =
    | "main"
    | "brands"
    | "sizes"
    | "prices"
    | "gender"
    | "colors"
    | "category"
    | "ordenar-por"

export default function GenderHeaderFilters() {

    const [view, setView] =
        useState<FilterView>("main")

    const [open, setOpen] =
        useState(false)

    return (
        <>
            <div
                className="
        sticky
        top-[70px]
        z-40
        bg-white
        border-t
        border-gray-100
        shadow-[0_8px_20px_-15px_rgba(0,0,0,0.25)]
      "
            >

                <div
                    className="
           max-w-[1200px]
        mx-auto
        h-[72px]
        flex
        items-center
        justify-between
        gap-4
        "
                >

                    {/* LEFT */}
                    <div
                        className="
            flex
            items-center
            gap-4
            overflow-x-auto
            scrollbar-hide
          "
                    >

                        {/* all filters */}
                        <button
                            onClick={() => {
                                setOpen(true)
                                setView("main")

                            }}
                            className="
              h-[40px]
              px-4
              rounded-md
              bg-[#f3f3f3]
              border
              border-[#ebebeb]
              flex
              items-center
              gap-3
              whitespace-nowrap
              text-[15px]
              font-medium
              hover:bg-[#ececec]
              transition
            "
                        >

                            <SlidersHorizontal size={18} />

                            Todos los filtros

                        </button>

                        {/* filters */}
                        {
                            filters.map((filter) => (

                                <button
                                    key={filter.view}
                                    onClick={() => {
                                        setOpen(true)
                                        setView(filter.view as FilterView)

                                    }}
                                    className="
                  h-[40px]
                  px-5
                  rounded-md
                  bg-[#f3f3f3]
                  border
                  border-[#ebebeb]
                  flex
                  items-center
                  gap-3
                  whitespace-nowrap
                  text-[15px]
                  font-medium
                  hover:bg-[#ececec]
                  transition
                "
                                >

                                    {filter.label}

                                    <ChevronDown size={18} />

                                </button>

                            ))
                        }

                        {/* envio hoy */}
                        <button
                            className="
              h-[40px]
              px-5
              rounded-md
              bg-[#f3f3f3]
              border
              border-[#ebebeb]
              flex
              items-center
              gap-3
              whitespace-nowrap
              text-[15px]
              font-medium
            "
                        >

                            Envío hoy

                            <div
                                className="
                w-[26px]
                h-[16px]
                rounded-full
                bg-white
                border
                relative
              "
                            >

                                <div
                                    className="
                  absolute
                  top-1/2
                  left-[2px]
                  -translate-y-1/2
                  w-[10px]
                  h-[10px]
                  rounded-full
                  bg-[#222]
                "
                                />

                            </div>

                        </button>

                    </div>

                    {/* RIGHT */}
                    <button
                        className="
            hidden
            md:flex
            items-center
            gap-3
            whitespace-nowrap
            text-[18px]
            font-medium
            text-[#333]
          "
                    >

                        Ordenar

                        <ArrowUpDown size={22} />

                    </button>

                </div>

            </div>

            {/* <button
                onClick={() => setOpen(true)}
            >
                Abrir filtros
            </button> */}

            <FiltersDrawer
                view={view}
                setView={setView}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>


    )
}