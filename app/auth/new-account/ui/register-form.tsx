'use client'

import { GoogleIcon } from '@/components/icons/GoogleIcon'
import { AtSign, CircleAlert, KeyIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import React, { useState, useTransition } from 'react'
import { registerUser } from '@/actions/shop/auth/register'
import { login } from '@/actions/shop/auth/login'

type Inputs = {
    nombre: string;
    email: string;
    password_hash: string;

}

const RegisterForm = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, seterrorMessage] = useState<string | null>(null)

    const { handleSubmit, register, formState: { errors } } = useForm<Inputs>({
    })
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        seterrorMessage(null)
        setIsLoading(true)

        const res = await registerUser(data)

        if (!res.ok) {
            seterrorMessage(res.message)
            setIsLoading(false)
            return
        }

        const { email, password_hash } = data

        const loginRes = await login(email, password_hash)

        if (!loginRes.ok) {
            seterrorMessage(loginRes.message as string)
            setIsLoading(false)
            return
        }

        window.location.replace("/")
    }

    return (
        <div className='space-y-3 flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="">
                <div className="">
                    <h1 className={` mb-3 text-3xl font-medium`}>
                        Crear cuenta
                    </h1>
                    <div className="w-full">
                        <div>
                            <label
                                className="mb-1 font-semibold text-[14px] mt-5 block  text-gray-900"
                                htmlFor="email"
                            >
                                Nombre
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md bg-slate-200  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                                    type="text"
                                    {...register("nombre", {
                                        required: "Campo requerido "
                                    })}
                                // placeholder="introduce tu correo electrónico"
                                // required
                                />
                                {errors.nombre && <span className='text-red-500 text-sm'>{errors.nombre.message}</span>}
                            </div>
                        </div>
                        <div>
                            <label
                                className="mb-1 font-semibold text-[14px] mt-5 block  text-gray-900"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md bg-slate-200  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                                    type="email"
                                    {...register("email", {
                                        required: "Campo requerido",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Ingresa un correo electrónico válido."
                                        }
                                    })}
                                // placeholder="introduce tu correo electrónico"
                                // required
                                />
                                {/* <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                                {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}

                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                className="mb-1 mt-5 block font-semibold text-[14px] text-gray-900"
                                htmlFor="password"
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md bg-slate-200  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                                    type="password"
                                    {
                                    ...register("password_hash", {
                                        required: "campo requerido",
                                        minLength: {
                                            value: 6,
                                            message: "La contraseña debe tener al menos 6 caracteres"
                                        }
                                    })
                                    }
                                // placeholder="Introduce tu contraseña"
                                // required
                                // minLength={6}
                                />
                                {/* <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                                {errors.password_hash && <span className='text-red-500 text-sm'>{errors.password_hash.message}</span>}

                            </div>
                        </div>
                    </div>
                    {/* <input type="hidden" name="redirectTo" /> */}
                    <button
                        disabled={isLoading}
                        className="mt-4 px-2.5 py-2.5 rounded-md text-white flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isLoading ? "Creando..." : "Crear cuenta"}
                    </button>
                    
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <>
                                <CircleAlert className="h-5 w-5 text-red-500" />
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            </>
                        )}
                    </div>
                </div>
            </form>

            <span className="relative z-10 block font-medium text-center mt-4.5">
                <span className="block absolute -z-10 left-0 top-1/2 h-px w-full bg-gray-200"></span>
                <span className="inline-block px-3 bg-white">Or</span>
            </span>

            <button
                type="submit"
                className="
    w-full flex items-center justify-center gap-3
    border border-gray-300
    bg-white
    py-2.5 px-4
    rounded-md
    text-sm font-medium text-gray-700
    shadow-sm
    hover:bg-gray-50
    active:bg-gray-100
    transition
    cursor-pointer
  "
            >
                <GoogleIcon className="h-5 w-5" />
                Iniciar sesión con Google
            </button>

        </div>
    )
}

export default RegisterForm