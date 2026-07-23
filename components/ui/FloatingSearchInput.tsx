'use client'

import { InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'
import clsx from 'clsx'

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

export default function FloatingSearchInput({
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={16}
      />
      <input
        {...props}
        type="text"
        placeholder="Buscar..."
        className={clsx(
          "pl-9 pr-3 py-1.5 text-sm",
          "border border-gray-300",
          "bg-white",
          "focus:outline-none focus:border-gray-500",
          "rounded",
          "placeholder:text-gray-400",
          "transition-colors duration-200",
          className
        )}
      />
    </div>
  )
}