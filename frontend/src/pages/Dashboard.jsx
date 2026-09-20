import { Header } from "../components/Header";
import { MissionCard } from "../components/MissionCard";
import { useMissions } from "../hooks/useMissions";
import { TelemetryPanel } from "../components/TelemetryPanel";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MissionModal from "../components/MissionModal";
import { Footer } from "../components/Footer";
import { MissionChart } from "../components/MissionChart";
import { Filter, ChevronDown } from "lucide-react";

export const Dashboard = () => {
  // Usuario extraido y creacion del estado del modal
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const opcionesFiltro = [
    "Todas",
    "Activa",
    "En Progreso",
    "Completada",
    "Fallida",
    "Cancelada",
  ];

  // Desestructuracion del return del Hook
  const {
    missions,
    loading,
    error,
    pagination,
    setMissions,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
  } = useMissions();

  const [missionToEdit, setMissionToEdit] = useState(null);

  const handledMissionAdded = () => {
    window.location.reload();
  };

  const handleEditMission = (mission) => {
    setMissionToEdit(mission);
    setIsModalOpen(true);
  };

  const handleDeleteMission = async (id) => {
    const confirmDelete = window.confirm(
      "ALERTA DE SISTEMA: ¿Estás seguro de que deseas purgar esta misión? Esta acción es irreversible.",
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/missions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        // Si el backend la borra exitosamente, la quitamos de la pantalla
        setMissions((prevMissions) =>
          prevMissions.filter((mission) => mission._id !== id),
        );
      } else {
        const data = await response.json();
        alert(`Error de consola: ${data.message}`);
      }
    } catch (error) {
      console.error("Fallo de comunicación con la base de datos:", error);
      alert("Error de conexión con la Red de Espacio Profundo.");
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-space-light dark:bg-space-dark transition-colors duration-300">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado institucional tipo Terminal */}

        <div className="relative mb-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="absolute inset-0 z-0 bg-space-dark">
            <img
              /* Imagen de Marte de alta calidad como placeholder */
              src="https://i.extremetech.com/imagery/content-types/04dWkFu8PCcaW7y6Rc8HvNj/hero-image.fit_lim.v1678673196.jpg"
              alt="Superficie Planetaria"
              fetchpriority="high"
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
              <span className="text-jpl-red dark:text-red-400">DASHBOARD</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-gray-900 dark:text-white transition-colors duration-300 uppercase tracking-tight">
                Centro de Control
              </h2>

              {/* EL BOTÓN DE AUTORIZACIÓN */}
              {user?.role === "admin" && (
                <button
                  onClick={() => {
                    setMissionToEdit(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-jpl-red dark:bg-red-400 hover:bg-red-700 dark:hover:bg-red-700 text-white font-mono text-xs md:text-sm uppercase tracking-widest px-6 py-3 rounded transition-all shadow-[0_0_15px_rgba(227,0,15,0.4)] hover:shadow-[0_0_25px_rgba(227,0,15,0.6)] border border-red-500/50 flex items-center gap-2"
                >
                  <span className="text-lg font-light leading-none">+</span>{" "}
                  Autorizar Misión
                </button>
              )}
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
          <p className="text-jpl-red dark:text-red-400 font-mono font-bold">
            [ERROR DE COMUNICACIÓN]: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {/* Panel de metricas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="h-full">
                <TelemetryPanel missions={missions} pagination={pagination} />
              </div>

              <div className=" h-full">
                <MissionChart missions={missions} />
              </div>
            </div>

            {/* Seccion de MISIONES */}
            <div className="mt-16 mb-6">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                <span className="w-2 h-6 bg-jpl-red rounded-sm"></span>
                Registro de Operaciones
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-5 font-mono uppercase tracking-widest">
                Base de datos de la flota espacial
              </p>
            </div>

            {/* CONTROLES DE FILTRADO PERSONALIZADO */}
            <div className="mb-6 flex justify-end">
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-3 bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-lg shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition-all focus:outline-none focus:ring-1 focus:ring-jpl-red"
                >
                  <Filter size={16} className="text-gray-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider text-xs">
                    Estado:
                  </span>
                  <span className="font-mono text-sm font-bold text-jpl-red dark:text-red-400 min-w-[100px] text-left">
                    {statusFilter}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden py-1">
                    {opcionesFiltro.map((opcion) => (
                      <button
                        key={opcion}
                        onClick={() => {
                          setStatusFilter(opcion);
                          setPage(1); // Reseteamos la paginación
                          setIsFilterOpen(false); // Cerramos el menú
                        }}
                        className={`w-full text-left px-4 py-2.5 font-mono text-sm transition-colors ${
                          statusFilter === opcion
                            ? "text-jpl-red dark:text-red-400 font-bold bg-gray-50 dark:bg-gray-800/80"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {opcion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center min-h-[600px]">
                <p className="text-gray-600 dark:text-gray-400 font-mono animate-pulse flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-jpl-red border-t-transparent rounded-full animate-spin"></span>
                  Rastreando señales en el espacio profundo...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {missions.map((mission) => (
                  <MissionCard
                    key={mission._id}
                    mission={mission}
                    onDelete={handleDeleteMission}
                    onEdit={handleEditMission}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            )}

            {/* CONTROLES DE PAGINACION */}
            {pagination && pagination.pages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  &lt; Anterior
                </button>

                <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                  Página <span className="text-jpl-red dark:text-red-400 font-bold">{page}</span>{" "}
                  de {pagination.pages}
                </span>

                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, pagination.pages))
                  }
                  disabled={page === pagination.pages}
                  className="px-4 py-2 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente &gt;
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Renderizado del Modal  */}
      <MissionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setMissionToEdit(null);
        }}
        missionToEdit={missionToEdit}
        onMissionAdded={handledMissionAdded}
      />
      <Footer />
    </div>
  );
};
