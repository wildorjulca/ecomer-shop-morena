'use client'

import React from 'react'
import ColorSelector from './ColorSelector';
import TallaSelector from './TallaSelector';
import VariantsTable from './VariantsTable';
import { useVariants } from '@/src/hooks/admin';
import ColorImageSelector from './ColorImageSelector';
import { useImageManager } from '@/src/hooks/admin/productos/useImageManager';
import { CldUploadWidget, CloudinaryUploadWidgetError, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useProductBuilderContext } from './ProductBuilderContext';


interface Props {
    colores: {
        id: number;
        nombre: string;
        codigo_hex: string | null;
    }[],
    tipoTallas: {
        id: number;
        nombre: string;
        descripcion?: string | null;
    }[]

}

const VariantsContainer = ({ colores, tipoTallas }: Props) => {

    // const variante = useVariants()
    // const managerImage = useImageManager()
    const { variantes, imagenesPorColor } = useProductBuilderContext()


    return (
        <div className='flex flex-col gap-6'>

            {/* <CldUploadWidget
                uploadPreset="next_cloudinary_app"
                options={{
                    folder: "shop-morena/products"
                }}
                onError={(error: CloudinaryUploadWidgetError) => {
                    console.log(error)

                }}
                onSuccess={(results: CloudinaryUploadWidgetResults) => {
                    console.log(results)
                }}

            >
                {({ open }) => {
                    return (
                        <button className='border bg-sky-800 text-slate-50 w-full' onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget> */}

            <ColorImageSelector
            // coloresSeleccionados={variante.selectedColors}
            // agregarImagenCloudinary={managerImage.agregarImagenCloudinary}
            // subirImagenesColor={managerImage.subirImagenesColor}
            // onDeleteImagen={managerImage.onDeleteImagen}
            // handleUpdateImage={managerImage.handleUpdateImage}
            // imagenesPorColor={managerImage.imagenesPorColor}
            />

            <ColorSelector
                colores={colores}
            // onToggleColor={variante.onToggleColor}
            // selectedColors={variante.selectedColors}

            />
            <TallaSelector
                tipoTallas={tipoTallas}
            // onToggleZises={variante.onToggleZises}
            // selectedZises={variante.selectedZises}
            />

            <VariantsTable
            // variantes={variante.variantes}
            // generarVariantes={variante.generarVariantes}
            // eliminarVariante={variante.eliminarVariante}
            // updateStockVariante={variante.updateStockVariante}
            // updatePriceVariante={variante.updatePriceVariante}

            />
        </div>
    )
}

export default VariantsContainer