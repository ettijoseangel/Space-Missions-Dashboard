import { Header } from "../components/Header";


export const Dashboard = () => {
  return (
    /* Contenedor principal */
    <div className="min-h-screen">
      
      <Header />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Titulo de la seccion */}
        <div className="mb-8 border-l-4 border-cosmic-marina pl-4">
          <h2 className="text-3xl font-semibold text-white">
            Panel de Control
          </h2>
          <p className="text-cosmic-bluing mt-2">
            Exploración y seguimiento de misiones activas e históricas.
          </p>
        </div>

        {/* GRID con las Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-dashed border-cosmic-bluing p-6 rounded-lg text-center text-cosmic-bluing">
            Texto espacial de relleno
          </div>
        </div>

      </main>
    </div>
  );
};
