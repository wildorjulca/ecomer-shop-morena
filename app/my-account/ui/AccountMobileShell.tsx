'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { ChevronLeft } from 'lucide-react'
import AccountSidebarMovile from './AccountSidebarMovile'

interface Props {
    children: React.ReactNode
}

const ACCOUNT_ROOT = '/my-account'

const AccountMobileShell = ({ children }: Props) => {
    const pathname = usePathname()
    const isRoot = pathname === ACCOUNT_ROOT

    return (
        <>
            {/* MENÚ — solo en mobile y solo en la raíz de /my-account */}
            {isRoot && <AccountSidebarMovile className="block md:hidden" />}

            {/* CONTENIDO — en mobile se oculta si estás en la raíz (ahí ya se ve el menú).
          En desktop siempre se ve, sin importar la ruta. */}
            <div
                className={clsx('w-full', {
                    'hidden md:block': isRoot,
                })}
            >
                {/* Botón volver — solo aparece en mobile y solo cuando NO estás en la raíz */}
                {!isRoot && (
                    <Link
                        href={ACCOUNT_ROOT}
                        className="mb-4 flex items-center gap-1 text-sm md:hidden"
                    >
                        <ChevronLeft size={25} />
                        Volver a menú
                    </Link>
                )}

                <div className="w-full border border-gray-100 bg-white p-8 shadow-sm">
                    {children}
                </div>
            </div>
        </>
    )
}

export default AccountMobileShell