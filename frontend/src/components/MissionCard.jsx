import {
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

export const MissionCard = ({ mission }) => {
  // Diccionario para los estados de la misión
  const statusConfig = {
    Exitoso: {
      color: "text-emerald-400",
      border: "border-emerald-400/30",
      icon: CheckCircle,
    },
    "En Progreso": {
      color: "text-cosmic-adobe",
      border: "border-cosmic-adobe/30",
      icon: Clock,
    },
    Fallido: {
      color: "text-cosmic-rose",
      border: "border-cosmic-rose/30",
      icon: AlertTriangle,
    },
  };

  // Extraemos la configuracion basada en el estado actual de la mision
  const StatusIcon = statusConfig[mission.status]?.icon || Clock;
  const statusColor =
    statusConfig[mission.status]?.color || "text-cosmic-bluing";
  const statusBorder =
    statusConfig[mission.status]?.border || "border-cosmic-bluing";

  return (
    <div className="relative p-6 rounded-xl bg-cosmic-surf/10 border border-cosmic-bluing/30 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-cosmic-marina/20 transition-all duration-300 group">
      {/* Encabezado: Titulo y Badge de Estado */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-cosmic-marina transition-colors">
          {mission.name}
        </h3>
        <span
          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${statusBorder} ${statusColor} bg-cosmic-void/50`}
        >
          <StatusIcon className="w-3 h-3" />
          {mission.status}
        </span>
      </div>

      {/* Descripcion de la mision */}
      <p className="text-sm text-cosmic-text/80 mb-6 line-clamp-2">
        {mission.description}
      </p>

      {/* Lista de metadatos con iconos */}
      <div className="space-y-3 text-sm text-cosmic-bluing">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cosmic-marina" />
          <span>{mission.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cosmic-marina" />
          <span>{mission.destination}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-cosmic-marina" />
          <span>{mission.crew} Tripulantes</span>
        </div>
      </div>
    </div>
  );
};
