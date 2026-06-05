import CategorySidebar from '@/components/shop/category/CategorySidebar'
import CategorySidebarMovile from '@/components/shop/category/CategorySidebarMovile'
import GenderHeaderFilters from '@/components/shop/gender/GendeHeaderFilters'
import { getSearchSidebar } from '@/actions/shop/search/getSearchSidebar'
import SearchSidebar from '@/components/shop/search/SearchSidebar'


interface Props {
    children: React.ReactNode,
    // searchParams: Promise<{
    //     genero?: string;
    //     categoria?: string
    // }>
}
const SearchLayout = async ({ children }: Props) => {

    // const { genero, categoria } = await searchParams

    // const res = await getSearchSidebar()

    // const { genders, categories, subcategorias } = res


    return (
        // <section>
        //     <div>
        //         <GenderHeaderFilters />
        //         {children}
        //     </div>
        // </section>

        <div className="max-w-[1200px] mx-auto w-full bg-white relative">
            <div className="flex flex-col md:flex-row gap-8 mt-8">

                {/* Sidebar */}
                <div className="w-64 shrink-0 hidden md:flex">

                    <SearchSidebar
                        // genders={genders}
                        // categories={categories}
                        // subcategorias={subcategorias}
                    />
                    {/* <CategorySidebar
                        categories={categorias}
                        subcategorias={subcategorias}
                        marcas={marcas}
                        gender={gender}
                        currentCategory={category}
                        tallas={tallas}
                    /> */}
                </div>

                {/* <div className={`w-64 shrink-0 flex md:hidden`}> */}
                {/* <CategorySidebarMovile
                    className='flex md:hidden'
                    subcategorias={subcategorias}
                    marcas={marcas}
                    gender={gender}
                    currentCategory={category}
                    tallas={tallas}
                /> */}
                {/* </div> */}



                {/* Contenido */}
                <main className="flex-1 min-w-0">    
                    {children}
                </main>

            </div>
        </div>
    )
}

export default SearchLayout