'use client'

import Image from "next/image";

interface Props {
    title?: string;
    description?: string;
}

export const EmptyProducts = ({
    title = "No encontramos productos",
    description = "Prueba cambiando los filtros o explorando otras categorías."
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <Image
                src="/empty-products.svg"
                alt="Sin resultados"
                width={200}
                height={200}
                priority
            />

            <h2 className="mt-6 text-[20px] font-semibold text-gray-800">
                {title}
            </h2>

            <p className="mt-2 text-gray-500 text-center max-w-md">
                {description}
            </p>
        </div>
    );
};