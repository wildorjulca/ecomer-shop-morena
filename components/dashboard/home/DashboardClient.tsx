'use client'

import { type RecentOrders as RecentOrder } from '@/src/interface/admin'
import React from 'react'
import StatsCards from './StatsCards'
import SalesChart from './SalesChart'
import QuickActions from './QuickActions'
import RecentOrders from './RecentOrders'
import TopProducts from './TopProducts'
import StockAlerts from './StockAlerts'


type Props = {
    recentOrders: RecentOrder[],
    dashboardSumary: {
        userActive: number;
        productsOutOfStock: number;
        ordersReceivedToday: number,


    }
}


const DashboardClient = ({ recentOrders, dashboardSumary, }: Props) => {
    return (
        <div className='flex flex-col gap-6'>

            <StatsCards
                dashboardSumary={dashboardSumary}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SalesChart />
                </div>
                <QuickActions />
            </div>

            <RecentOrders
                recentOrders={recentOrders}
            />

            {/* Top products + Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopProducts />
                <StockAlerts />
            </div>
        </div>
    )
}

export default DashboardClient