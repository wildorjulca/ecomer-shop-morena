import { useState } from "react"
import { X } from "lucide-react"
import AddresForm from "./AddresForm"
import AddressList from "./AddressList"
import { AddressUser, CheckoutFormInputs } from "@/src/interface/checkout-payment"
import { useFormContext } from "react-hook-form"

interface Props {
    addresses: AddressUser[]
    open: boolean
    onClose: () => void
}

export default function AddressModal({ addresses, open, onClose }: Props) {

    const { reset, getValues, watch } = useFormContext<CheckoutFormInputs>()

    const [view, setView] = useState<"list" | "form">("list")
    const editingAddressId = watch("editingAddressId")

    const [editingAddress, setEditingAddress] =
        useState<CheckoutFormInputs | null>(null)

    if (!open) return null


    return (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white w-[400px] h-[600px] border shadow-lg flex flex-col overflow-hidden">

                {/* HEADER */}
                <div className="flex justify-between items-center px-5 py-4 shadow-sm">
                    <h2 className="text-xl">
                        {view === "list"
                            ? "Elige una dirección"
                            : editingAddressId
                                ? "Editar dirección"
                                : "Nueva dirección"
                        }
                    </h2>
                    <button
                        type="button"
                        onClick={() => {
                            // const values = getValues()
                            const addressId = getValues("selectedAddressId")

                            reset({
                                selectedAddressId: addressId,
                            })

                            // reset({
                            //     ...values,
                            //     selectedAddressId: values.selectedAddressId, // 👈 se mantiene igual
                            // })
                            if (view === "form") {
                                reset()
                                setView("list")
                            } else {
                                reset()
                                onClose()
                            }
                        }}
                        className="text-gray-500 hover:text-black">
                        <X size={30} strokeWidth={1.2} />
                    </button>
                </div>

                {/* CONTENIDO */}
                {view === "list" ? (
                    <AddressList
                        addresses={addresses}
                        onAdd={() => setView("form")}
                        onSave={onClose}
                        onEdit={() => {
                            // setEditingAddress(address)
                            setView("form")
                        }}

                    />
                ) : (
                    <AddresForm
                        onBack={() => setView("list")}
                    />
                )}

            </div>
        </div>
    )
}