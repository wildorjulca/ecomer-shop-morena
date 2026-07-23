
import StatsCards from "@/components/dashboard/home/StatsCards";
import RecentOrders from "@/components/dashboard/home/RecentOrders";
import TopProducts from "@/components/dashboard/home/TopProducts";
import SalesChart from "@/components/dashboard/home/SalesChart";
import StockAlerts from "@/components/dashboard/home/StockAlerts";
import QuickActions from "@/components/dashboard/home/QuickActions";

// export default function DashboardPage() {
//   const fecha = new Date().toLocaleDateString("es-PE", {
//     weekday: "long", day: "numeric", month: "long", year: "numeric",
//   });

//   return (
//     <div className="flex flex-col gap-6 max-w-[1400px] w-full mx-auto">

//       {/* Page heading */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Bienvenido 👋</h1>
//         <p className="text-sm text-gray-400 mt-1 capitalize">{fecha}</p>
//       </div>

//       {/* Stats */}
//       <StatsCards />

//       {/* Chart + Quick actions */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <SalesChart />
//         </div>
//         <QuickActions />
//       </div>

//       {/* Orders full width */}
//       <RecentOrders />

//       {/* Top products + Stock */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <TopProducts />
//         <StockAlerts />
//       </div>

//     </div>
//   );
// }


// app/dashboard/page.tsx
import { Suspense } from 'react';
import { DashboardData } from "@/components/dashboard/home/DashboardData";
// import { DashboardSkeleton } from './components/DashboardSkeleton';
// import { DashboardData } from './components/DashboardData';

// Opcional: Revalidar cada 5 minutos
export const revalidate = 300;

// Metadata
export const metadata = {
  title: 'Dashboard Administrativo',
  description: 'Panel de control con estadísticas y métricas de la tienda',

};

export default function DashboardPage() {
  return (
    <div className="max-w-[1400px] w-full mx-auto">
         <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenido 👋</h1>
        {/* <p className="text-sm text-gray-400 mt-1 capitalize">{fecha}</p> */}

      <Suspense fallback={<p>Loading</p>}>
        <DashboardData />
      </Suspense>
    </div>

  );
}