"use client"

import { useEffect, useState } from "react"

import BrandsFilter from "./BrandsFilter"
import SizesFilter from "./SizesFilter"
import FiltersMain from "./FiltersMain"

import { getMarcas } from "@/actions/shop/filters/marcas"

import { FilterView } from "../../gender/GendeHeaderFilters"
import { getGenders } from "@/actions/shop/filters/genders"
import GenderFilter from "./GenderFilter"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import useApplyFilters from "@/src/hooks/shop/filters/useApplyFilters"
import { getCategories } from "@/actions/shop/filters/getCategorys"
import CategoryFilter from "./CategorysFilter"
import { OrderByFilter } from "./OrderByFilter"

export interface FilterItem {
    nombre: string
    slug: string
    count?: number
}

interface Props {
    view: FilterView

    setView: (
        view: FilterView
    ) => void

    open: boolean

    onClose: () => void
}

const FiltersDrawer = ({
    view,
    setView,
    open,
    onClose
}: Props) => {


    // cache data
    const [filtersData, setFiltersData] =
        useState<
            Record<string, FilterItem[]>
        >({})

    // cache loaded
    const [loadedFilters, setLoadedFilters] =
        useState<
            Record<string, boolean>
        >({})

    // loading
    const [loading, setLoading] =
        useState(false)


    const router = useRouter()
    const pathname = usePathname()
    // const searchParams = useSearchParams()


    const { applyFilters } = useApplyFilters()

    const [selectedBrands, setSelectedBrands] =
        useState<string[]>([])

    const [sortBy, setSortBy] = useState<
        | "recent"
        | "price-asc"
        | "price-desc"
        | "best-selling"
    >("recent")

    const params = useParams()
    const gender = params.gender as string

    const [selectedColors, setSelectedColors] =
        useState<string[]>([])


    const [selectedCategories, setselectedCategories] =
        useState<string[]>([])


    useEffect(() => {

        const loadFilter = async () => {

            // evita repetir request
            if (loadedFilters[view]) return

            // main no necesita fetch
            if (view === "main") return

            try {

                setLoading(true)

                let data: FilterItem[] = []

                switch (view) {

                    case "brands":

                        data = await getMarcas(gender)
                        break

                    case "sizes":

                        // data = await getSizes()

                        break

                    case "gender":

                        data = await getGenders()

                        break
                    case "category":

                        data = await getCategories(gender)

                        break

                    case "ordenar-por":

                        //!! aca en ordenar por quiero que tenga un uestate aparte  osea de odndenar por orecio d emayor a menor o de mnr  amayor pproductsos mas venidos  asi si xf eso

                        // data = await getCategories()

                        break

                }

                // guarda data
                setFiltersData(prev => ({
                    ...prev,
                    [view]: data
                }))

                // marca loaded
                setLoadedFilters(prev => ({
                    ...prev,
                    [view]: true
                }))

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }

        }

        loadFilter()

    }, [view])


    const handleApplyFilters = () => {
        applyFilters({
            brands: selectedBrands,
            colors: selectedColors,
            categories: selectedCategories,
            sortBy: sortBy


            // gender
            // gender: selectedGenders
        })

        onClose()
    }

    const handleFilterClear = () => {

        setSelectedBrands([])
        setSelectedColors([])
        setselectedCategories([])
        router.push(`${pathname}`)
        onClose()
    }

    return (

        <div
            className={`
                fixed
                inset-0
                z-50
                transition-all
                duration-300
                ${open
                    ? "pointer-events-auto"
                    : "pointer-events-none"
                }
            `}
        >

            {/* overlay */}
            <div
                onClick={onClose}
                className={`
                    absolute
                    inset-0
                    bg-black/40
                    transition-opacity
                    duration-300
                    ${open
                        ? "opacity-100"
                        : "opacity-0"
                    }
                `}
            />

            {/* drawer */}
            <div
                className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    w-full
                    sm:w-[420px]
                    bg-white
                    transition-transform
                    duration-300
                    ease-out
                    flex
                    flex-col
                    ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >

                {/* CONTENT */}
                <div
                    className="
                        flex-1
                        overflow-y-auto
                    "
                >

                    {
                        view === "main" && (
                            <FiltersMain
                                setView={setView}
                                onClose={onClose}
                            />
                        )
                    }

                     {
                        view === "category" && (
                            <CategoryFilter
                                items={
                                    filtersData.category || []
                                }
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setselectedCategories}
                                loading={loading}
                                setView={setView}
                            />
                        )
                    }

                    {
                        view === "brands" && (
                            <BrandsFilter
                                items={
                                    filtersData.brands || []
                                }
                                loading={loading}
                                setView={setView}

                                setSelectedBrands={setSelectedBrands}
                                selectedBrands={selectedBrands}
                            />
                        )
                    }

                    {
                        view === "sizes" && (
                            <SizesFilter
                                setView={setView}
                            />
                        )
                    }

                    {
                        view === "gender" && (
                            <GenderFilter
                                items={
                                    filtersData.gender || []
                                }
                                loading={loading}
                                setView={setView}
                            />
                        )
                    }

                    {
                        view === "ordenar-por" && (
                            <OrderByFilter
                                // items={orderOptions}
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                setView={setView}
                            />
                        )
                    }


                </div>

                {/* FOOTER */}
                <div
                    className="
                        border-t
                        border-gray-200
                        p-4
                        bg-white
                        flex
                        items-center
                        gap-3
                    "
                >

                    {/* limpiar */}
                    <button
                        onClick={handleFilterClear}
                        className="
                            flex-1
                            h-[52px]
                            border
                            border-black
                            rounded-sm
                            font-medium
                            cursor-pointer
                            text-[15px]
                            hover:bg-gray-100
                            transition
                        "
                    >
                        Limpiar filtros
                    </button>

                    {/* resultados */}
                    <button
                        onClick={handleApplyFilters}
                        className="
                            flex-1
                            h-[52px]
                            bg-[#6A148E]
                            text-white
                            cursor-pointer
                            rounded-sm
                            border-none
                            font-medium
                            text-[15px]
                            hover:bg-[#600e83]
                            transition
                        "
                    >
                        Mostrar resultados
                    </button>

                </div>

            </div>

        </div>

    )
}

export default FiltersDrawer