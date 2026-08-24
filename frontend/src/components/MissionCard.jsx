import { Zap, Activity, CheckCircle2, AlertTriangle, Ban } from "lucide-react";

export const MissionCard = ({ mission }) => {
  // Funcion para determinar el color del indicador
  const getStatusConfig = (estado) => {
    const est = estado?.toLowerCase() || "";
    switch (est) {
      case "activa":
        // Azul brillante
        return {
          icon: Zap,
          color: "text-blue-400 bg-blue-900/30 border-blue-500/50",
        };

      case "en progreso":
        // Ambar / Amarillo
        return {
          icon: Activity,
          color: "text-yellow-400 bg-yellow-900/30 border-yellow-500/50",
        };

      case "completada":
        // Verde
        return {
          icon: CheckCircle2,
          color: "text-green-400 bg-green-900/30 border-green-500/50",
        };

      case "fallida":
        // Rojo intenso
        return {
          icon: AlertTriangle,
          color: "text-jpl-red bg-red-900/30 border-red-500/50 animate-pulse",
        };

      case "cancelada":
        // Gris opaco
        return {
          icon: Ban,
          color: "text-gray-400 bg-gray-800 border-gray-600",
        };
      default:
        return {
          icon: Activity,
          color: "text-gray-400 bg-gray-800 border-gray-600",
        };
    }
  };

  const statusConfig = getStatusConfig(mission.estado);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 p-6 flex flex-col h-full group hover:border-jpl-red transition-colors duration-300">
      {/* 1. Encabezado: Título, Agencia y Estado */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white group-hover:text-jpl-red transition-colors duration-300">
            {mission.nombre}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1 uppercase tracking-wide">
            {mission.agencia}
          </p>
        </div>

        {/* Indicador de Estado */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-space-dark px-3 py-1.5 border border-gray-200 dark:border-gray-700">
          <StatusIcon
            size={14}
            strokeWidth={2.5}
            className={statusConfig.color}
          />
          <span className="text-xs font-mono text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            {mission.estado}
          </span>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mb-5" />

      {/* 2. Cuadrícula de Datos Técnicos con Íconos */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-bold text-jpl-red uppercase tracking-widest mb-1">
            {/* Ícono de Destino (Planeta) */}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Destino
          </span>
          <span className="block text-sm text-gray-900 dark:text-gray-100 font-medium">
            {mission.destino}
          </span>
        </div>

        <div>
          <span className="flex items-center gap-1.5 text-xs font-bold text-jpl-red uppercase tracking-widest mb-1">
            {/* Ícono de Lanzamiento (Calendario) */}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Lanzamiento
          </span>
          <span className="block text-sm font-mono text-gray-900 dark:text-gray-100">
            {mission.fecha_lanzamiento}
          </span>
        </div>

        <div>
          <span className="flex items-center gap-1.5 text-xs font-bold text-jpl-red uppercase tracking-widest mb-1">
            {/* Ícono de Tripulación (Usuarios) */}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
            Tripulación
          </span>
          <span className="block text-sm font-display font-bold text-gray-900 dark:text-gray-100">
            {Number(mission.tripulacion) === 0
              ? "NO TRIPULADA"
              : `${mission.tripulacion} ASTRONAUTAS`}
          </span>
        </div>
      </div>

      {/* 3. Descripción (mt-auto empuja este bloque al fondo para alinear todas las tarjetas) */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700/50">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {mission.descripcion ||
            "Información detallada de la telemetría y objetivos de la misión no disponible por el momento."}
        </p>
      </div>
    </div>
  );
};
