import { Rocket, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full border-b border-cosmic-surf bg-cosmic-void/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo y Titulo */}
        <div className="flex items-center gap-3">
          <Rocket className="w-8 h-8 text-cosmic-marina" />
          <h1 className="text-xl font-bold tracking-widest text-gray-900 dark:text-white uppercase">
            Misiones <span className="text-cosmic-marina">Espaciales</span>
          </h1>
        </div>

        <div className="flex items-center">
          {/* BOTON DE TEMA CLARO/OSCURO */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-transparent dark:hover:bg-cosmic-surf/30 text-gray-600 dark:text-cosmic-bluing hover:text-cosmic-marina transition-all duration-300"
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
    </header>
  );
};
