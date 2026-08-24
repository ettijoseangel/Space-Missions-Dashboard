import { Target } from 'lucide-react';

export const TelemetryPanel = ({ missions, pagination }) => {
  const misionesActivas = missions.filter(
    (m) => m.estado === "En Progreso",
  ).length;
  const tripulantes = missions.reduce(
    (acc, m) => acc + (Number(m.tripulacion) || 0),
    0,
  );
  const totalMisiones = pagination?.total || missions.length;

  const misionesCompletadas = missions.filter(
    (m) => m.estado?.toLowerCase() === "completada",
  ).length;
  const tasaExito =
    missions.length > 0
      ? Math.round((misionesCompletadas / missions.length) * 100)
      : 0;
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

      {/* Metrica 4: Tasa de Exito */}
      <div className="flex flex-col">
        <span className="text-jpl-red text-sm md:text-base font-medium uppercase tracking-wide">
          Rendimiento Global
        </span>
        <span className="text-gray-900 dark:text-gray-100 text-base md:text-lg mt-1 mb-2">
          Tasa de Éxito
        </span>
        <div className="flex items-center gap-3 mt-auto">
          <Target size={28} className="text-blue-500" strokeWidth={2} />
          <span className="text-5xl md:text-6xl font-display font-bold text-blue-500 tracking-light">
            {tasaExito}%
          </span>
        </div>
      </div>
    </div>
  );
};
