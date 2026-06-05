'use client'

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

const AccountHeader = () => {
    return (
        <header className="w-full bg-[#111111ef] text-white border-b border-gray-800">

            <div className="w-full flex items-center justify-between h-[70px]">

                {/* IZQUIERDA */}
                <div className="flex items-center h-full">

                    {/* LOGO + BORDE */}
                    <div className="flex items-center h-full px-4 border-r border-gray-700 hover:bg-gray-800 cursor-pointer">
                        <div className="flex flex-col items-center justify-center leading-none">
                            <span className="text-xl font-serif">R</span>
                            <span className="text-[10px] -mt-1">.com</span>
                        </div>
                    </div>

                    {/* TÍTULO */}
                    <div className="px-6">
                        <h1 className="text-2xl">Mi Cuenta</h1>
                    </div>

                </div>

                {/* DERECHA */}
                <div className="px-6">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 text-sm hover:text-gray-300 transition"
                    >
                        Cerrar sesión
                        <LogOut size={16} />
                    </button>
                </div>

            </div>

        </header>
    )
}

export default AccountHeader