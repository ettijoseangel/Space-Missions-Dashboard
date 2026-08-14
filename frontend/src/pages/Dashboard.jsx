import { Header } from "../components/Header";
import { MissionCard } from "../components/MissionCard";
import { useState, useEffect } from "react";

export const Dashboard = () => {
  // Estado para guardar las misiones que lleguen desde el backend
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efecto que se ejecuta al cargar la pagina
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        // Peticion
        const response = await fetch("http://localhost:5000/api/missions");
        const data = await response.json();

        setMissions(data);
        setLoading(false);
      } catch (error) {
        console.log("Error conectando con el backend:", error);
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

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
        {/* Mostrando texto de carga */}
        {loading ? (
          <p className="text-white">Conectando con la base de datos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-dashed border-gray-400 dark:border-cosmic-bluing p-6 rounded-lg text-center text-gray-600 dark:text-cosmic-bluing">
              {missions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
