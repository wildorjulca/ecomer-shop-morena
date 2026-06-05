import { InputHTMLAttributes, useId } from "react"
import clsx from "clsx"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

export default function FloatingInput({
    label,
    error,
    type = "text",
    id,
    ...props
}: Props) {

    const generatedId = useId()
    const inputId = id || generatedId

    return (
        <div className="relative w-full">

            {/* INPUT */}
            <input
                id={inputId}
                type={type}
                placeholder=" "
                {...props}
                className={clsx(
                    // base
                    "peer block w-full text-sm px-2.5 pt-4 pb-2.5",
                    "bg-transparent rounded-md border appearance-none outline-none",
                    "transition-all duration-200 ease-out",

                    // estado borde
                    error ? "border-red-500 border-2" : "border-gray-300",

                    // hover solo cuando está vacío
                    "peer-placeholder-shown:hover:border-gray-400",

                    // focus
                    "focus:border-[#6A148E] focus:ring-1 focus:ring-[#6A148E]",

                    // cuando tiene texto
                    "peer-[&:not(:placeholder-shown)]:border-[#6A148E]",
                    "peer-[&:not(:placeholder-shown)]:ring-1",
                    "peer-[&:not(:placeholder-shown)]:ring-[#6A148E]"
                )}
            />

            {/* LABEL */}
            <label
                htmlFor={inputId}
                className={clsx(
                    // base
                    "pointer-events-none absolute text-[15px] origin-left left-2 px-2 bg-white",
                    "transition-all duration-200 ease-out",

                    // color
                    error ? "text-red-500" : "text-gray-500",

                    // 🔥 comportamiento clave
                    error
                        ? "top-2 -translate-y-4 scale-75" // siempre arriba si hay error
                        : [
                            "top-2 -translate-y-4 scale-75", // estado flotante
                            "peer-placeholder-shown:top-1/2",
                            "peer-placeholder-shown:-translate-y-1/2",
                            "peer-placeholder-shown:scale-100"
                        ],

                    // focus
                    "peer-focus:top-2",
                    "peer-focus:-translate-y-4",
                    "peer-focus:scale-75",
                    "peer-focus:text-[#6A148E]"
                )}
            >
                {label}
            </label>

            {/* ERROR */}
            {error && (
                <span className="text-red-500 mt-1 text-sm block">
                    {error}
                </span>
            )}

        </div>
    )
}