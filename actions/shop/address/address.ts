'use server'

import { auth } from "@/auth"
import { prisma, sleep } from "@/libs"
import { AdressUserSave } from "@/src/interface/checkout-payment"

export const getUsersListAddress = async () => {
    const session = await auth()

    const userId = Number(session?.user?.id)

    if (!userId) {
        throw new Error("No ha iniciado sesión")
    }

    try {
        const addressUser = await prisma.direccion_usuario.findMany({
            where: { usuario_id: userId },
            include: {
                distrito: {
                    include: {
                        provincia: {
                            include: {
                                departamento: true
                            }
                        }
                    }
                }
            }
        })

        return addressUser.map((item) => ({
            direccion: item.direccion,
            distrito: item.distrito.nombre,
            provincia: item.distrito.provincia.nombre,
            departamento: item.distrito.provincia.departamento.nombre
        }))

    } catch (error) {
        throw new Error("Error al obtener direcciones del usuario")
    }
}

export const saveAddresUser = async (
    address: AdressUserSave,
    editingAddressId?: number
) => {

    await sleep(2)

    const session = await auth()

    const userId = Number(session?.user?.id)

    if (!userId) {
        throw new Error("No ha iniciado sesión")
    }

    try {

        /* =====================================================
           SI ES PRINCIPAL
        ===================================================== */
        if (address.es_principal) {

            await prisma.direccion_usuario.updateMany({
                where: {
                    usuario_id: userId
                },
                data: {
                    es_principal: false
                }
            })

        }

        /* =====================================================
           EDITAR DIRECCIÓN
        ===================================================== */
        if (editingAddressId) {

            const updatedAddress =
                await prisma.direccion_usuario.update({
                    where: {
                        id: editingAddressId
                    },
                    data: {
                        ...address,
                        es_principal: address.es_principal || false
                    }
                })

            return updatedAddress
        }

        /* =====================================================
           CREAR DIRECCIÓN
        ===================================================== */
        const newAddress =
            await prisma.direccion_usuario.create({
                data: {
                    ...address,
                    usuario_id: userId,
                    es_principal: address.es_principal || false
                }
            })

        return newAddress

    } catch (error) {

        console.log("Error save", error)

        throw new Error(
            "Error al guardar la dirección del usuario"
        )
    }
}