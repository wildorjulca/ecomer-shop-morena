import { AddressUser, CheckoutFormInputs } from "@/src/interface/checkout-payment"
import { Trash2 } from "lucide-react"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { FiEdit } from "react-icons/fi"
import { GoPlusCircle } from "react-icons/go"

interface Props {
    addresses: AddressUser[]
    onAdd: () => void
    onSave: () => void
    // onEdit: (addressEdit: CheckoutFormInputs) => void
    onEdit: () => void

}

export default function AddressList({ addresses, onAdd, onSave, onEdit }: Props) {

    const { watch, setValue, reset, getValues } = useFormContext<CheckoutFormInputs>()
    const selectedAddressId = watch("selectedAddressId")

    // ✅ auto seleccionar principal
    useEffect(() => {
        if (addresses?.length && !selectedAddressId) {
            const defaultAddress =
                addresses.find(a => a.es_principal) || addresses[0]

            setValue("selectedAddressId", defaultAddress.id)
        }
    }, [addresses, selectedAddressId, setValue])

    // ✅ guardar selección REAL
    const handleSave = () => {
        if (!selectedAddressId) return

        setValue("selectedAddressId", selectedAddressId)

        onSave()

    }

    return (
        <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

                {addresses?.map((address) => (
                    <label
                        key={address.id}
                        className={`flex items-start gap-3 cursor-pointer p-2 rounded-md transition
              ${selectedAddressId === address.id ? "bg-purple-50" : ""}
            `}
                    >

                        {/* RADIO */}
                        <div className="relative flex items-center justify-center mt-1">
                            <input
                                type="radio"
                                name="address"
                                checked={selectedAddressId === address.id}
                                onChange={() => setValue("selectedAddressId", address.id)}
                                className="peer h-5 w-5 appearance-none rounded-full border border-gray-400 checked:border-[#6A148E]"
                            />
                            <span className="absolute w-2.5 h-2.5 bg-[#6A148E] rounded-full opacity-0 peer-checked:opacity-100 transition" />
                            <span className="absolute w-10 h-10 rounded-full bg-[#6A148E] opacity-0 peer-hover:opacity-10 transition" />
                        </div>

                        {/* INFO */}
                        <div className="flex-1">
                            <p className="text-[15px] text-gray-900">
                                {address.direccion}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {address.departamento}/{address.provincia}/{address.distrito}
                            </p>
                        </div>

                        {/* ACCIONES */}
                        <div className="flex gap-1.5">
                            {/* <FiEdit size={20} className="cursor-pointer" />
                            <Trash2 size={20} strokeWidth={1.2} className="cursor-pointer" /> */}
                            {/* EDITAR */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()

                                    setValue("editingAddressId", address.id)

                                    reset({
                                        ...getValues(),
                                        nombres: address.nombres,
                                        apellidos: address.apellidos,
                                        direccion: address.direccion,
                                        telefono: address.telefono,
                                        departamento_id: address.departamento_id,
                                        provincia_id: address.provincia_id,
                                        distrito_id: address.distrito_id,
                                        es_principal: address.es_principal,
                                    })
                                    onEdit()
                                }}
                            >
                                <FiEdit
                                    size={20}
                                    className="cursor-pointer text-gray-600 hover:text-black transition"
                                />
                            </button>

                            {/* DELETE */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()

                                    // eliminar direccion
                                    console.log("delete", address.id)
                                }}
                            >
                                <Trash2
                                    size={20}
                                    strokeWidth={1.2}
                                    className="cursor-pointer text-gray-600 hover:text-red-500 transition"
                                />
                            </button>
                        </div>

                    </label>
                ))}

            </div>

            {/* FOOTER */}
            <div className="px-5 py-4 space-y-3">
                <button
                    onClick={onAdd}
                    type="button"
                    className="text-[#6A148E] text-sm flex items-center gap-1.5"
                >
                    <GoPlusCircle size={22} />
                    Agregar nueva dirección
                </button>

                <button
                    type="button"
                    onClick={handleSave}
                    className="w-full bg-[#6A148E] text-white py-3 rounded-md text-sm"
                >
                    Guardar
                </button>
            </div>
        </>
    )
}