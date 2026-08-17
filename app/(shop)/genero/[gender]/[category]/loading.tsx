
import { useLoader } from '@/components/provider/LoaderProvider'
import { ProductGridSkeleton } from '@/components/ui/skeleton/ProductGridSkeleton'

// Se muestra automáticamente en navegaciones de ruta completa
// (cambio de gender o category en los params).
export default function Loading() {

  return (
    <div className="max-w-[1200px] mx-auto w-full bg-white relative">
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Sidebar skeleton */}
        <div className="w-64 shrink-0 hidden md:flex flex-col gap-3 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-5 rounded bg-gray-200 w-full" />
          ))}
        </div>

        {/* Grid skeleton */}
        <main className="flex-1 min-w-0">
          <ProductGridSkeleton columns={3} count={12} />
        </main>
      </div>
    </div>
    // <div className="fixed top-0 bg-black/40 right-0 h-screen w-screen z-50 flex justify-center items-center">
    //   <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
    // </div>
  )
}
