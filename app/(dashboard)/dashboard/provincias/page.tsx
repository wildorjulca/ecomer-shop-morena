import ProvinciaContainer from '@/components/dashboard/provincias/ProvinciaContainer'
import React from 'react'

const ProvinciasPage = () => {
    return (
        <div className="flex flex-col gap-6 max-w-[1400px] w-full mx-auto">
            <ProvinciaContainer />
        </div>
    )
}

export default ProvinciasPage