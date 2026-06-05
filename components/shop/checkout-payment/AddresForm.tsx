'use client'

import { saveAddresUser } from "@/actions/shop/address/address";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingSelect from "@/components/ui/FloatingSelect";
import { useDepartments, useDistricts, useProvinces } from "@/src/hooks";
import { CheckoutFormInputs } from "@/src/interface";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { AlertCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

interface Props {
  onBack: () => void
}

export default function AddresForm({ onBack }: Props) {

  const queryClient = useQueryClient()
  const { register, handleSubmit, watch, setValue, getValues, reset, formState: { errors } } = useFormContext<CheckoutFormInputs>()

  const editingAddressId = watch("editingAddressId")
  const selectedDepartment = watch('departamento_id')
  const selectedProvince = watch('provincia_id')



  const [isPending, startTransition] = useTransition()
  const [errorMessage, seterrorMessage] = useState<string | null>(null)

  const { data: departments, isLoading } = useDepartments()

  const { data: provincias } = useProvinces(Number(selectedDepartment))
  const { data: distritos } = useDistricts(Number(selectedProvince))


  useEffect(() => {
    if (editingAddressId) return

    // cada vez que cambie el departamento seleccionado, reseteo el valor de provincia y distrito
    setValue("provincia_id", 0)
    setValue("distrito_id", 0)
  }, [selectedDepartment])

  useEffect(() => {
    if (editingAddressId) return
    // cada vez que cambie la provincia seleccionada, reseteo el valor de distrito
    setValue("distrito_id", 0)
  }, [selectedProvince])


  const onSubmitAddress: SubmitHandler<CheckoutFormInputs> = (data) => {
    try {
      startTransition(async () => {

        const { departamento_id, provincia_id, selectedAddressId, editingAddressId, orderCreated, ...rest } = data

        await saveAddresUser(rest, editingAddressId)

        queryClient.invalidateQueries({ queryKey: ["addressListUser"] })

        const currentSelectedAddressId =
          getValues("selectedAddressId")

        reset({
          selectedAddressId: currentSelectedAddressId
        })

        onBack()
      })

    } catch (error) {
      const messageError = error instanceof Error ? error.message : "Error desconocido"
      seterrorMessage(messageError)
    }

  }


  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

        <div className="flex flex-col gap-4">
          <FloatingInput
            label="Nombres*"
            {...register("nombres", {
              required: "Este campo es requerido."
            })}
            error={errors.nombres?.message}
          />
          <FloatingInput
            label="Apellidos*"
            {...register("apellidos", {
              required: "Este campo es requerido."
            })}
            error={errors.apellidos?.message}
          />
          <FloatingInput
            label="Dirección*"
            {...register("direccion", {
              required: "Este campo es requerido."
            })}
            error={errors.direccion?.message}
          />
          <FloatingInput
            label="Telefono*"
            {...register("telefono", {
              required: "Este campo es requerido."
            })}
            error={errors.telefono?.message}
          />
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
            {provincias?.map((prov) => (
              <option key={prov.id} value={prov.id}>{prov.nombre}</option>
            ))}
          </FloatingSelect>

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
            {distritos?.map((dist) => (
              <option key={dist.id} value={dist.id}>{dist.nombre}</option>
            ))}
          </FloatingSelect>

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

            <p className="text-[15px] text-gray-800">
              Guardar como dirección preferente
            </p>

          </label>
        </div>


      </div>

      <div className="px-5 py-4 space-y-3">
        <button
          onClick={() => {
            // reset()
            const addressId = getValues("selectedAddressId")

            reset({
              selectedAddressId: addressId,
            })
            onBack()
          }}
          className="text-sm text-gray-500"
        >
          ← Volver
        </button>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-2"> <AlertCircle /> {errorMessage}</p>
        )}

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
    </>
  )
}