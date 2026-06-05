import React from 'react'
import AccountHeader from './ui/AccountHeader'
import { Poppins, Inter } from 'next/font/google'
import AccountSidebar from './ui/AccountSidebar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
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
        <div className={`${font.className} antialiased bg-[#F1F1F1] min-h-screen`}>
            <AccountHeader />
            <section className='container mx-auto mt-8 flex gap-12'>
                <div>
                    <AccountSidebar />
                </div>

                <div className='border p-8 w-full bg-white border-gray-100 shadow-sm'>
                    {children}
                </div>
            </section>
        </div>
    )
}

export default MyAccountLayout