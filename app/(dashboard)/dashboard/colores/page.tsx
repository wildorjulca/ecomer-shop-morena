import ColorHeader from '@/components/dashboard/colores/ColorHeader'
import ColorTable from '@/components/dashboard/colores/ColorTable'
import React from 'react'

const ColoresPage = () => {
    return (
        <div className="flex flex-col gap-6 max-w-[1400px] w-full mx-auto">
            <ColorHeader />
            <ColorTable />
            {/* <CategoriaTable /> */}
            {/* <ProductosStats />
            <ProductosTable /> */}
            {/* <DataTable
                 data={} */}
        </div>
    )
}

export default ColoresPage