"use client"

import {
    usePathname,
    useRouter
} from "next/navigation"

const useApplyFilters = () => {

    const router = useRouter()

    const pathname = usePathname()

    const applyFilters = ({
        brands,
        colors,
        categories,
        sortBy

        // gender
    }: {
        brands: string[]
        colors: string[]
        categories: string[],
        sortBy: string
        // gender: string[]
    }) => {

        const params =
            new URLSearchParams()

        // brands
        if (brands.length > 0) {

            params.set(
                "brands",
                brands.join(",")
            )

        }

        // colors
        if (colors.length > 0) {

            params.set(
                "colors",
                colors.join(",")
            )

        }

        if (categories.length > 0) {
            params.set(
                "categoria",
                categories.join(",")
            )
        }

        if (sortBy) {
            params.set(
                "sort", sortBy.trim()
            )
        }

        // gender
        // if (gender.length > 0) {

        //     params.set(
        //         "gender",
        //         gender.join(",")
        //     )

        // }

        router.push(
            `${pathname}?${params.toString()}`
        )

    }

    return {
        applyFilters
    }

}

export default useApplyFilters