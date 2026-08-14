import { Header } from "../components/Header";
import { MissionCard } from "../components/MissionCard";
import { useMissions } from "../hooks/useMissions";

export const Dashboard = () => {
  // Desestructuracion del return del Hook
  const { missions, loading, error } = useMissions();

  return (
    /* Contenedor principal */
    <div className="min-h-screen">
      <Header />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Titulo de la seccion */}
        <div className="mb-8 border-l-4 border-gray-400 dark:border-cosmic-marina pl-4 transition-colors duration-300">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
            Panel de Control
          </h2>
          <p className="text-gray-600 dark:text-cosmic-bluing mt-2 transition-colors duration-300">
            Exploración y seguimiento de misiones activas e históricas.
          </p>
        </div>

        {/* GRID con las Mission Cards */}
        {/* Lógica de renderizado condicional súper legible */}
        {loading && (
          <p className="text-gray-600 dark:text-white">
            Conectando con la base de control...
          </p>
        )}

        {error && (
          <p className="text-red-500">Error de comunicación: {error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
