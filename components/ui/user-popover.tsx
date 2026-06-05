'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, User, ShoppingBag, LogOut } from 'lucide-react'
import { logout } from '@/actions/shop/auth/logout'

export default function UserPopover({ name }: { name: string }) {

    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <>
            {/* 🔥 OVERLAY CON BLUR */}
            <div
                className={`
                    fixed inset-0 z-40 
                    bg-black/40 
                    transition-opacity duration-300
                    ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
                onClick={() => setOpen(false)}
            />

            <div className="relative z-50" ref={ref}>
                {/* BOTÓN */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-gray-700 transition"
                >
                    Hola {name}!
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* POPOVER */}
                <div
                    className={`
                        absolute right-0 mt-2 w-56 bg-white rounded-sm shadow-xl border
                        transition-all duration-300 origin-top-right
                        ${open
                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
                    `}
                >

                    {/* triangulito */}
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-l border-t"></div>

                    <div className="p-2">
                        <button className="w-full flex items-center gap-3 text-black px-4 py-2 text-sm hover:bg-gray-100 transition">
                            <ShoppingBag size={16} />
                            Mis compras
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-2 text-black text-sm hover:bg-gray-100 transition">
                            <User size={16} />
                            Mi cuenta
                        </button>

                        <div className="border-t my-2"></div>

                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-sm bg-brand text-white hover:bg-purple-800 transition hover:cursor-pointer">
                            <LogOut size={16} />
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}