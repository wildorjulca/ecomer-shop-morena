import SearchSidebar from '@/components/shop/search/SearchSidebar'


interface Props {
    children: React.ReactNode,

}
const SearchLayout = async ({ children }: Props) => {

    return (

        <div className="max-w-[1200px] mx-auto w-full bg-white relative">
            {/* <div className="flex flex-col md:flex-row gap-8 mt-8"> */}

            {/* Sidebar */}
            {/* <div className="w-64 shrink-0 hidden md:flex">
                    <SearchSidebar />
                </div> */}





            {/* Contenido */}
            <main className="flex-1 min-w-0">
                {children}
            </main>

            {/* </div> */}
        </div>
    )
}

export default SearchLayout