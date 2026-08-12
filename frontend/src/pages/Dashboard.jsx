import { Header } from "../components/Header";
import { MissionCard } from "../components/MissionCard";

// Datos de prueba
const mockMissions = [
  {
    id: 1,
    name: "Artemis II",
    status: "En Progreso",
    description:
      "Misión tripulada que orbitará la Luna para probar los sistemas de soporte vital de la nave Orion.",
    date: "Noviembre 2024",
    destination: "Órbita Lunar",
    crew: 4,
  },
  {
    id: 2,
    name: "Apolo 11",
    status: "Exitoso",
    description:
      "Primera misión tripulada en aterrizar en la Luna. Un pequeño paso para el hombre...",
    date: "Julio 1969",
    destination: "Mar de la Tranquilidad",
    crew: 3,
  },
  {
    id: 3,
    name: "Mars Polar Lander",
    status: "Fallido",
    description:
      "Misión robótica para estudiar el clima marciano que perdió contacto durante el descenso.",
    date: "Diciembre 1999",
    destination: "Polo Sur Marciano",
    crew: 0,
  },
];

export const Dashboard = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-dashed border-gray-400 dark:border-cosmic-bluing p-6 rounded-lg text-center text-gray-600 dark:text-cosmic-bluing">
            {mockMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
