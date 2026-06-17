/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chatxBg: '#0F0C15',
        chatxSurface: '#171221',
        chatxPrimary: '#A855F7',
        chatxPink: '#D946EF',
        chatxTextMuted: '#94A3B8'
      }
    },
  },
  plugins: [],
}
