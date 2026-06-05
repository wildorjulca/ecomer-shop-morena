import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const ProfilePage = async () => {

    const session = await auth()


    if (!session?.user) {
        redirect("/auth/login?redirectTo=/profile");
    }

    return (
        <div>ProfilePagw

            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    )
}

export default ProfilePage