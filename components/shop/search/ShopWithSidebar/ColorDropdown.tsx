'use client'

import { Color } from '@/src/interface/categorySidebar'
import React, { useState } from 'react'

interface Props {
    colores: Color[]
}

const ColorDropdown = ({ colores }: Props) => {
    const [toggleDropdown, setToggleDropdown] = useState(true);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);

    const handleSelect = (id: number) => {
        if (selectedColors.includes(id)) {
            setSelectedColors(selectedColors.filter(c => c !== id));
        } else {
            setSelectedColors([...selectedColors, id]);
        }
    };

    return (
        <div className="bg-white shadow-md border border-gray-100 rounded-sm">
            <div
                onClick={(e) => {
                    e.preventDefault();
                    setToggleDropdown(!toggleDropdown);
                }}
                className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5 ${toggleDropdown && "shadow-sm"}`}
            >
                <p className="text-black font-sans truncate">Colores</p>

                <button className={`text-gray-900 transition duration-200 ${toggleDropdown && "rotate-180"}`}>
                    ▼
                </button>
            </div>

            <div className={`${toggleDropdown ? "block" : "hidden"}`}>
                <div className="grid grid-cols-2 gap-y-3 px-6 py-3">

                    {colores.map((c) => {
                        const isActive = selectedColors.includes(c.id);

                        return (
                            <div
                                key={c.id}
                                onClick={() => handleSelect(c.id)}
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                {/* círculo */}
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center border
                                        ${isActive ? "border-red-500" : "border-gray-300"}
                                    `}
                                    style={{ backgroundColor: `${c.codigo_hex}` }}
                                >
                                    {isActive && (
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 10 10"
                                        >
                                            <path
                                                d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </div>

                                {/* nombre */}
                                <span className="text-black font-sans truncate">
                                    {c.nombre}
                                </span>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    )
}

export default ColorDropdown