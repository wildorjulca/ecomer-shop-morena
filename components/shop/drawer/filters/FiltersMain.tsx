"use client"

import { ChevronRight } from "lucide-react"
import { FilterView } from "../../gender/GendeHeaderFilters"


interface Props {
    setView: (
        view: FilterView
    ) => void
}

const filters = [
    {
        key: "brands",
        label: "Marcas"
    },
    {
        key: "sizes",
        label: "Tallas"
    },
    {
        key: "gender",
        label: " Género"
    },
    {
        key: "category",
        label: "Categorias"
    },
    {
        key: "ordenar-por",
        label: "Ordernar por"
    }
]

const FiltersMain = ({
    setView
}: Props) => {

    return (

        <div>

            <div
                className="
          h-[64px]
          border-b
          px-5
          flex
          items-center
        "
            >

                <h2 className="text-[24px] font-semibold">
                    Filtros
                </h2>

            </div>

            <div>

                {
                    filters.map((filter) => (

                        <button
                            key={filter.key}
                            onClick={() =>
                                setView(
                                    filter.key as FilterView
                                )
                            }
                            className="
                h-[60px]
                w-full
                border-b
                px-5
                flex
                items-center
                justify-between
              "
                        >

                            <span>
                                {filter.label}
                            </span>

                            <ChevronRight size={20} />

                        </button>

                    ))
                }

            </div>

        </div>

    )
}

export default FiltersMain