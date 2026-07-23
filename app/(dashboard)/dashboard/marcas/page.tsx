import MarcaHeader from '@/components/dashboard/marcas/MarcaHeader'
import MarcasContainer from '@/components/dashboard/marcas/MarcasContainer'
import MarcaTable from '@/components/dashboard/marcas/MarcaTable'

const MarcasPage = async () => {


    return (
        <div className="flex flex-col gap-6 max-w-[1400px] w-full mx-auto">
            {/* <MarcaHeader />
            <ProductosStats />
            <MarcaTable /> */}
            <MarcasContainer />

        </div>
    )
}

export default MarcasPage