import React from 'react'
import { Poppins } from 'next/font/google'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
})
interface Props {
    children: React.ReactNode
}
const AuthLayout = async ({ children }: Props) => {

    const session = await auth()


    if(session?.user){
        redirect("/")
    }
    
    return (
        <div className={poppins.className}>
            {children}
        </div>
    )
}

export default AuthLayout