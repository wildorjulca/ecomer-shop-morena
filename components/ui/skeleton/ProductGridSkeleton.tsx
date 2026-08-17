'use client'

import { Skeleton } from 'boneyard-js/react'

interface Props {
  columns?: 2 | 3 | 4 | 5
  count?: number
  animate?: 'pulse' | 'shimmer' | 'solid'
}

// Un ítem fake que imita el layout real de ProductItem
function FakeProductItem() {
  return (
    <div className="w-full flex flex-col h-[340px] md:h-[600px]">
      {/* imagen */}
      <div className="bg-[#f0f0f0] w-full h-[250px] md:h-[500px]" />
      {/* nombre */}
      <div className="mt-2 h-3 w-3/4 rounded bg-gray-200" />
      {/* precio */}
      <div className="mt-1 h-3 w-1/3 rounded bg-gray-200" />
      {/* colores */}
      <div className="flex gap-2 mt-2">
        <div className="w-4 h-4 rounded-full bg-gray-200" />
        <div className="w-4 h-4 rounded-full bg-gray-200" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ columns = 3, count = 12, animate = 'shimmer' }: Props) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }

  return (
    <div className={`grid px-2 md:p-0 ${gridCols[columns]} gap-2`}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          name={`product-item-${i}`}
          loading={true}
          animate={animate}
          color="rgba(0,0,0,0.07)"
          darkColor="rgba(255,255,255,0.06)"
          fallback={<FakeProductItem />}
        >
          <FakeProductItem />
        </Skeleton>
      ))}
    </div>
  )
}
