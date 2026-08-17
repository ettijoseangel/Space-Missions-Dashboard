import { Header } from "../components/Header";
import { MissionCard } from "../components/MissionCard";
import { useMissions } from "../hooks/useMissions";
import { TelemetryPanel } from "../components/TelemetryPanel";

export const Dashboard = () => {
  // Desestructuracion del return del Hook
  const { missions, loading, error, pagination } = useMissions();

  return (
    <div className="min-h-screen bg-space-light dark:bg-space-dark transition-colors duration-300">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado institucional */}
        <div className="mb-8 border-l-4 border-jpl-red pl-4 transition-colors duration-300">
          <h2 className="text-3xl font-sans font-bold text-gray-900 dark:text-white transition-colors duration-300 uppercase tracking-widest">
            Centro de Control
          </h2>
          {/* Tipografía monoespaciada para los subtítulos técnicos */}
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-mono text-xs md:text-sm transition-colors duration-300 uppercase tracking-wider">
            Telemetría y seguimiento de misiones activas e históricas
          </p>
        </div>

        {loading && (
          <p className="text-gray-600 dark:text-white font-mono animate-pulse">
            Estableciendo conexión con la base de datos...
          </p>
        )}

        {error && (
          <p className="text-jpl-red font-mono font-bold">
            [ERROR DE COMUNICACIÓN]: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {/* Panel de metricas */}
            <TelemetryPanel missions={missions} pagination={pagination} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missions.map((mission) => (
                <MissionCard key={mission._id} mission={mission} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};
