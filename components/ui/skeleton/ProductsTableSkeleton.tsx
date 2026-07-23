export function ProductsTableSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-14 border-b px-4 flex items-center"
          >
            <div className="h-4 w-full rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}