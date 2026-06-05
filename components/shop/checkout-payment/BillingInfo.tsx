"use client";

import { useSession } from "next-auth/react";

export default function BillingInfo() {

    const { data: session, status} = useSession()

    const email = session?.user?.email
    return (
        <div className="w-full bg-white rounded-md shadow-[0_2px_8px_#00000040] p-5 mt-4">

            {/* HEADER */}
            <div className="flex items-center justify-between">

                <h2 className="text-2xl font-semibold text-gray-800">
                    Boleta
                </h2>

            </div>

            {/* CONTENIDO */}
            <div className="mt-4">
                <p className="text-gray-700 leading-relaxed">
                    La boleta se enviará al siguiente correo{" "}
                    <span className="font-semibold text-gray-900">
                        {email}
                    </span>.
                </p>
            </div>

        </div>
    );
}