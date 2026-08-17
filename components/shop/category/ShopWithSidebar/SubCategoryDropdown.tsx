import { Categories, Subcategorias } from "@/src/interface/categorySidebar";
import { useSidebarAction } from "@/src/store/sidebar/sidebar-movile-action";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
    subcategory: Categories[]
}

interface CategoryItemProps {
    sub: Categories
}

const CategoryItem = ({ sub }: CategoryItemProps) => {

    const { openSidebar, toogleSidebar } = useSidebarAction()
    const router = useRouter()
    const searchParams = useSearchParams()

    const params = useParams();


    const isActive = sub.slug == params.subCategoria


    const subCategorySlug = searchParams.get("subCategoria") || "N/A."

    const isSelected = subCategorySlug === sub.slug



    const handleNavigate = (valor: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // console.log(params.get("subCategoria"))
        // console.log(params.get("page"))

        params.delete("page")
        // console.log(params.get("page"))



        if (isSelected) {
            params.delete("subCategoria")
            // router.replace()
        } else {
            params.set("subCategoria", valor)
        }

        router.push(`?${params.toString()}`); // 👈 esto dispara el loading.tsx
        toogleSidebar(false)

    }
    return (
        <div
            onClick={() => handleNavigate(sub.slug)}
            // href={`/category/${sub.slug}`}
            className={`${isSelected && "text-blue-500"
                } group flex items-center justify-between transition duration-200 hover:text-blue-500 `}
        >
            <div className="flex items-center gap-2">
                <div
                    className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${isSelected ? "border-blue-500 bg-blue-500" : "bg-white border-gray-500"
                        }`}
                >
                    <svg
                        className={isSelected ? "block" : "hidden"}
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
                            stroke="white"
                            strokeWidth="1.94437"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <span className="text-black font-sans truncate max-w-[160px] ">
                    {sub.nombre}
                </span>
            </div>

            <span
                className={`${isSelected ? "text-white bg-blue-500" : "bg-gray-200"
                    } inline-flex rounded-[30px] text-xs px-2 transition duration-200 group-hover:text-white group-hover:bg-blue-500`}
            >
                {sub.count}
            </span>
        </div>
    );
};

export const SubCategoryDropdown = ({ subcategory }: Props) => {

    const [toggleDropdown, setToggleDropdown] = useState(true);

    return (

        <div className="bg-white shadow-md border border-gray-100 rounded-sm">
            <div
                onClick={(e) => {
                    e.preventDefault();
                    setToggleDropdown(!toggleDropdown);
                }}
                className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5 ${toggleDropdown && "shadow-sm"
                    }`}
            >
                <p className="text-gray-900 font-normal">Subcategorias</p>
                <button
                    aria-label="button for category dropdown"
                    className={`text-gray-900 transition duration-200 ${toggleDropdown && "rotate-180"
                        }`}
                >
                    <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={`w-full flex-col py-3 pl-6 pr-5 ${toggleDropdown ? "flex" : "hidden"
                    }`}
            >
                {subcategory.map((category) => (
                    <CategoryItem key={category.slug} sub={category} />
                ))}
            </div>
        </div>

    );
};