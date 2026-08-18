'use client'

import { placeOrder } from "@/actions/shop/order/place-order"
import { CheckoutFormInputs } from "@/src/interface"
import { useCartStore } from "@/src/store/cart/cart-store"
import { useFormContext, SubmitHandler } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

/* ============================================================
   TIPOS DE CULQI (SDK externo sin types oficiales)
   👉 Esto evita errores de TypeScript
============================================================ */
interface CulqiInstance {
    token?: { id: string } // token generado después del pago
    error?: { user_message?: string } // error de tarjeta o usuario
    culqi: () => void
    open: () => void
    close: () => void
}

declare global {
    interface Window {
        CulqiCheckout: new (key: string, config: unknown) => CulqiInstance
    }
}

/* ============================================================
   COMPONENTE CHECKOUT PAYMENT
============================================================ */

interface Props {
    onOrderCreated: () => void
}
const CheckoutPaymentButton = ({ onOrderCreated }: Props) => {


    const { watch, setValue } = useFormContext<CheckoutFormInputs>()

    const selectedAddressId = watch("selectedAddressId")

    const session = useSession()
    const router = useRouter()
    const user = session.data?.user


    const { handleSubmit, formState: { isLoading } } =
        useFormContext<CheckoutFormInputs>()

    const { cart } = useCartStore()

    /* ============================================================
       ESTADO: orden creada
       👉 Guarda datos necesarios para Culqi (IMPORTANTE)
    ============================================================ */
    const [orderData, setOrderData] = useState<{
        orderId: string
        email: string
        totalAmount: number
    } | null>(null)

    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    /* ============================================================
       REF: instancia de Culqi
       👉 NO se guarda en state porque no debe re-renderizar
    ============================================================ */
    const culqiRef = useRef<CulqiInstance | null>(null)

    /* ============================================================
       1. CARGA DE SCRIPTS CULQI (solo una vez)
       👉 SDK externo + 3DS seguridad
    ============================================================ */
    useEffect(() => {
        const loadScript = (src: string) =>
            new Promise<void>((resolve) => {
                if (document.querySelector(`script[src="${src}"]`))
                    return resolve()

                const script = document.createElement("script")
                script.src = src
                script.async = true
                script.onload = () => resolve()

                document.body.appendChild(script)
            })

        loadScript("https://3ds.culqi.com")
        loadScript("https://js.culqi.com/checkout-js")
    }, [])

    /* ============================================================
       2. INICIALIZAR CULQI
       👉 SOLO configura el modal (NO cobra aún)
       👉 se puede reinicializar varias veces sin problema
    ============================================================ */
    const initCulqi = (data: {
        orderId: string
        email: string
        totalAmount: number
    }) => {

        if (!window.CulqiCheckout) return

        const instance = new window.CulqiCheckout(
            process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY!,
            {
                settings: {
                    title: "Mi Tienda",
                    currency: "PEN",

                    // ⚠️ IMPORTANTE: siempre en CENTAVOS
                    amount: data.totalAmount,

                    order: data.orderId,
                },
                client: {
                    email: data.email,
                },
                options: {
                    modal: true,
                    paymentMethods: {
                        tarjeta: true,
                        yape: true,
                        billetera: true,
                        bancaMovil: true,
                    },
                    paymentMethodsSort: ["yape", "tarjeta", "billetera", "bancaMovil"],
                },
                appearance: {
                    menuType: 'sliderTop',
                }

            }
        )

        /* ============================================================
           3. CALLBACK DE CULQI
           👉 se ejecuta cuando usuario termina el pago
        ============================================================ */
        instance.culqi = async () => {

            // ❌ ERROR o usuario canceló
            if (!instance.token) {
                setError(instance.error?.user_message || "Error en el pago")
                instance.close()
                return
            }

            const token = instance.token.id

            try {
                /* ========================================================
                   4. ENVIAR TOKEN AL BACKEND
                   👉 AQUÍ ocurre el cobro real (IMPORTANTE)
                ======================================================== */
                const res = await fetch("/api/culqi/charge", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token,
                        amount: data.totalAmount,
                        email: data.email,
                        currency_code: "PEN",
                        orderId: data.orderId,
                    }),
                })

                const result = await res.json()

                if (!result.ok) {
                    setError(result.message)
                    instance.close()
                    return
                }

                /* ========================================================
                   5. PAGO EXITOSO
                   👉 aquí puedes redirigir o limpiar carrito
                ======================================================== */
                console.log("✅ Pago exitoso")

                instance.close()

                // 👉 ejemplo: redirección a success page
                router.push(`/success?orderId=${data.orderId}`)

            } catch (err) {
                setError("Error procesando pago")
                instance.close()
            }
        }

        culqiRef.current = instance
    }

    /* ============================================================
       4. CREAR ORDEN + PREPARAR PAGO
    ============================================================ */
    const onSubmit: SubmitHandler<CheckoutFormInputs> = async (data) => {

        setIsProcessing(true)
        setError(null)

        try {

            /* --------------------------------------------------------
               1. preparar productos del carrito
            -------------------------------------------------------- */
            const products = cart.map(item => ({
                variante_id: item.varianteId,
                cantidad: item.cantidad,
            }))

            /* --------------------------------------------------------
               2. crear orden en backend
            -------------------------------------------------------- */
            const { departamento_id, provincia_id, ...rest } = data

            const response = await placeOrder(products, rest, selectedAddressId)

            if (!response.ok) {
                setError(response.message)
                setIsProcessing(false)
                return
            }

            // 
            // onOrderCreated()
            setValue("orderCreated", true)

            /* --------------------------------------------------------
               3. calcular total en centavos
            -------------------------------------------------------- */
            const totalAmount =
                cart.reduce((sum, i) => sum + i.precio * i.cantidad, 0) * 100

            const order = {
                orderId: String(response.order?.id),
                email: user?.email || "",
                totalAmount,
            }

            /* --------------------------------------------------------
               4. guardar estado local
            -------------------------------------------------------- */
            setOrderData(order)

            /* --------------------------------------------------------
               5. inicializar Culqi
            -------------------------------------------------------- */
            initCulqi(order)

            /* --------------------------------------------------------
               6. abrir modal
            -------------------------------------------------------- */
            setTimeout(() => {
                culqiRef.current?.open()
                setIsProcessing(false)
            }, 300)

        } catch (err) {
            setError("Error creando pedido")
            setIsProcessing(false)
        }
    }

    /* ============================================================
       5. REABRIR MODAL SI USUARIO LO CIERRA
    ============================================================ */
    const handleReopenModal = () => {

        if (!orderData) return

        if (culqiRef.current) {
            culqiRef.current.open()
        } else {
            initCulqi(orderData)
            setTimeout(() => {
                culqiRef.current?.open()
            }, 300)
        }
    }

    /* ============================================================
       UI
    ============================================================ */
    return (
        <>
            {/* ERROR */}
            {error && (
                <p className="text-red-500 text-sm mb-2">{error}</p>
            )}

            {/* =====================================================
                BOTÓN PRINCIPAL / FLUJO DE PAGO
            ===================================================== */}
            {/* =====================================================
    BOTÓN PRINCIPAL / FLUJO DE PAGO
===================================================== */}
            {!orderData ? (

                <button
                    type="button"
                    disabled={
                        !watch("selectedAddressId") ||
                        isProcessing ||
                        isLoading
                    }
                    onClick={() => handleSubmit(onSubmit)()}
                    className={clsx(
                        "w-full py-3 text-white rounded-md transition-all duration-200",

                        // SIN DIRECCIÓN
                        !watch("selectedAddressId") && (
                            "bg-gray-300 text-gray-500 cursor-not-allowed"
                        ),

                        // PROCESANDO
                        isProcessing && (
                            "bg-gray-400 cursor-not-allowed"
                        ),

                        // ACTIVO
                        watch("selectedAddressId") &&
                        !isProcessing && (
                            "bg-[#6A148E] hover:bg-[#7b1fa2] cursor-pointer"
                        )
                    )}
                >

                    {/* LOADING */}
                    {isProcessing ? (

                        <div className="flex items-center justify-center gap-3">

                            <div className="relative h-5 w-5">
                                <div className="absolute inset-0 rounded-full border-2 border-white opacity-30"></div>

                                <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                            </div>

                            <span className="text-sm font-medium tracking-wide animate-pulse">
                                Procesando ...
                            </span>

                        </div>

                    ) : (

                        // TEXTO NORMAL
                        !watch("selectedAddressId")
                            ? "Selecciona una dirección"
                            : "Pagar ahora"

                    )}

                </button>

            ) : (

                /* =====================================================
                    ESTADO: orden creada
                ===================================================== */
                <div className="space-y-3">

                    {/* mensaje sutil */}
                    <div className="flex items-start gap-2 px-1">

                        <div className="
            mt-1
            h-2
            w-2
            rounded-full
            bg-amber-400
            animate-pulse
        " />

                        <div>
                            <p className="text-sm font-medium text-neutral-800">
                                Pago pendiente
                            </p>

                            <p className="text-xs text-neutral-500">
                                Tu pedido fue reservado. Completa el pago para confirmarlo.
                            </p>
                        </div>

                    </div>

                    {/* botón estilo paypal */}
                    <button
                        type="button"
                        onClick={handleReopenModal}
                        className="
            w-full 
            py-4 
            rounded-lg 
            font-medium 
            transition-all 
            duration-200 
            flex 
            items-center 
            justify-center 
            gap-2 
            bg-[#0070ba] 
            hover:bg-[#003087] 
            text-white 
            shadow-md 
            hover:shadow-lg
            active:scale-[0.98]
        "
                    >
                        <CreditCard className="w-4 h-4" />

                        <span>Completar pago</span>
                    </button>

                </div>
            )}
        </>
    )
}

export default CheckoutPaymentButton