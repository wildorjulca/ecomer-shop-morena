"use client"

import { ChevronLeft } from "lucide-react"
import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation"

import { FilterView }
    from "../../gender/GendeHeaderFilters"

interface Gender {
    nombre: string
    slug: string
    count?: number
}

interface Props {
    items: Gender[]
    loading: boolean

    setView: (
        view: FilterView
    ) => void
}

const GenderFilter = ({
    items,
    loading,
    setView
}: Props) => {

    const router = useRouter()

    const pathname =
        usePathname()

    const searchParams =
        useSearchParams()

    const handleGenderChange = (
        slug: string
    ) => {

        const params =
            searchParams.toString()




        router.push(
            `/${slug}?${params}`
        )

    }

    return (

        <div className="relative h-full">

            {/* TOP */}
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
                    Género
                </span>

            </button>

            {/* CONTENT */}
            <div className="p-5">

                {
                    loading && (

                        <div className="space-y-4">

                            {
                                Array.from({
                                    length: 8
                                }).map((_, i) => (

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

                    )
                }

                {
                    !loading && (

                        <div className="space-y-4">

                            {
                                items.map((gender) => {

                                    const isActive =
                                        pathname.includes(
                                            gender.nombre
                                        )

                                    return (

                                        <button
                                            key={gender.slug}

                                            onClick={() =>
                                                handleGenderChange(
                                                    gender.nombre
                                                )
                                            }

                                            className={`
                                                w-full
                                                group
                                                flex
                                                items-center
                                                justify-between
                                                transition
                                                duration-200
                                                hover:text-[#6A148E]

                                                ${isActive
                                                    ? "text-[#6A148E]"
                                                    : ""
                                                }
                                            `}
                                        >

                                            {/* LEFT */}
                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                "
                                            >

                                                {/* INPUT */}
                                                <input
                                                    type="checkbox"

                                                    checked={
                                                        isActive
                                                    }

                                                    readOnly

                                                    className="
                                                        w-5
                                                        h-5
                                                        accent-[#6A148E]
                                                        cursor-pointer
                                                    "
                                                />

                                                {/* TEXT */}
                                                <span
                                                    className="
                                                        text-black
                                                        text-base
                                                        sm:text-[18px]
                                                        font-sans
                                                        truncate
                                                        max-w-[160px]
                                                    "
                                                >
                                                    {
                                                        gender.nombre
                                                    }
                                                </span>

                                            </div>

                                            {/* COUNT */}
                                            <span
                                                className="
                                                    text-gray-600
                                                "
                                            >
                                                ({
                                                    gender.count
                                                })
                                            </span>

                                        </button>

                                    )

                                })
                            }

                        </div>

                    )
                }

            </div>

        </div>
    )
}

export default GenderFilter