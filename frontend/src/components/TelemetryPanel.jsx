import { CalendarClock } from "lucide-react";

export const TelemetryPanel = ({ missions, pagination }) => {
  const misionesActivas = missions.filter(
    (m) => m.estado === "En Progreso",
  ).length;
  const tripulantes = missions.reduce(
    (acc, m) => acc + (Number(m.tripulacion) || 0),
    0,
  );
  const totalMisiones = pagination?.total || missions.length;

  const ahora = new Date();
  const proximasMisiones = [...missions]
    .filter((m) => new Date(m.fecha_lanzamiento) >= ahora)
    .sort(
      (a, b) => new Date(a.fecha_lanzamiento) - new Date(b.fecha_lanzamiento),
    );

  const misionDestacada =
    proximasMisiones.length > 0
      ? proximasMisiones[0]
      : [...missions].sort(
          (a, b) =>
            new Date(b.fecha_lanzamiento) - new Date(a.fecha_lanzamiento),
        )[0];
  const nombreMision = misionDestacada
    ? misionDestacada.nombre
    : "Sin misiones";

  return (
    <div className="h-full flex flex-col justify-center py-4">
      <div className="grid grid-cols-2 gap-y-12 gap-x-8">
        {/* Metrica 1: Total de misiones */}
        <div className="flex flex-col">
          <span className="text-jpl-red dark:text-red-400 text-sm md:text-base font-medium uppercase tracking-wide">
            Misiones
          </span>
          <span className="text-gray-900 dark:text-gray-100 text-base md:text-lg mt-1 mb-2">
            Registro Histórico
          </span>
          <span className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-gray-900 dark:text-white mt-auto transition-colors duration-300">
            {totalMisiones}
          </span>
        </div>

        {/* Metrica 2: Misiones Activas */}
        <div className="flex flex-col">
          <span className="text-jpl-red dark:text-red-400 text-sm md:text-base font-medium uppercase tracking-wide">
            Estado
          </span>
          <span className="text-gray-900 dark:text-gray-100 text-base md:text-lg mt-1 mb-2">
            En Progreso
          </span>
          <span className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-gray-900 dark:text-white mt-auto transition-colors duration-300">
            {misionesActivas}
          </span>
        </div>

        {/* Metrica 3: Tripulacion */}
        <div className="flex flex-col">
          <span className="text-jpl-red dark:text-red-400 text-sm md:text-base font-medium uppercase tracking-wide">
            Humanos
          </span>
          <span className="text-gray-900 dark:text-gray-100 text-base md:text-lg mt-1 mb-2">
            En el Espacio
          </span>
          <span className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-gray-900 dark:text-white mt-auto transition-colors duration-300">
            {tripulantes}
          </span>
        </div>

        {/* Metrica 4: Proxima mision */}
        <div className="flex flex-col">
          <span className="text-jpl-red dark:text-red-400 text-sm md:text-base font-medium uppercase tracking-wide">
            Cronograma Espacial
          </span>
          <span className="text-gray-900 dark:text-gray-100 text-base md:text-lg mt-1 mb-2">
            Próxima Misión
          </span>
          <div className="flex items-center gap-3 mt-auto">
            <CalendarClock size={25} className="text-jpl-red dark:text-red-400" strokeWidth={3} />
            <span
              className="text-xl md:text-2xl font-display font-extrabold tracking-tight text-jpl-red dark:text-red-400 mt-auto transition-colors duration-300 truncate max-w-[150px] md:max-w-[200px] leading-none"
              title={nombreMision}
            >
              {nombreMision}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
