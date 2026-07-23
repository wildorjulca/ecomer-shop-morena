import DepartamentoContainer from "@/components/dashboard/departamentos/DepartamentoContainer"

const DepartamentosPage = async () => {


    return (
        <div className="flex flex-col gap-6 max-w-[1400px] w-full mx-auto">
            <DepartamentoContainer />
        </div>
    )
}

export default DepartamentosPage