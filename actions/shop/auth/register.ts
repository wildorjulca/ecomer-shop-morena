'use server'

import { prisma } from '@/libs';
import bcrypt from 'bcrypt'

interface Props {
    nombre: string;
    email: string;
    password_hash: string;
}
export const registerUser = async ({ nombre, email, password_hash }: Props) => {
    try {
        const user = await prisma.usuario.create({
            data: {
                nombre: nombre,
                email: email,
                password_hash: bcrypt.hashSync(password_hash, 10),
                rol: "cliente"
            }
        })
        return {
            ok: true,
            user: user,
            message: "Usuario creado correctamente"
        }
    } catch (error) {
        console.log("error de registrar usuario", error)
        return {
            oke: false,
            message: "No se pudo crear el usuario"
        }
    }
}

