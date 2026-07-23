'use server'

import { getDashboardSummary, getRecentOrders} from "./dashboard.actions";





export const getAllDashboardStats = async () => {
    try {
        const [recentOrders, dashboardSumary] = await Promise.all([
            getRecentOrders(),
            getDashboardSummary(),
            // getordersReceivedToday(),
            // getProductsOutOfStock()
        ])

        return {
            recentOrders,
            dashboardSumary,
            // ordersReceivedToday,
            // productsOutOfStock
        }

    } catch (error) {
        console.error("Error fetching dashboard-status:", error);
        throw new Error("Failed to fetch dashboard-status");
    }
}