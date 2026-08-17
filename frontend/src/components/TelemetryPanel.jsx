export const TelemetryPanel = ({ missions, pagination }) => {
  const misionesActivas = missions.filter(
    (m) => m.estado === "En Progreso",
  ).length;
  const tripulantes = missions.reduce(
    (acc, m) => acc + (Number(m.tripulacion) || 0),
    0,
  );
  const totalMisiones = pagination?.total || missions.length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-gray-300 pb-8 transition-colors duration-300">
      {/* Metrica 1: Total de misiones */}
      <div className="flex flex-col">
        <span className="text-jpl-red text-sm md:text-base font-medium uppercase tracking-wide">
          Misiones
        </span>
        <span className="text-gray-900 dark:text-gray-100 text-base md:text-lg mt-1 mb-2">
          Registro Histórico
        </span>
        <span className="text-6xl md:text-7xl font-display font-extrabold tracking-tight text-gray-900 dark:text-white mt-auto transition-colors duration-300">
          {totalMisiones}
        </span>
      </div>

      {/* Metrica 2: Misiones Activas */}
      <div className="flex flex-col">
        <span className="text-jpl-red text-sm md:text-base font-medium uppercase tracking-wide">
          Estado
        </span>
        <span className="text-gray-900 dark:text-gray-100 text-base md:text-lg mt-1 mb-2">
          Actualmente Activas
        </span>
        <span className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-gray-900 dark:text-white mt-2 transition-colors duration-300">
          {misionesActivas}
        </span>
      </div>

      {/* Metrica 3: Tripulacion */}
      <div className="flex flex-col">
        <span className="text-jpl-red text-sm md:text-base font-medium uppercase tracking-wide">
          Humanos
        </span>
        <span className="text-gray-900 dark:text-gray-100 text-base md:text-lg mt-1 mb-2">
          En el Espacio
        </span>
        <span className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-gray-900 dark:text-white mt-2 transition-colors duration-300">
          {tripulantes}
        </span>
      </div>

      {/* Metrica 4: Estado del Sistema */}
      <div className="flex flex-col">
        <span className="text-jpl-red text-sm md:text-base font-medium uppercase tracking-wide">
          Red Espacial
        </span>
        <span className="text-gray-900 dark:text-gray-100 text-base md:text-lg mt-1 mb-2">
          Deep Space Network
        </span>
        <div className="flex items-center gap-3 mt-auto">
          {/* El indicador LED animado */}
          <span className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
          <span className="text-3xl md:text-4xl font-display font-bold text-green-500 tracking-light">
            Nominal
          </span>
        </div>
      </div>
    </div>
  );
};
