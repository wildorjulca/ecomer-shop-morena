"use client"

import { ChevronRight, X } from "lucide-react"
import { FilterView } from "../../gender/GendeHeaderFilters"


interface Props {
    setView: (
        view: FilterView
    ) => void

    onClose: () => void
}

const filters = [
    {
        key: "category",
        label: "Categorias"
    },
    {
        key: "gender",
        label: " Género"
    },
    {
        key: "brands",
        label: "Marcas"
    },
    {
        key: "sizes",
        label: "Tallas"
    },
    {
        key: "ordenar-por",
        label: "Ordernar por"
    }
]

const FiltersMain = ({
    setView,
    onClose
}: Props) => {

    return (

        <div>
            <div className="h-[64px] border-b px-5 flex items-center justify-between">
                <h2 className="text-[24px] font-semibold">
                    Filtrar
                </h2>
                <X className="cursor-pointer"
                    size={30}
                    onClick={onClose}
                />
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