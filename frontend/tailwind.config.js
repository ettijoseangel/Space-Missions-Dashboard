/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0b101e',
          card: '#151b2b',
          ash: '#d1d5db',
          cyan: '#00ffff',
        },
        badge: {
          red: '#ff3b30',
          orange: '#ff9500',
          green: '#34c759'
        }
      },
      backgroundImage: {
        'stars-pattern': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpolygon fill-rule=\'evenodd\' points=\'8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4\'/%3E%3C/g%3E%3C/svg%3E")'
      }
    },
  },
  plugins: [],
}