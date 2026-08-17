'use client'

import clsx from 'clsx';
import { Briefcase, Heart, Icon, LogOut, Settings, ShoppingBag, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import Avatar from 'react-avatar';


const links = [
    { label: "Mi perfil", href: "/my-account/perfil", icon: User },
    { label: "Mis órdenes", href: "/my-account/mis-compras", icon: ShoppingBag },
    { label: "Favoritos", href: "/my-account/favoritos", icon: Heart },
    { label: "Experiencias", href: "/my-account/experiencias", icon: Briefcase },
    { label: "Configuración de la cuenta", href: "/my-account/configuracion", icon: Settings },
];

interface Props {
    className?: string
}
const AccountSidebar = ({ className }: Props) => {
    const pathname = usePathname()
    const { data: session, status } = useSession()


    // console.log(isActive.get(""))
    return (
        <div className={`w-[400px] bg-white border shadow-xl border-gray-200 rounded-xs ${className} `}>
            <div className='h-32 flex items-center justify-center bg-violet-50'>
                {status === "loading" ? (
                    <h3>Cargando...</h3>
                ) : (
                    <div className='flex items-center justify-center flex-col'>
                        <span className='text-xl font-medium'>Hola {session?.user?.name ?? ""}!</span>
                        <Avatar color='#ab2bddfe' size={"70"} round name={session?.user?.name ?? ""} />
                    </div>
                )}
            </div>
            <div className='flex flex-col'>
                {links.map(item => {
                    const isActive = item.href === pathname
                    // console.log(isActive)
                    const Icon = item.icon
                    return (
                        <Link
                            className={
                                clsx(
                                    "flex items-center gap-4 hover:bg-[#C4C4C4] hover:cursor-pointer p-3 text-black",
                                    {
                                        "bg-[#6A148E] hover:bg-[#a306e0fE] text-white": isActive,
                                        "border-l-4 border-transparent": !isActive
                                    }

                                )
                            }
                            key={item.href} href={item.href}>
                            <Icon size={25} strokeWidth={1} />
                            <span>{item.label}</span>

                        </Link>
                    )
                })}
                <button className='p-3  flex items-center gap-4 hover:cursor-pointer'>
                    <LogOut size={25} strokeWidth={1} /> <span>Salir</span>
                </button>
            </div>

        </div>
    )
}

export default AccountSidebar