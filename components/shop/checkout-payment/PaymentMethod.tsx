"use client";

import Image from "next/image";
import { useState } from "react";

export default function PaymentMethod() {
    const [openMethod, setOpenMethod] = useState<string | null>("yape");

    const toggleMethod = (method: string) => {
        setOpenMethod(openMethod === method ? null : method);
    };

    return (
        <div className="bg-white p-4 w-full mt-4 rounded-md shadow-[0_2px_8px_#00000040]">
            <div className="w-full max-w-3xl mx-auto">

                {/* TITULO */}
                <div className="mb-5">
                    <h2 className="text-[22px] font-semibold text-gray-900">
                        Indicaciones de pago
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Selecciona el método de pago y sigue las instrucciones
                        para completar tu operación de forma segura.
                    </p>
                </div>

                {/* ===================== YAPE ===================== */}
                <div className="shadow-[0_2px_8px_#00000040] border border-gray-200 rounded-md overflow-hidden bg-white">

                    {/* HEADER */}
                    <button
                        type="button"
                        onClick={() => toggleMethod("yape")}
                        className="w-full flex items-center justify-between px-5 py-3 bg-white hover:bg-[#f7f7fb] transition-colors duration-200"
                    >
                        <div className="flex items-center gap-4">

                            {/* ICONO */}
                            <div className="w-16 h-14 relative overflow-hidden">
                                <Image
                                    src="/images/payment/yape.svg"
                                    alt="Yape"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* TEXTOS */}
                            <div className="text-left">
                                <p className="text-[16px] font-semibold text-gray-900">
                                    Yape
                                </p>

                                <p className="text-sm text-gray-500">
                                    Transferencia inmediata desde la aplicación Yape.
                                </p>
                            </div>
                        </div>

                        {/* FLECHA */}
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openMethod === "yape" ? "rotate-180" : ""
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {/* CONTENIDO */}
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${openMethod === "yape"
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                            }`}
                    >
                        <div className="overflow-hidden">

                            <div className="border-t border-gray-200" />

                            <div className="px-5 py-5 bg-white">

                                {/* PASOS */}
                                <div className="space-y-4">

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            1.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Selecciona la opción{" "}
                                            <span className="font-medium">
                                                “Pagar con Yape”.
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            2.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Ingresa el número asociado a tu cuenta Yape.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            3.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Aprueba la operación desde tu aplicación móvil.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            4.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Una vez validado el pago, la transacción será procesada automáticamente.
                                        </p>
                                    </div>
                                </div>

                                {/* ALERTA */}
                                <div className="mt-5 bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                                    <p className="text-sm text-gray-700">
                                        El código de aprobación tiene una vigencia limitada.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================== VISA ===================== */}
                <div className="shadow-[0_2px_8px_#00000040] border border-gray-200 rounded-md overflow-hidden bg-white mt-4">

                    {/* HEADER */}
                    <button
                        type="button"
                        onClick={() => toggleMethod("visa")}
                        className="w-full flex items-center justify-between px-5 py-3 bg-white hover:bg-[#f7f7fb] transition-colors duration-200"
                    >
                        <div className="flex items-center gap-4">

                            {/* ICONO */}
                            <div className="w-16 h-14 relative overflow-hidden">
                                <Image
                                    src="/images/payment/visa.svg"
                                    alt="Visa"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* TEXTOS */}
                            <div className="text-left">
                                <p className="text-[16px] font-semibold text-gray-900">
                                    Visa
                                </p>

                                <p className="text-sm text-gray-500">
                                    Pago con tarjeta de crédito o débito.
                                </p>
                            </div>
                        </div>

                        {/* FLECHA */}
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openMethod === "visa" ? "rotate-180" : ""
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {/* CONTENIDO */}
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${openMethod === "visa"
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                            }`}
                    >
                        <div className="overflow-hidden">

                            <div className="border-t border-gray-200" />

                            <div className="px-5 py-5 bg-white">

                                {/* PASOS */}
                                <div className="space-y-4">

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            1.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Selecciona la opción{" "}
                                            <span className="font-medium">
                                                “Pagar con Visa”.
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            2.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Ingresa los datos de tu tarjeta de forma segura.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            3.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Completa la validación de seguridad solicitada por tu entidad bancaria.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            4.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Confirma la operación para finalizar el proceso de pago.
                                        </p>
                                    </div>
                                </div>

                                {/* ALERTA */}
                                <div className="mt-5 bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                                    <p className="text-sm text-gray-700">
                                        Todas las transacciones son procesadas bajo protocolos de seguridad y cifrado.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================== PAGO EFECTIVO ===================== */}
                <div className="shadow-[0_2px_8px_#00000040] border border-gray-200 rounded-md overflow-hidden bg-white mt-4">

                    {/* HEADER */}
                    <button
                        type="button"
                        onClick={() => toggleMethod("pagoefectivo")}
                        className="w-full flex items-center justify-between px-5 py-3 bg-white hover:bg-[#f7f7fb] transition-colors duration-200"
                    >
                        <div className="flex items-center gap-4">

                            {/* ICONO */}
                            <div className="w-16 h-14 relative overflow-hidden">
                                <Image
                                    src="/images/payment/pago-efectivo.svg"
                                    alt="PagoEfectivo"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* TEXTOS */}
                            <div className="text-left">
                                <p className="text-[16px] font-semibold text-gray-900">
                                    PagoEfectivo
                                </p>

                                <p className="text-sm text-gray-500">
                                    Pago mediante código CIP en agentes y banca digital.
                                </p>
                            </div>
                        </div>

                        {/* FLECHA */}
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openMethod === "pagoefectivo"
                                ? "rotate-180"
                                : ""
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {/* CONTENIDO */}
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${openMethod === "pagoefectivo"
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                            }`}
                    >
                        <div className="overflow-hidden">

                            <div className="border-t border-gray-200" />

                            <div className="px-5 py-5 bg-white">

                                {/* PASOS */}
                                <div className="space-y-4">

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            1.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Selecciona la opción{" "}
                                            <span className="font-medium">
                                                “Pagar con PagoEfectivo”.
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            2.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Se generará automáticamente un código CIP único para tu operación.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            3.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            Realiza el pago desde tu banca móvil, agentes autorizados o establecimientos afiliados.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <span className="font-semibold text-gray-900">
                                            4.
                                        </span>

                                        <p className="text-sm text-gray-700">
                                            La compra será confirmada automáticamente una vez recibido el pago.
                                        </p>
                                    </div>
                                </div>

                                {/* BANCOS */}
                                <div className="mt-5">
                                    <p className="text-sm font-medium text-gray-900 mb-3">
                                        Entidades disponibles:
                                    </p>

                                    <div className="flex flex-wrap gap-2">

                                        {[
                                            "BCP",
                                            "BBVA",
                                            "Interbank",
                                            "Scotiabank",
                                            "Yape",
                                            "Plin",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-xs text-gray-700"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ALERTA */}
                                <div className="mt-5 bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                                    <p className="text-sm text-gray-700">
                                        El código CIP cuenta con una vigencia limitada antes de su vencimiento.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}