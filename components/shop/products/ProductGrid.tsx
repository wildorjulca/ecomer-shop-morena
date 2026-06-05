import React from 'react'
import ProductItem from './ProductItem'
import { Product } from '@/src/interface/products'

interface Props {
    products: Product[]
    columns?: 2 | 3 | 4 | 5
}
const ProductGrid = ({ products, columns = 5 }: Props) => {

    const gridCols = {
        2: "grid-cols-2",
        3: "grid-cols-2 md:grid-cols-3",
        4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"

    }

    return (
        // <div className='grid grid-cols-3 gap-1.5 lg:grid-cols-5  lg:gap-2 mt-4'>
        <div className={`grid px-2 md:p-0 ${gridCols[columns]}  gap-2`}>
            {products.map((product, index) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductGrid