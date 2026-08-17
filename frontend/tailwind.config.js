/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'jpl-red': '#E31937',        // Acento principal NASA/JPL
        'space-dark': '#0A192F',     // Fondo principal inmersivo para el modo oscuro
        'space-panel': '#112240',    // Fondo para las tarjetas y modales
        'space-light': '#F8F9FA',    // Blanco institucional para el modo claro
      },
      fontFamily: {
        // Aseguramos tipografías limpias: sans para lectura, mono para métricas
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
};
