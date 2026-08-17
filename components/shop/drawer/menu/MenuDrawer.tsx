'use client'

import { logout } from '@/actions/shop/auth/logout'
import clsx from 'clsx'
import {
    CircleUser,
    Heart,
    LogOut,
    Package,
    Plus,
    X,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'


interface Props {
    isOpen: boolean
    onClose: () => void;
}
const MenuDrawer = ({ isOpen, onClose }: Props) => {

    const params = useParams()
    const { status, data } = useSession()
    const isAuthenticated = status === 'authenticated'

    const genders = [
        { nombre: 'Hombre', url: 'hombre' },
        { nombre: 'Mujer', url: 'mujer' },
        { nombre: 'Unisex', url: 'unisex' },
        { nombre: 'Niños', url: 'ninos' },
        { nombre: 'Niñas', url: 'ninas' },
    ]

    return (
        <div className="md:hidden">
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed h-screen inset-0 z-40 bg-black/40"
                />
            )}

            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white
        shadow-xl transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Header */}
                <div className="border-b  p-4">
                    <div className=" flex items-center justify-between">
                        <h2 className="font-semibold text-2xl text-black">
                            ASOS
                        </h2>


                        <button onClick={onClose}>
                            <X size={25} className="text-black" />
                        </button>
                    </div>
                    {/* {isAuthenticated && <span className='text-sm text-purple-50'>Hola {data.user.name}!</span>} */}

                    {!isAuthenticated && (
                        <button className="w-full bg-brand mt-2 py-3 text-sm font-bold text-white">
                             {/* <button className="w-full bg-[#4c77a7] py-3 text-sm font-bold text-white"></button> */}
                            INICIA SESIÓN O REGÍSTRATE
                        </button>
                    )}
                </div>

                {/* Generos */}
                <div className="flex flex-col gap-3 p-4">
                    {genders.map((g) => (
                        <Link
                            href={`/genero/${g.url}`}
                            key={g.nombre}
                            onClick={onClose}
                            className={clsx(
                                'font-semibold text-center tracking-widest uppercase py-3 transition-colors',
                                params.gender === g.url
                                    ? 'bg-[#1e1d1dd4] text-white'
                                    : 'bg-[#EEEEEE] text-[#1e1d1dd4]'
                            )}
                        >
                            {g.nombre}
                        </Link>
                    ))}
                </div>

                <h3 className='px-4 text-black text-sm font-semibold tracking-widest mt-4 mb-4 underline text-center'>Bienvenido a ASOS</h3>
                {/* Cuenta */}
                <div className="border-b py-2">
                    {isAuthenticated ? (
                        <>
                            <button className="flex w-full border items-center gap-3 px-4 py-4 text-left hover:bg-gray-50">
                                <CircleUser size={22} className="text-gray-700" />
                                <span className="font-medium text-sm text-gray-800">
                                    Mi cuenta
                                </span>
                            </button>

                            <button className="flex border-b w-full items-center gap-3 px-4 py-4 text-left hover:bg-gray-50">
                                <Package size={22} className="text-gray-700" />
                                <span className="text-sm font-medium text-gray-800">
                                    Mis pedidos
                                </span>
                            </button>

                            <button className="flex w-full border-b items-center gap-3 px-4 py-4 text-left hover:bg-gray-50">
                                <Heart size={22} className="text-gray-700" />
                                <span className="text-sm font-medium text-gray-800">
                                    Mis favoritos
                                </span>
                            </button>


                        </>
                    ) : (
                        <p className="px-4 py-4 text-sm text-gray-500">
                            Inicia sesión para ver tus pedidos y favoritos
                        </p>
                    )}
                </div>

                {isAuthenticated && (
                    <div className='p-2'>
                        <button
                            onClick={logout}
                            className="mt-4 text-sm w-full  flex items-center justify-center gap-2 py-4 bg-brand text-white hover:bg-purple-800 transition hover:cursor-pointer">
                            <LogOut size={20} />
                            Cerrar sesión
                        </button>
                    </div>

                )}


            </aside>
        </div>
    )
}

export default MenuDrawer