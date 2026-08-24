import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Rocket, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";

export const Header = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  // Estado para el reloj
  const [time, setTime] = useState(new Date());

  // Actualiza el reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatea la hora para extraer solo el fragmento HH:MM:SS en formato UTC
  const utcTime = time.toUTCString().split(" ")[4] + " UTC";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-space-dark/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LADO IZQUIERDO: Branding */}
        <div className="flex items-center gap-3">
          <Rocket className="w-8 h-8" />
          <span className="text-jpl-red font-display font-black text-2xl tracking-tight uppercase">
            AEZ
          </span>
          {/* Ocultamos el texto largo en móviles para evitar que se rompa el diseño */}
          <span className="hidden sm:inline-block text-gray-900 dark:text-white font-mono text-sm tracking-widest uppercase border-l border-gray-300 dark:border-gray-700 pl-3">
            Centro de Datos Espaciales
          </span>
        </div>

        {/* Lado Derecho: Controles y Telemetría del Operador */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Reloj Sistema (Oculto en móviles muy pequeños) */}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] text-jpl-red font-bold tracking-widest uppercase">
              Tiempo del Sistema
            </span>
            <span className="text-sm font-mono text-gray-900 dark:text-gray-100">
              {utcTime}
            </span>
          </div>

          {/* Divisor Vertical */}
          <div className="hidden sm:block h-8 w-px bg-gray-300 dark:bg-gray-700"></div>

          {/* Controles de Sesion */}
          <div className="flex items-center gap-4">
            {user?.role === "admin" ? (
              <>
                {/* Insignia sobria de un solo renglón */}
                <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded">
                  Admin
                </span>
                {/* Botón salir como texto simple para no saturar visualmente */}
                <button 
                  onClick={logout}
                  className="text-[11px] font-mono uppercase tracking-widest text-gray-400 hover:text-jpl-red transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="text-[11px] font-mono uppercase tracking-widest text-jpl-red hover:text-red-700 dark:hover:text-red-400 transition-colors"
              >
                Acceso Admin
              </button>
            )}
          </div>

          {/* Divisor Vertical Elegante */}
          <div className="hidden sm:block h-8 w-px bg-gray-200 dark:bg-gray-800"></div>

          <div className="flex items-center">
            {/* BOTON DE TEMA CLARO/OSCURO */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-transparent dark:hover:bg-cosmic-surf/30 text-gray-600 dark:text-white hover:text-cosmic-marina transition-all duration-300"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
