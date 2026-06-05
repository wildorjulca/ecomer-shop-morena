import { ChevronLeft } from "lucide-react"

import { sizes } from "./filrer.data"

import { FilterView } from "./FiltersDrawer"

interface Props {
  setView: (view: FilterView) => void
}

const SizesFilter = ({
  setView
}: Props) => {

  return (
    <div className="relative h-full">

      {/* back */}
      <button
        onClick={() => setView("main")}
        className="
          h-[60px]
          border-b
          w-full
          px-5
          flex
          items-center
          gap-2
          font-medium
        "
      >

        <ChevronLeft size={20} />

        Volver

      </button>

      {/* items */}
      <div className="p-5 space-y-4">

        {
          sizes.map((size) => (

            <label
              key={size}
              className="
                flex
                items-center
                gap-3
                cursor-pointer
              "
            >

              <input
                type="checkbox"
                className="
                  w-5
                  h-5
                "
              />

              <span>{size}</span>

            </label>

          ))
        }

      </div>

      {/* footer */}
      <div
        className="
          sticky
          bottom-0
          bg-white
          border-t
          p-4
          flex
          gap-3
          shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
        "
      >

        <button
          className="
            flex-1
            h-[50px]
            border
            rounded-xl
            font-medium
          "
        >
          Limpiar
        </button>

        <button
          className="
            flex-1
            h-[50px]
            rounded-xl
            bg-red-500
            text-white
            font-medium
          "
        >
          Ver resultados
        </button>

      </div>

    </div>
  )
}

export default SizesFilter