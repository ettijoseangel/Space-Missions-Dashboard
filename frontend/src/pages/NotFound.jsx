import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0"></div>

      <div className="z-10 flex flex-col items-center space-y-6">
        {/* El número de error grande y parpadeante */}
        <h1 className="text-8xl md:text-[150px] font-black text-jpl-red tracking-tighter opacity-80 animate-pulse drop-shadow-[0_0_25px_rgba(227,25,55,0.6)]">
          404
        </h1>

        <h2 className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-widest">
          ¡Houston, tenemos un problema!
        </h2>

        <p className="text-gray-400 font-mono text-sm md:text-base max-w-lg mt-4 border-l-2 border-jpl-red pl-4 text-left">
          El sector espacial o el planeta que intentas visitar no existe en
          nuestros mapas estelares. Es posible que la señal se haya perdido en
          el vacío.
        </p>

        <Link
          to="/dashboard"
          className="mt-12 bg-transparent hover:bg-jpl-red/10 text-jpl-red font-mono text-sm uppercase tracking-widest px-8 py-4 border border-jpl-red/50 hover:border-jpl-red rounded transition-all shadow-[0_0_15px_rgba(227,25,55,0.2)] hover:shadow-[0_0_25px_rgba(227,25,55,0.5)] flex items-center gap-3 group"
        >
          <span className="text-xl transition-transform group-hover:-translate-x-2">
            ←
          </span>
          Regresar a la Base
        </Link>
      </div>
    </div>
  );
};
