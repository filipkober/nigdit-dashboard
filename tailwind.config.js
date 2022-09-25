/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        backgroundD: '#1E1E1E',
        foregroundD: '#2B2B2B',
        backgroundL: '#D9A7DA',
        foregroundL: '#FF00FF',
      }
    },

  },
  plugins: [require("tailwind-gradient-mask-image")],
}
