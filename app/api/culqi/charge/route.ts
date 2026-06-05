// /api/culqi/charge/route.ts

import { prisma } from "@/libs";
import { NextRequest, NextResponse } from "next/server";

/**
 * ENDPOINT: POST /api/culqi/charge
 *
 * RESPONSABILIDAD:
 * 👉 Recibir token desde frontend
 * 👉 Enviar ese token a Culqi
 * 👉 Procesar el cobro REAL
 * 👉 Actualizar estado del pedido en BD
 */
export async function POST(request: NextRequest) {
    try {
        /* ============================================================
           1. RECIBIR DATOS DESDE EL FRONTEND
           Estos vienen desde instance.culqi()
        ============================================================ */
        const body = await request.json();

        const { token, amount, currency_code, email, orderId } = body;

        /**
         * token → generado por Culqi (representa tarjeta)
         * amount → monto en centavos (ej: 5000)
         * currency_code → PEN
         * email → cliente
         * orderId → ID de tu pedido en DB
         */

        /* ============================================================
           2. VALIDAR SECRET KEY (MUY IMPORTANTE)
           ⚠️ Esta key SOLO debe existir en backend
        ============================================================ */
        const secretKey = process.env.CULQI_SECRET_KEY;

        if (!secretKey) {
            console.error("❌ Falta CULQI_SECRET_KEY");

            return NextResponse.json(
                { ok: false, message: "Error de configuración del servidor" },
                { status: 500 }
            );
        }

        /* ============================================================
           3. LLAMADA REAL A CULQI (AQUÍ SE COBRA EL DINERO)
        ============================================================ */
        const response = await fetch("https://api.culqi.com/v2/charges", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`, // 🔐 AUTENTICACIÓN
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount, // en centavos
                currency_code, // PEN
                email,
                source_id: token, // 🔥 TOKEN generado por Culqi
            }),
        });

        const data = await response.json();

        /* ============================================================
           4. VALIDAR RESPUESTA DE CULQI
        ============================================================ */

        // ❌ Error técnico (ej: token inválido)
        if (!response.ok) {
            return NextResponse.json(
                { ok: false, message: data.user_message || "Error al procesar el pago" },
                { status: 400 }
            );
        }

        // ❌ Pago rechazado (tarjeta sin fondos, etc)
        if (data.outcome?.type !== 'venta_exitosa') {
            return NextResponse.json(
                { ok: false, message: data.outcome?.user_message || 'Pago rechazado' },
                { status: 400 }
            );
        }

        /* ============================================================
           5. PAGO EXITOSO 🎉
        ============================================================ */

        console.log("✅ Pago confirmado por Culqi");

        /* ============================================================
           6. ACTUALIZAR PEDIDO EN TU BASE DE DATOS
        ============================================================ */
        await prisma.pedido.update({
            where: { id: Number(orderId) },
            data: {
                estado_pago: "pagado"
            }
        });

        /* ============================================================
           7. RESPONDER AL FRONTEND
        ============================================================ */
        return NextResponse.json({
            ok: true,
            message: "Pago exitoso",
            chargeId: data.id,
            referenceCode: data.reference_code,
        });

    } catch (error) {
        console.error("❌ Error servidor:", error);

        return NextResponse.json(
            { ok: false, message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}