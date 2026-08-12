/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: {
          void: "#070b14", // El fondo base (Negro/Azul abismal)
          surf: "#203c7f", // 19-3952 TCX (Azul profundo para tarjetas o headers)
          bluing: "#3b5f8f", // 18-4143 TCX (Azul grisáceo para bordes y detalles)
          marina: "#4f84c4", // 17-4041 TCX (Azul brillante para acentos e iconos)
          adobe: "#c17753", // 17-1340 TCX (Terracota para misiones en progreso/alertas)
          rose: "#b37475", // 17-1710 TCX (Rosa apagado para misiones fallidas)
          text: "#e2e8f0", // Gris muy claro para lectura cómoda
        },
      },
      backgroundImage: {
        // Estrellas con un tinte sutil del Pantone Marina (4f84c4)
        "stars-pattern":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%234f84c4' fill-opacity='0.15'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
