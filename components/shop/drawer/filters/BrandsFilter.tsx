"use client"

import { useEffect, useState } from "react"

import { ChevronLeft } from "lucide-react"
import { getMarcas } from "@/actions/shop/filters/marcas"
import { FilterItem } from "./FiltersDrawer"
import { FilterView } from "../../gender/GendeHeaderFilters"
import useToggleFilter from "@/src/hooks/shop/filters/useToggleFilter"

// import { getBrands } from "@/actions/filters/getBrands"

interface Brand {
    nombre: string
    slug: string
}


interface Props {
    items: FilterItem[]
    loading: boolean
    setView: (view: FilterView) => void
    setSelectedBrands: React.Dispatch<
        React.SetStateAction<string[]>
    >
    selectedBrands: string[]

}
const BrandsFilter = ({ items, loading, setView, setSelectedBrands, selectedBrands }: Props) => {

    // const [brands, setBrands] =
    //     useState<Brand[]>([])

    // const [loading, setLoading] =
    //     useState(true)

    // const [loaded, setLoaded] =
    //     useState(false)

    // useEffect(() => {

    //     // evita pedir varias veces
    //     if (loading) return

    //     const loadBrands = async () => {

    //         try {

    //             setLoading(true)

    //             const data =
    //                 await getMarcas()

    //             setBrands(data)

    //             setLoaded(true)

    //         } catch (error) {

    //             console.log(error)

    //         } finally {

    //             setLoading(false)

    //         }

    //     }

    //     loadBrands()

    // }, [loaded])


    const { toggleFilter } = useToggleFilter()

    console.log(selectedBrands)
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
                                items.map((brand) => (

                                    <label
                                        key={brand.slug}
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
                                                checked={selectedBrands.includes(brand.slug)}
                                                onChange={() => {
                                                    toggleFilter(
                                                        brand.slug,
                                                        selectedBrands,
                                                        setSelectedBrands
                                                    )
                                                }}
                                            />

                                            <span>{brand.slug}</span>
                                        </div>

                                        <span>
                                            ({brand.count})
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

export default BrandsFilter