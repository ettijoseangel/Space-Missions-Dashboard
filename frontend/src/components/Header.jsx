import { Rocket } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full border-b border-cosmic-surf bg-cosmic-void/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo y Titulo */}
        <div className="flex items-center gap-3">
          <Rocket className="w-8 h-8 text-cosmic-marina" />
          <h1 className="text-xl font-bold tracking-widest text-white uppercase">
            Misiones <span className="text-cosmic-marina">Espaciales</span>
          </h1>
        </div>

        <div className="flex items-center">
          {/* BOTON DE TEMA CLARO/OSCURO */}
        </div>
      </div>
    </header>
  );
};
