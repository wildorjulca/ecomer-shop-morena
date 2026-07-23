'use client'

import { Download, Plus, Upload } from 'lucide-react'


type Props = {
    onCreate: () => void
}
export default function MarcaHeader({ onCreate }: Props) {

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Marcas
                    </h1>

                    <p
                        className="text-sm mt-0.5"
                        style={{ color: 'rgba(0,0,0,0.45)' }}
                    >
                        Gestiona el catálogo de tu tienda
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center gap-2 h-9 px-4 rounded-lg border"
                    >
                        <Upload size={15} />
                        Importar
                    </button>

                    <button
                        className="flex items-center gap-2 h-9 px-4 rounded-lg border"
                    >
                        <Download size={15} />
                        Exportar
                    </button>

                    <button
                        onClick={onCreate}
                        className="flex items-center gap-2 h-9 px-4 rounded-lg text-white"
                        style={{
                            background: '#6A148E'
                        }}
                    >
                        <Plus size={16} />
                        Nueva marca
                    </button>
                </div>
            </div>


        </>
    )
}