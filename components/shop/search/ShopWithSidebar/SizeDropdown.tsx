'use client'

import { Talla } from '@/src/interface/categorySidebar'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
    tallas: Talla[]
}
const SizeDropdown = ({ tallas }: Props) => {

    const [toggleDropdown, setToggleDropdown] = useState(true);
    const params = useParams();
    const isActive = false
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
                <p className="text-black font-sans truncate">Marcas</p>
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
            <div className={`${toggleDropdown ? "w-full" : "hidden"}`}>
                <div className="flex flex-wrap px-5 gap-2 py-3">

                    {tallas.map((item) => {
                        // const isActive = selectedSizes.includes(item.id);

                        return (
                            <button
                                key={item.id}
                                // onClick={() => handleSelect(item.id)}
                                className={`px-3 py-1 border rounded-md text-sm transition
                                    ${isActive
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                    }
                                `}
                            >
                                {item.nombre}
                            </button>
                        );
                    })}

                </div>
            </div>
        </div >

    )
}

export default SizeDropdown