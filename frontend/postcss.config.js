/** @type {import('tailwindcss').Config} */
export default {
  // Habilita el cambio de tema oscuro mediante una clase en el HTML
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en Artemis II
        space: {
          dark: "#0b101e", // Fondo negro azulado principal
          card: "#151b2b", // Fondo para tarjetas o elementos elevados
          ash: "#d1d5db", // Blanco ceniza para textos secundarios
          cyan: "#00ffff", // Cian fosforescente para títulos y brillos
        },
        badge: {
          red: "#ff3b30",
          orange: "#ff9500",
          green: "#34c759",
        },
      },
      backgroundImage: {
        // SVG Background codificado (estrellas)
        "stars-pattern":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
