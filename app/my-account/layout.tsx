import React from 'react'
import AccountHeader from './ui/AccountHeader'
import { Poppins, Inter } from 'next/font/google'
import AccountSidebar from './ui/AccountSidebar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AccountMobileShell from './ui/AccountMobileShell'
import { LoaderProvider } from '@/components/provider/LoaderProvider'

interface Props {
    children: React.ReactNode
}

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600"],
    subsets: ["latin"]
})
const font = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
})

const MyAccountLayout = async ({ children }: Props) => {

    const session = await auth()

    if (!session?.user) {
        redirect("/auth/login?redirectTo=/my-account");
    }
    return (
        <div className={`${font.className} antialiased bg-[#F1F1F1] min-h-screen `}>
            <AccountHeader />
            <section className='container mx-auto  md:p-0 mt-8 flex gap-12 flex-col md:flex-row'>
                <AccountSidebar className='hidden md:block' />

                <LoaderProvider>
                    <AccountMobileShell>
                        {children}
                    </AccountMobileShell>
                </LoaderProvider>


            </section>
        </div>
    )
}

export default MyAccountLayout