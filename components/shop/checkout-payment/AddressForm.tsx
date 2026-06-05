'use client'
import { saveAddresUser } from '@/actions/shop/address/address'
import FloatingInput from '@/components/ui/FloatingInput'
import FloatingSelect from '@/components/ui/FloatingSelect'
import { useDepartments, useDistricts, useProvinces } from '@/src/hooks/shop/address/useAddress'
import { CheckoutFormInputs } from '@/src/interface'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { AlertCircle } from 'lucide-react'
import React, { useEffect, useState, useTransition } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'

const AddressForm = () => {

  const queryClient = useQueryClient()
  const { register, watch, handleSubmit, setValue, reset, formState: { errors } } = useFormContext<CheckoutFormInputs>()

  const [isPending, startTransition] = useTransition()
  const [errorMessage, seterrorMessage] = useState<string | null>(null)

  const selectedDepartment = watch('departamento_id')
  const selectedProvince = watch('provincia_id')

  // aqui va a ir el hook de react hook form para manejar el formulario de direccion de entrega, con validacion y todo eso, pero por ahora lo dejo asi para avanzar con el diseño del checkout payment


  // aqui voy a traer el hooks de departaments de react query para llenar los select de departamento provincia y distrito

  const { data: departments, isLoading } = useDepartments()

  const { data: provinces } = useProvinces(selectedDepartment ? Number(selectedDepartment) : undefined)
  const { data: districts } = useDistricts(selectedProvince ? Number(selectedProvince) : undefined)



  useEffect(() => {
    // cada vez que cambie el departamento seleccionado, reseteo el valor de provincia y distrito
    setValue("provincia_id", 0)
    setValue("distrito_id", 0)
  }, [selectedDepartment])

  useEffect(() => {
    // cada vez que cambie la provincia seleccionada, reseteo el valor de distrito
    setValue("distrito_id", 0)
  }, [selectedProvince])




  const onSubmitAddress: SubmitHandler<CheckoutFormInputs> = (data) => {
    try {
      startTransition(async () => {

        const { departamento_id, provincia_id, ...rest } = data

        await saveAddresUser(rest)

        queryClient.invalidateQueries({ queryKey: ["addressListUser"] })
        reset()
        // onBack()
      })

    } catch (error) {
      const messageError = error instanceof Error ? error.message : "Error desconocido"
      console.log(messageError)
      // seterrorMessage(messageError)
    }

  }



  return (
    <div className="bg-white shadow-[0_2px_8px_#00000040] rounded-md p-8 w-full">
      {/* <h3 className='font-medium text-xl'>Direccion  de entrega</h3> */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Direccion Entrega
      </h2>
      <div className='mt-4'>
        <div
          className='flex flex-col gap-4'
        // onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <FloatingInput
              label='Nombres*'
              // placeholder='Ingrese su nombre'
              {...register("nombres", {
                required: "Este campo es requerido."
              })}
              error={errors.nombres?.message}
            />
            {/* <input
              className="peer block w-full rounded-md bg-[#F1F1F1]  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
              placeholder='Nombres'
              {...register('nombres', { required: "El nombre es requerido" })}
            />
            {errors.nombres && <p className='text-red-500 text-sm mt-1'>{errors.nombres.message}</p>} */}
          </div>

          <div>
            <FloatingInput
              label='Telefono*'
              {...register("telefono", {
                required: "Este campo es requerido."
              })}
              error={errors.telefono?.message}
            />
          </div>
          <div className=''>
            {/* <input
              className="peer block w-full py-3.5 px-3   bg-[#F1F1F1]  text-sm focus:outline-2 placeholder:text-gray-500"
              placeholder='Direccion*'
              {...register('direccion', { required: "La direccion es requerida" })}
            />
            {errors.direccion && <p className='text-red-500 text-sm mt-1'>{errors.direccion.message}</p>} */}
            <FloatingInput
              label='Direccion*'
              {...register("direccion", {
                required: "Este campo es requerido."
              })}
              error={errors.direccion?.message}
            />
          </div>
          <div>
            <FloatingInput
              label='Apellidos'
              {...register("apellidos", {
                required: "Este campo es requerido."
              })}
              error={errors.apellidos?.message}
            />
          </div>
          {/* Departamento / Provincia / Distrito */}
          {/* Seleccionar select */}
          <div className='flex gap-2'>
            <div className='w-full'>
              <FloatingSelect
                label="Departamento"
                placeholder="Seleccione un departamento"
                error={errors.departamento_id?.message}
                {...register("departamento_id", {
                  required: "Este campo es requerido.",
                  valueAsNumber: true,
                  validate: value => value > 0 || "El departamento es requerida."
                })}
              >
                {/* <option value={""}>Seleccione un departamento</option> */}

                {departments?.map((dep) => (
                  <option key={dep.id} value={dep.id}>{dep.nombre}</option>
                ))}
              </FloatingSelect>
              {/* <select className="peer block w-full rounded-md bg-[#F1F1F1]  py-[12px] pl-3 text-sm focus:outline-2 placeholder:text-gray-500"
                {...register('departamento_id', {
                  required: "El departamento es requerido",
                  valueAsNumber: true,
                  validate: value => value > 0 || "El departamento es requerido"
                })}
              >
                <option value={0}>Departamento</option>
                {departments?.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.nombre}
                  </option>
                ))}
              </select>
              {errors.departamento_id && <p className='text-red-500 text-sm mt-1'>{errors.departamento_id.message}</p>} */}
            </div>

            <div className='w-full'>
              <FloatingSelect
                label="Provincia"
                placeholder="Seleccione una provincia"
                error={errors.provincia_id?.message}
                {...register("provincia_id", {
                  required: "Este campo es requerido.",
                  valueAsNumber: true,
                  validate: value => value > 0 || "La provincia es requerida"
                })}
              >
                {/* <option value={""}>Seleccione una provincia</option> */}
                {provinces?.map((prov) => (
                  <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                ))}
              </FloatingSelect>
              {/* <select className="peer block w-full rounded-md bg-[#F1F1F1]  py-[12px] pl-3 text-sm focus:outline-2 placeholder:text-gray-500"
                {...register('provincia_id',
                  {
                    required: "La provincia es requerida",
                    valueAsNumber: true,
                    validate: value => value > 0 || "La provincia es requerida"
                  })}
              >
                <option value={0}>Provincia</option>
                {provinces?.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.nombre}
                  </option>
                ))}
              </select>
              {errors.provincia_id && <p className='text-red-500 text-sm mt-1'>{errors.provincia_id.message}</p>} */}
            </div>

            <div className='w-full'>
              <FloatingSelect
                label="Distrito"
                placeholder="Seleccione un distrito"
                error={errors.distrito_id?.message}
                {...register("distrito_id", {
                  required: "Este campo es requerido.",
                  valueAsNumber: true,
                  validate: value => value > 0 || "El distrito es requerida"
                })}
              >
                {/* <option value={""}>Seleccione un distrito</option> */}
                {districts?.map((dist) => (
                  <option key={dist.id} value={dist.id}>{dist.nombre}</option>
                ))}
              </FloatingSelect>
              {/* <select className="peer block w-full rounded-md bg-[#F1F1F1]  py-[12px] pl-3 text-sm focus:outline-2 placeholder:text-gray-500"
                {...register('distrito_id', {
                  required: "El distrito es requerido",
                  valueAsNumber: true,
                  validate: value => value > 0 || "El distrito es requerido"
                })}
              >
                <option value={0}>Distrito</option>
                {districts?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.nombre}
                  </option>
                ))}
              </select>
              {errors.distrito_id && <p className='text-red-500 text-sm mt-1'>{errors.distrito_id.message}</p>} */}
            </div>


          </div>
          <div>
            <input
              className="peer block w-full rounded-md bg-[#F1F1F1]  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
              placeholder='Instrucciones (opcional)'
              {...register('instrucciones')}
            />
          </div>
          <div>

            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  {...register("es_principal")}
                  className="peer h-5 w-5 appearance-none rounded-full border border-gray-400 checked:border-[#6A148E]"
                />

                <span className="absolute w-2.5 h-2.5 bg-[#6A148E] rounded-full opacity-0 peer-checked:opacity-100 transition" />
                <span className="absolute w-10 h-10 rounded-full bg-[#6A148E] opacity-0 peer-hover:opacity-10 transition" />
              </div>

              <p className="text-[15px] text-gray-700">
                Guardar como dirección preferente
              </p>

            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-2"> <AlertCircle /> {errorMessage}</p>
          )}
          <div className='flex justify-end'>
            <button
              type="button"
              disabled={isPending}
              onClick={handleSubmit(onSubmitAddress)}
              className={clsx(
                "w-full text-white py-3 rounded-md text-sm",
                isPending ? "bg-gray-400 cursor-not-allowed"
                  : " bg-[#6A148E] hover:bg-[#7b1fa2] cursor-pointer"
              )}
            >
              {isPending ?
                <div className="flex items-center justify-center gap-3">
                  <div className="relative h-5 w-5">
                    <div className="absolute inset-0 rounded-full border-2 border-white opacity-30"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  </div>
                  <span className="text-sm font-medium tracking-wide animate-pulse">
                    Guardando ...
                  </span>
                </div>
                : "Guardar dirección"}

            </button>
          </div>

        </div>

      </div>


    </div >

  )
}

export default AddressForm