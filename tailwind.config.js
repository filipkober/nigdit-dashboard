/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'ms': '320px',  //mobile phone 
      'mm': '375px',
      'ml': '425px',
      'ts': '580px',  //tablet
      'tm': '640px',
      'tl': '768px',
      'ls': '1024px', //laptop
      'cs': '1280px', //computer
    },
    extend: {
      dropShadow: {
        'midget': '3px 4px 5px rgba(0, 0, 0, 0.2)',
        'lucifer': '4px 4px 10px rgba(0, 0, 0, 0.3)', //x, y, blur, rgba
        'bigChungus': [
            '2px 5px 10px rgba(0, 0, 0, 0.3)',
            '-2px -5px 10px rgba(0, 0, 0, 0.1)'
        ],
        'buttonDevil': '0px 6px 0px #111',
        'buttonDevilA': '0px 3px 0px #111'
      },
      colors:{
        backgroundD: '#1E1E1E',
        foregroundD: '#2B2B2B',
        backgroundL: '#D9A7DA',
        foregroundL: '#FF00FF',
        accentD: '#3F3F3F',
        accentL: ''
      }
    },

  },
  plugins: [require("tailwind-gradient-mask-image")],
}
