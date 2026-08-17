'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, User, ShoppingBag, LogOut } from 'lucide-react'
import { logout } from '@/actions/shop/auth/logout'
import Link from 'next/link'

export default function UnauthenticatedPopover() {

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
                <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center   rounded-md text-white transition"
                >
                    {/* <div className='flex flex-col  md:text-sm'> */}
                        {/* !Hola! */}
                        <span className=''>
                            Inicia sesión
                        </span>
                    {/* </div> */}

                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    />
                </div>

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
                    <div className="absolute -top-2.5 right-4 w-4 h-4 bg-white rotate-45 border-l border-t"></div>

                    <div className="p-2">
                        <Link
                            href={"/auth/login"}
                            // onClick={logout}
                            className="w-full flex mt-1 mb-1 items-center justify-center gap-2 py-2 rounded-sm bg-brand text-white hover:bg-purple-800 transition hover:cursor-pointer">
                            Inicia sesión
                        </Link>
                        <div className="border-t my-2 border-gray-300"></div>

                        <div className='mt-1'>
                            <p className='text-black text-center'>¿Eres nuevo en Asos?</p>
                            <Link href={"/auth/new-account"} className='text-blue-500 underline text-center flex items-center justify-center' >Crea tu cuenta</Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}