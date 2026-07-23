'use client'

import { Download, Plus, Upload } from 'lucide-react'

type Props = {
    onCreate: () => void
}

export default function ProvinciaHeader({ onCreate }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Provincias
                </h2>
                <p className="text-sm text-gray-500">
                    Gestiona el catálogo de tu tienda
                </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">
                    <Upload size={16} />
                    Importar
                </button>

                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">
                    <Download size={16} />
                    Exportar
                </button>

                <button
                    onClick={onCreate}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#6A148E] rounded-md hover:bg-[#54106f] transition"
                >
                    <Plus size={16} />
                    Nueva Provincia
                </button>
            </div>
        </div>
    )
}