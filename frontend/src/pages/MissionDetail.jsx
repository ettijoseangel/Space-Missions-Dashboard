import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Activity,
  FileText,
  Satellite,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Ban,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const MissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissionDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/missions/${id}`,
        );
        if (!response.ok)
          throw new Error("Expediente de misión no encontrado o clasificado.");

        const data = await response.json();
        setMission(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMissionDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-light dark:bg-space-dark">
        <p className="text-gray-600 dark:text-gray-400 font-mono animate-pulse flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-jpl-red border-t-transparent rounded-full animate-spin"></span>
          Desencriptando expediente de la misión...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-space-light dark:bg-space-dark">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center px-4">
          <p className="text-jpl-red font-mono font-bold mb-4">
            ERROR: {error}
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-mono text-gray-500 hover:text-jpl-red transition-colors underline underline-offset-4"
          >
            REGRESAR AL CENTRO DE CONTROL
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // Imagen por defecto si la base de datos no tiene una
  const imageUrl =
    mission.imagen_url ||
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

  const getStatusConfig = (estado) => {
    const est = estado?.toLowerCase() || "";
    switch (est) {
      case "activa":
        return {
          icon: Zap,
          color: "text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]",
        };
      case "en progreso":
        return {
          icon: Activity,
          color: "text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]",
        };
      case "completada":
        return {
          icon: CheckCircle2,
          color: "text-green-500 drop-shadow-[0_0_5px_rgba(34,197,94,0.4)]",
        };
      case "fallida":
        return {
          icon: AlertTriangle,
          color: "text-jpl-red drop-shadow-[0_0_8px_rgba(227,25,55,0.6)]",
        };
      case "cancelada":
        return { icon: Ban, color: "text-gray-400 dark:text-gray-500" };
      default:
        return { icon: Activity, color: "text-gray-400 dark:text-gray-500" };
    }
  };

  const statusConfig = getStatusConfig(mission.estado);
  const StatusIcon = statusConfig.icon;
  return (
    <div className="min-h-screen flex flex-col bg-space-light dark:bg-space-dark transition-colors duration-300">
      <Header />

      {/* pb-24 para que el Footer no tape el contenido */}
      <main className="flex-grow pt-8 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Navegación */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-jpl-red dark:hover:text-red-400 font-mono text-xs font-bold uppercase tracking-widest transition-all hover:underline hover:underline-offset-4 mb-8"
          >
            <ArrowLeft size={14} />
            Volver a Operaciones
          </button>

          {/* CABECERA DEL EXPEDIENTE */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-jpl-red dark:text-red-400 font-mono text-xs font-bold tracking-widest uppercase">
                <Satellite size={14} />
                <span>Expediente Operativo</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-gray-900 dark:text-white">
                {mission.nombre}
              </h1>
            </div>

            {/* INDICADOR DE ESTADO */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 shadow-sm">
                <StatusIcon size={16} className={statusConfig.color} />
                <span
                  className={`font-mono text-xs font-bold uppercase tracking-widest ${statusConfig.color}`}
                >
                  ESTADO: {mission.estado}
                </span>
              </div>
            </div>
          </div>

          {/* CUERPO DEL EXPEDIENTE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Columna Izquierda: Visuales y Telemetría */}
            <div className="lg:col-span-5 space-y-4">
              {/* Contenedor de Imagen con estilo "Targeting Bracket" de ingeniería */}
              <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 relative group p-1.5">
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={mission.nombre}
                    className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                </div>
                {/* Esquinas de mira (Crosshairs) - CSS puro */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-jpl-red z-10"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-jpl-red z-10"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-jpl-red z-10"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-jpl-red z-10"></div>
              </div>

              {/* Grid de Estadísticas (3 cajas cuadradas minimalistas) */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 p-4 flex flex-col items-center justify-center text-center">
                  <MapPin size={16} className="text-gray-400 mb-2" />
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                    Destino
                  </span>
                  <span className="text-xs md:text-sm font-bold text-gray-900 dark:text-white truncate w-full">
                    {mission.destino}
                  </span>
                </div>
                <div className="bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 p-4 flex flex-col items-center justify-center text-center">
                  <Calendar size={16} className="text-gray-400 mb-2" />
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                    Lanzamiento
                  </span>
                  <span className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                    {mission.fecha_lanzamiento
                      ? mission.fecha_lanzamiento.split("T")[0]
                      : "TBD"}
                  </span>
                </div>
                <div className="bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 p-4 flex flex-col items-center justify-center text-center">
                  <Users size={16} className="text-gray-400 mb-2" />
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                    Humanos
                  </span>
                  <span className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">
                    {mission.tripulacion}
                  </span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Reporte de texto */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 p-6 md:p-10 h-full shadow-sm">
                <h3 className="flex items-center gap-2 font-mono text-sm text-gray-900 dark:text-white font-bold uppercase tracking-widest border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
                  <FileText
                    size={16}
                    className="text-jpl-red dark:text-red-400"
                  />
                  Reporte Desclasificado
                </h3>

                <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base font-sans">
                  {mission.descripcion ? (
                    <p>{mission.descripcion}</p>
                  ) : (
                    <p className="font-mono text-gray-500 dark:text-gray-400 italic">
                      [ACCESO RESTRINGIDO] <br />
                      <br />
                      Los detalles precisos de esta misión aún no han sido
                      desclasificados por el alto mando de la AEZ. Por favor,
                      consulte con el administrador del sistema para obtener
                      credenciales de acceso de Nivel 4.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
