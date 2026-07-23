import { getProductosStats } from "@/actions/admin";
import ProductosHeader from "@/components/dashboard/productos/ProductosHeader";
import ProductosStats from "@/components/dashboard/productos/ProductosStats";
import ProductosTable from "@/components/dashboard/productos/ProductosTable";

export default async function ProductosPage() {
  const stats = await getProductosStats();

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] w-full mx-auto">
      <ProductosHeader />
      <ProductosStats stats={stats} />
      <ProductosTable />
    </div>
  );
}