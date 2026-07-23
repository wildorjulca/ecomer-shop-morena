// app/dashboard/components/DashboardError.tsx
'use client';

interface DashboardErrorProps {
  error: unknown;
}

export function DashboardError({ error }: DashboardErrorProps) {
  const mensaje = error instanceof Error 
    ? error.message 
    : 'No se pudieron cargar las estadísticas';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar el dashboard</h2>
        <p className="text-gray-600 mb-4">{mensaje}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#6A148E] hover:bg-[#54106f] text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}