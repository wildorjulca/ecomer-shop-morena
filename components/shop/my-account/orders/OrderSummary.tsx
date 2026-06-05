import { OrderItem } from "@/src/interface/my-account"
import Image from "next/image"

interface Props {
    items: OrderItem[]
}

const OrderSummary = ({ items }: Props) => {

    const grouped = Object.values(
        items.reduce((acc, item) => {
            if (!acc[item.nombre]) {
                acc[item.nombre] = {
                    nombre: item.nombre,
                    cantidad: 0,
                    imagen: item.url_imagen
                }
            }

            acc[item.nombre].cantidad += item.cantidad
            return acc
        }, {} as Record<string, { nombre: string; cantidad: number; imagen: string }>)
    )

    return (
        <div className="flex items-center gap-3">

            {/* IMAGEN */}

            <div className="w-14 h-14 relative ">
                <Image
                    src={`/images/products/${grouped[0]?.imagen}`}
                    alt=""
                    fill
                    className="object-cover rounded-md border"
                />
            </div>


            {/* TEXTO */}
            <div className="flex flex-col text-sm">
                <p className="font-medium text-gray-800">
                    {grouped[0]?.nombre}
                </p>

                {grouped.length > 1 && (
                    <p className="text-xs text-gray-500">
                        +{grouped.length - 1} productos más
                    </p>
                )}

                <p className="text-xs text-gray-400">
                    {grouped.reduce((acc, p) => acc + p.cantidad, 0)} items
                </p>
            </div>

        </div>
    )
}

export default OrderSummary