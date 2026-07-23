import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
} from "lucide-react";

type Props = {
  dashboardSumary: {
        userActive: number;
        productsOutOfStock: number;
        ordersReceivedToday: number,


    }
};

export default function StatsCards({ dashboardSumary }: Props) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

      {/* Ingresos */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Ingresos del mes
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
              S/ 0
            </h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
            <DollarSign className="h-6 w-6 text-violet-700" />
          </div>
        </div>
      </div>

      {/* Órdenes */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Órdenes nuevas
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
              {dashboardSumary.ordersReceivedToday.toLocaleString()}
            </h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <ShoppingCart className="h-6 w-6 text-blue-700" />
          </div>
        </div>
      </div>

      {/* Clientes */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Clientes activos
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
              {dashboardSumary.userActive.toLocaleString()}
            </h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
            <Users className="h-6 w-6 text-emerald-700" />
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Productos en stock
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
              {dashboardSumary.productsOutOfStock.toLocaleString()}
            </h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
            <Package className="h-6 w-6 text-amber-600" />
          </div>
        </div>
      </div>

    </div>
  );
}