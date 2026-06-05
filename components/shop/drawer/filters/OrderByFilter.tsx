import { ChevronLeft } from "lucide-react"
import { FilterView } from "../../gender/GendeHeaderFilters"

type SortOption =
  | "recent"
  | "price-asc"
  | "price-desc"
  | "best-selling"

interface Props {
  sortBy: SortOption
  setSortBy: React.Dispatch<
    React.SetStateAction<SortOption>
  >
  setView: (view: FilterView) => void
}
export const OrderByFilter = ({
  sortBy,
  setSortBy,
  setView
}: Props) => {

  const options = [
    {
      value: "recent",
      label: "Más recientes"
    },
    {
      value: "price-asc",
      label: "Precio: menor a mayor"
    },
    {
      value: "price-desc",
      label: "Precio: mayor a menor"
    },
    {
      value: "best-selling",
      label: "Más vendidos"
    }
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setView("main")}
        className="
                w-full
          h-[60px]
          border-b
          px-5
          flex
          items-center
          gap-2
        "
      >

        <ChevronLeft size={20} />

        <span className="font-medium text-[18px]">
          Ordenar
        </span>

      </button>



      <div className="p-5">
        {options.map(option => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              checked={sortBy === option.value}
              onChange={() =>
                setSortBy(option.value as SortOption)
              }
            />

            {option.label}
          </label>
        ))}
      </div>

    </div>
  )
}