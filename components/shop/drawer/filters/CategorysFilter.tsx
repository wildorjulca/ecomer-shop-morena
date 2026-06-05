"use client"


import { ChevronLeft } from "lucide-react"
import { FilterItem } from "./FiltersDrawer"
import { FilterView } from "../../gender/GendeHeaderFilters"
import useToggleFilter from "@/src/hooks/shop/filters/useToggleFilter"




interface Props {
    items: FilterItem[]
    loading: boolean
    setView: (view: FilterView) => void
    setSelectedCategories: React.Dispatch<
        React.SetStateAction<string[]>
    >
    selectedCategories: string[]

}
const CategoryFilter = ({ items, loading, setView, setSelectedCategories, selectedCategories }: Props) => {

    const { toggleFilter } = useToggleFilter()

    return (

        <div className="relative h-full">

            {/* top */}
            <button
                onClick={() => setView("main")}
                className="
                w-full
          h-[60px]
          border-b
          px-5
          flex
          items-center
          gap-2
        "
            >

                <ChevronLeft size={20} />

                <span className="font-medium text-[18px]">
                    Marcas
                </span>

            </button>

            {/* content */}
            <div className="p-5">

                {loading && (

                    <div className="space-y-4">

                        {
                            Array.from({ length: 8 }).map((_, i) => (

                                <div
                                    key={i}
                                    className="
                    h-6
                    rounded-md
                    bg-gray-200
                    animate-pulse
                  "
                                />

                            ))
                        }

                    </div>

                )}

                {
                    !loading && (
                        <div className="space-y-4">

                            {
                                items.map((cat) => (

                                    <label
                                        key={cat.slug}
                                        className="
                                                flex
                                                items-center
                                                justify-between
                                                cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                className="w-6 h-6 accent-brand"
                                                checked={selectedCategories.includes(cat.slug)}
                                                onChange={() => {
                                                    toggleFilter(
                                                        cat.slug,
                                                        selectedCategories,
                                                        setSelectedCategories
                                                    )
                                                }}
                                            />

                                            <span>{cat.slug}</span>
                                        </div>

                                        <span>
                                            ({cat.count})
                                        </span>
                                    </label>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default CategoryFilter