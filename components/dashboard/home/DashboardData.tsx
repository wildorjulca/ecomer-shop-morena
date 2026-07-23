// app/dashboard/components/DashboardData.tsx
import { getAllDashboardStats } from '@/actions/admin';
import DashboardClient from './DashboardClient';
import { DashboardError } from './DashboardError';

export async function DashboardData() {
    // Llamar a la Server Action para obtener todos los datos
    const stats = await getAllDashboardStats();
    console.log(stats.recentOrders)

    return (
        <div>
            <DashboardClient
                recentOrders={stats.recentOrders}
                dashboardSumary={stats.dashboardSumary}
            />
        </div>


    );

}