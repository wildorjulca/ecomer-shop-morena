import OrdersTable from '@/components/dashboard/orders/OrdersTable'

const OrdersPage = () => {
    return (
        <div className="flex flex-col gap-6 max-w-[1400px] w-full mx-auto">
            {/* <ProductosHeader />
            <ProductosStats stats={stats} /> */}
            <OrdersTable />
        </div>
    )
}

export default OrdersPage