export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-t border-gray-800 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-3">
          <span className="text-jpl-red font-display font-black text-[10px] md:text-xs tracking-widest uppercase">
            Desarrollado por: JOSE ANGEL ZAVALETA RUIZ
          </span>
        </div>

        {/* Datos de la Agencia */}
        <div className="text-center md:text-right">
          <p className="text-gray-200 font-mono text-[10px] uppercase tracking-wider">
            © {currentYear} Agencia Espacial Zavaletiana
          </p>
          <p className="text-white font-mono text-[10px] tracking-wider mt-1">
            Proyecto Final: Master en Frontend Asistido con IA
          </p>
        </div>
      </div>
    </footer>
  );
};
