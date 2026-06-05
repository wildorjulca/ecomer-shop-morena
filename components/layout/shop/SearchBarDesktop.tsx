"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const SearchBarDesktop = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);

        // 🔥 abre mientras escribes
        setOpen(val.trim().length > 0);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const search = value.trim();
        if (!search) return;

        setOpen(false);

        router.push(`/search?query=${encodeURIComponent(search)}`);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative flex-1 flex justify-center px-6">
            <form onSubmit={onSubmit} className="w-full max-w-[600px] relative">
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    autoComplete="on"
                    placeholder="Buscar productos"
                    className="w-full h-[42px] bg-gray-50 rounded-sm pl-4 pr-12 text-sm text-black"
                />

                <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#6a6a6a] h-[42px] w-[45px] flex items-center justify-center"
                >
                    <Search size={20} className="text-white" />
                </button>
            </form>

            {/* <div
                className={`
                    fixed inset-0 top-16 z-40 
                    bg-black/40 
                    transition-opacity duration-300
                    ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
                onClick={() => setOpen(false)}
            /> */}

            {/* DROPDOWN */}
            {/* <div
                className={`
                    absolute top-0 z-50 right-6 mt-12 w-96 bg-white rounded-sm shadow-xl border
                    transition-all duration-300 origin-top-right
                    ${open
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
                `}
            >
                <div className="absolute top-8 right-4 w-4 h-4 bg-white rotate-45 border-l border-t"></div>

                <div className="p-2">
                    <p className="text-sm text-gray-600">Buscador activo...</p>
                </div>
            </div> */}
        </div>
    );
};

export default SearchBarDesktop;