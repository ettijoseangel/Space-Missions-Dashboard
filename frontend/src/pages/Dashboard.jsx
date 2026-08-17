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
        {/* Encabezado institucional tipo Terminal */}

        <div className="relative mb-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="absolute inset-0 z-0 bg-space-dark">
            <img
              /* Imagen de Marte de alta calidad como placeholder */
              src="https://i.extremetech.com/imagery/content-types/04dWkFu8PCcaW7y6Rc8HvNj/hero-image.fit_lim.v1678673196.jpg"
              alt="Superficie Planetaria"
              className="w-full h-full object-cover object-right opacity-50 dark:opacity-40 mix-blend-luminosity"
            />
            {/* El gradiente mágico: Sólido a la izquierda, transparente a la derecha */}
            <div className="absolute inset-0 bg-gradient-to-r from-space-light via-space-light/95 dark:from-space-dark dark:via-space-dark/95 to-transparent dark:to-space-dark/20"></div>
          </div>

          {/* Contenido de texto elevado con z-10 para que quede encima */}
          <div className="relative z-10 p-6 md:p-10 border-l-4 border-jpl-red">
            {/* Breadcrumbs / Ruta del Sistema */}
            <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
              <span>SYS_ROOT</span>
              <span className="text-gray-400">/</span>
              <span>MODULOS</span>
              <span className="text-gray-400">/</span>
              <span className="text-jpl-red">DASHBOARD</span>
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-gray-900 dark:text-white transition-colors duration-300 uppercase tracking-tight">
                Centro de Control
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mt-4 font-mono text-xs md:text-sm transition-colors duration-300 uppercase tracking-wider flex items-center gap-2 max-w-2xl">
              <span className="text-jpl-red font-bold">{">"}</span>
              Telemetría y seguimiento de misiones activas e históricas
              <span className="w-2 h-4 bg-gray-400 dark:bg-gray-500 animate-[pulse_1s_step-end_infinite]"></span>
            </p>
          </div>
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
