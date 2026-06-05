'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface Props {
    children: React.ReactNode
}

const queryClient = new QueryClient()
const Provider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <Toaster richColors />
                {children}
            </SessionProvider>
        </QueryClientProvider>
    )
}

export default Provider