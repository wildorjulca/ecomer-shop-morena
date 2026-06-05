import React from 'react'
import { Poppins } from 'next/font/google'
import { auth } from '@/auth'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
})
interface Props {
    children: React.ReactNode
}
const AuthLayout = async ({ children }: Props) => {

    const session = await auth()

    // if(session?.user)
    return (
        <div className={poppins.className}>
            {children}
        </div>
    )
}

export default AuthLayout