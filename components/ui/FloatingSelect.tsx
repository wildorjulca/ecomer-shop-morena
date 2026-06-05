import { SelectHTMLAttributes, useId } from "react"
import { ChevronDown } from "lucide-react"

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    error?: string
    placeholder?: string
}

export default function FloatingSelect({
    label,
    error,
    placeholder = "Seleccione un distrito",
    id,
    children,
    ...props
}: Props) {
    const generatedId = useId()
    const selectId = id || generatedId

    return (
        <div className="w-full">
            <div className="relative">

                {/* SELECT */}
                <select
                    id={selectId}
                    defaultValue=""
                    {...props}
                    className={`
            w-full text-sm
            px-3 pt-6 pb-2.5 pr-10
            bg-white
            rounded-md
            border
            appearance-none outline-none

            transition-all duration-200

            ${error ? "border-red-500 border-2" : "border-gray-300"}

            hover:border-gray-400
            focus:border-[#6A148E]
            focus:ring-1 focus:ring-[#6A148E]
          `}
                >
                    <option value="" >
                        {placeholder}
                    </option>

                    {children}
                </select>

                {/* LABEL */}
                <label
                    htmlFor={selectId}
                    className={`
            absolute left-3 top-2
            text-[12px] leading-none
            px-1 bg-white

            ${error ? "text-red-500" : "text-gray-500"}
          `}
                >
                    {label}
                </label>

                {/* ICONO */}
                <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
            </div>

            {/* ERROR */}
            {error && (
                <span className="text-sm text-red-500 mt-1">{error}</span>
            )}
        </div>
    )
}