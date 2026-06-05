'use client'

import { updateUserProfile } from "@/actions/shop/address/updateUserProfile";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'sonner'


type Inputs = {
    id: number
    nombre: string
    apellido: string
    email: string
    telefono: string
    documento_tipo: "DNI" | "CE" | "PASAPORTE" | "RUC"
    documento_numero: string

}

interface Props {
    profile: Inputs
}
const ProfileForm = ({ profile }: Props) => {

    const { handleSubmit, register, reset, formState: { isSubmitting, errors } } = useForm<Inputs>({
        defaultValues: {
            ...profile
        }
    })

    console.log("profile form", profile)

    // 🔥 ESTO ES LO QUE TE FALTA
    // 🔥 ESTO ES LO QUE TE FALTA
    useEffect(() => {
        if (profile) {
            reset(profile)
        }
    }, [profile, reset])


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // setSuccess(false)

        try {
            const res = await updateUserProfile(data)
            if (!res.ok) {
                toast.error(res.message, {
                    position: "top-center"
                })
                return
            }

            console.log("res", res)
            toast.success(res.message, {
                position: "top-center",
            })

            // setSuccess(true)

        } catch (error) {
            toast.error("Error insesperado", {
                position: "top-center"
            })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="">
            <div className="">
                {/* <h1 className={` mb-3 text-xl`}>
                    Editar perfil
                </h1> */}
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
                                className="peer block w-full rounded-md border border-gray-100 bg-[#f4f4f4]  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                                type="text"
                                {...register("nombre", {
                                    // required: "Campo requerido "
                                })}
                            // placeholder="introduce tu correo electrónico"
                            // required
                            />
                            {/* {errors.nombre && <span className='text-red-500 text-sm'>{errors.nombre.message}</span>} */}
                        </div>
                    </div>
                    <div>
                        <label
                            className="mb-1 font-semibold text-[14px] mt-5 block  text-gray-900"
                            htmlFor="email"
                        >
                            Apellidos
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-100 bg-[#f4f4f4]  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                                type="text"
                                {...register("apellido", {
                                    // required: "Campo requerido "
                                })}
                            // placeholder="introduce tu correo electrónico"
                            // required
                            />
                            {/* {errors.nombre && <span className='text-red-500 text-sm'>{errors.nombre.message}</span>} */}
                        </div>
                    </div>
                    <div>
                        <label
                            className="mb-1 font-semibold text-[14px] mt-5 block  text-gray-900"
                            htmlFor="email"
                        >
                            Telefono
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md bg-secondary py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                                type="text"
                                {...register("telefono", {
                                    validate: (value) => {
                                        if (!value) return true // ✅ permite vacío

                                        if (!/^\d{9}$/.test(value)) {
                                            return "Debe tener exactamente 9 dígitos"
                                        }

                                        return true
                                    }
                                })}
                            />

                            {/* <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                            {/* {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>} */}

                        </div>
                    </div>
                    <div className='w-full flex gap-3.5 items-center'>
                        <div className='w-full'>
                            <label
                                className="mb-1 font-semibold text-[14px] mt-5 block  text-gray-900"
                                htmlFor="email"
                            >
                                TIpo documento
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md bg-secondary  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                                    type="number"
                                // {...register("email", {
                                //     required: "Campo requerido",
                                //     pattern: {
                                //         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                //         message: "Ingresa un correo electrónico válido."
                                //     }
                                // })}
                                // placeholder="introduce tu correo electrónico"
                                // required
                                />
                                {/* <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                                {/* {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>} */}

                            </div>
                        </div>
                        <div className='w-full'>
                            <label
                                className="mb-1 font-semibold text-[14px] mt-5 block  text-gray-900"
                                htmlFor="email"
                            >
                                N° documento
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md bg-secondary  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                                    type="text"
                                // {...register("email", {
                                //     required: "Campo requerido",
                                //     pattern: {
                                //         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                //         message: "Ingresa un correo electrónico válido."
                                //     }
                                // })}
                                // placeholder="introduce tu correo electrónico"
                                // required
                                />
                                {/* <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                                {/* {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>} */}

                            </div>
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
                                disabled
                                className="peer block w-full rounded-md bg-secondary  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                                type="email"
                                {...register("email", {
                                    // required: "Campo requerido",
                                    // pattern: {
                                    //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    //     message: "Ingresa un correo electrónico válido."
                                    // }
                                })}
                            // placeholder="introduce tu correo electrónico"
                            // required
                            />
                            {/* <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                            {/* {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>} */}

                        </div>
                    </div>
                </div>
                {/* <input type="hidden" name="redirectTo" /> */}
                <button
                    disabled={isSubmitting}
                    className="mt-4 px-2.5 py-2.5 dise rounded-sm text-white flex items-center hover:cursor-pointer justify-center bg-[#3b62c5] hover:bg-blue-600 disabled:opacity-50"
                >
                    {isSubmitting ? "Creando..." : "Guardar cambios"}
                </button>

                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {/* {errorMessage && (
                            <>
                                <CircleAlert className="h-5 w-5 text-red-500" />
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            </>
                        )} */}
                </div>
            </div>
        </form>
    )
}

export default ProfileForm