import { getProductBySlug } from '@/actions/shop/product/productBySlug'
import { getProductsSimilares } from '@/actions/shop/products/getProductsSimilares'
import ProductGalleryDesktop from '@/components/shop/product/ProductGalleryDesktop'
import ProductVariants from '@/components/shop/product/ProductVariants'
import ProductView from '@/components/shop/product/ProductView'
import ProductGrid from '@/components/shop/products/ProductGrid'
import { bodyFont } from '@/config/fonts'
import { Suspense } from 'react'

interface Props {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{
        colorId: string,
    }>
}
const page = async ({ params }: Props) => {

    const { slug } = await params

    const resProduct = await getProductBySlug(slug)

    if (!resProduct.ok) {
        return <div>Error</div>
    }

    const product = resProduct.product


    const result = await getProductsSimilares(product.subcategoria, product.genero)

    if (!result.ok) {
        return (
            <p>
                {result.message}
            </p>
        )
    }

    return (
        <div className="max-w-[1200px] mx-auto flex flex-col flex-1 w-full">
            <ProductView
                product={product}
            />


            <div className='mt-10'>
                <h1 className={`font-sans text-2xl mb-4 font-medium uppercase`}>
                    Productos Similares
                </h1>
                <ProductGrid
                    products={result.products}
                    columns={4}
                />
            </div>


        </div>
    )
}

export default page