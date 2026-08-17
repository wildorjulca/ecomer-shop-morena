'use client'

import { Search, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { searchProducts } from '@/actions/shop/products/searchProducts'
import { Product } from '@/src/interface/products'
import { CldImage } from 'next-cloudinary'
import { getImageSrc } from '@/src/utils/getImageSrc'

const DEBOUNCE_MS = 350
const MIN_CHARS = 2

const SearchBarMovile = () => {
    const router = useRouter()

    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<Product[]>([])

    const ref = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    // Evita que una respuesta vieja pise a una más nueva (race condition)
    const requestIdRef = useRef(0)

    const fetchResults = async (term: string) => {
        const currentRequestId = ++requestIdRef.current
        setLoading(true)

        try {
            const result = await searchProducts({
                page: 1,
                limit: 6,
                query: term,
            })

            // Si llegó una búsqueda más nueva mientras esta estaba en vuelo, ignorá esta respuesta
            if (currentRequestId !== requestIdRef.current) return

            setResults(result.ok ? (result.products as Product[]) : [])
        } catch {
            if (currentRequestId === requestIdRef.current) setResults([])
        } finally {
            if (currentRequestId === requestIdRef.current) setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setValue(val)

        const trimmed = val.trim()
        setOpen(trimmed.length > 0)

        if (debounceRef.current) clearTimeout(debounceRef.current)

        if (trimmed.length < MIN_CHARS) {
            setResults([])
            setLoading(false)
            return
        }

        // Debounce solo para no disparar una petición por cada tecla.
        // La data siempre se pide fresca, no hay cache de resultados.
        debounceRef.current = setTimeout(() => {
            fetchResults(trimmed)
        }, DEBOUNCE_MS)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const search = value.trim()
        if (!search) return

        if (debounceRef.current) clearTimeout(debounceRef.current)

        setOpen(false)
        router.push(`/search?query=${encodeURIComponent(search)}`)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [])

    const trimmedValue = value.trim()
    const showNoResults = !loading && trimmedValue.length >= MIN_CHARS && results.length === 0

    return (
        <div ref={ref} className="relative w-full">
            {/* INPUT — z-50 para quedar SIEMPRE por encima del overlay oscuro */}
            <form onSubmit={onSubmit} className="relative z-50 w-full">
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => trimmedValue.length > 0 && setOpen(true)}
                    placeholder="Buscar productos"
                    className="h-[42px] w-full rounded-sm bg-gray-100
          pl-4 pr-12 text-sm text-black placeholder:text-gray-500
          placeholder:text-base focus:outline-none"
                />

                <button
                    type="submit"
                    className="absolute right-0 top-1/2 flex h-[42px] w-[45px]
          -translate-y-1/2 items-center justify-center
          bg-[#6a6a6a] cursor-pointer"
                >
                    <Search size={20} className="text-white" />
                </button>
            </form>

            {/* OVERLAY — z-40, por debajo del input, solo oscurece el resto de la pantalla */}
            <div
                className={`fixed inset-0 top-[60px] h-screen z-40 bg-black/40 transition-opacity duration-300 ${open ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                onClick={() => setOpen(false)}
            />

            {/* DROPDOWN */}
            <div
                className={`absolute left-0 top-full z-50 mt-2 w-full
        overflow-hidden rounded-sm border bg-white shadow-xl
        transition-all duration-200 origin-top ${open
                        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                        : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
                    }`}
            >
                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {trimmedValue.length < MIN_CHARS && (
                        <p className="px-3 py-6 text-center text-sm text-gray-400">
                            Escribí al menos {MIN_CHARS} caracteres
                        </p>
                    )}

                    {loading && (
                        <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400">
                            <Loader2 size={16} className="animate-spin" />
                            Buscando...
                        </div>
                    )}

                    {showNoResults && (
                        <p className="px-3 py-6 text-center text-sm text-gray-400">
                            No se encontraron productos para &quot;{trimmedValue}&quot;
                        </p>
                    )}

                    {!loading &&
                        results.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.slug}`}
                                onClick={() => setOpen(false)}
                                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left active:bg-gray-100"
                            >
                                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                                    {/* {product.imagenes?.[0] && (
                                        <Image
                                            src={`/images/products/${product.imagenes[0]}`}
                                            alt={product.nombre}
                                            fill
                                            className="object-cover"
                                        />
                                    )} */}
                                    {
                                        product.imagenes[0].includes("res.cloudinary.com") ? (
                                            <CldImage
                                                alt={product.nombre}
                                                src={getImageSrc(product.imagenes[0])}
                                                fill
                                                removeBackground={true}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <Image
                                                alt={product.nombre}
                                                src={`${getImageSrc(product.imagenes[0])}`}
                                                fill
                                                className="object-cover"

                                            />

                                        )
                                    }
                                </div>

                                <div className="flex flex-col overflow-hidden">
                                    <span className="truncate text-sm text-gray-800">
                                        {product.nombre}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        S/ {product.precio_base_venta}
                                    </span>
                                </div>
                            </Link>
                        ))}

                    {!loading && results.length > 0 && (
                        <button
                            onClick={onSubmit}
                            className="mt-1 w-full rounded-md px-3 py-2 text-center text-sm font-medium text-gray-600 active:bg-gray-100"
                        >
                            Ver todos los resultados
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchBarMovile