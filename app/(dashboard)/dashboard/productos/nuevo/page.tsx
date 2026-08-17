import { Tag } from 'lucide-react'
import React from 'react'
import BasicInfo from './components/BasicInfo'
import CategorySection from './components/CategorySection'
import { getCatalagoData } from '@/actions/admin/productos/new/getCatalagoData'
import FormActions from './components/FormActions'
import FormProductContext from './components/FormProductContext'
import VariantsContainer from './components/VariantsContainer'
import { ProductBuilderProvider } from './components/ProductBuilderContext'

const ProductNewPage = async () => {

    const { colores, subCategorias, tipoTallas, marcas, generos } = await getCatalagoData()


    return (
        <div className='flex flex-col gap-6 max-w-[1400px] w-full mx-auto'>
            {/* Encabezado del header */}
            <div className="bg-white sm:rounded-xl rounded-xs border shadow-sm border-gray-200 sm:p-4 p-2 mb-4">
                <div className="flex items-center text-gray-600 mb-1">
                    <Tag className="mr-2" />
                    <span className="font-semibold">Agregar Producto & categorizacion</span>
                </div>
                <p className="text-xs text-amber-700">
                    Componentes modulares y reutilizables. Código organizado y escalable.
                </p>
            </div>
            <ProductBuilderProvider>

                <FormProductContext>
                    <section className="grid grid-cols-4 gap-8 ">
                        <div className="col-span-3 ">
                            <BasicInfo />

                            <VariantsContainer
                                colores={colores || []}
                                tipoTallas={tipoTallas}
                            // tallas={tallas || []}
                            />

                        </div>

                        {/* categorizacion */}
                        <div>
                            <CategorySection
                                subCategorias={subCategorias}
                                marcas={marcas}
                                generos={generos}
                            />
                            {/* <CategorySection
                        categoria={categorias || []}
                        marcas={marcas || []}
                        generos={generos || []}

                    /> */}
                            {/* <StatusSelector /> */}
                            {/* Acciones (Guardar, Cancelar, Limpiar) */}
                            <FormActions />
                        </div>

                    </section>

                </FormProductContext>
            </ProductBuilderProvider>


        </div>
    )
}

export default ProductNewPage