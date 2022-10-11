/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    backgroundImage: {
      'bloodDrip': "url('../../assets/drippin.svg')",
    },
    screens: {
      'ms': '320px',  //mobile phone 
      'mm': '375px',
      'ml': '425px',
      'ts': '580px',  //tablet
      'tm': '640px',
      'tl': '768px',
      'ls': '1024px', //laptop
      'cs': '1280px', //computer
      'xl': '7680px', //cinema
    },
    extend: {
      dropShadow: {
        'midget': '3px 4px 5px rgba(0, 0, 0, 0.2)',
        'minimalistic': '0px 3px 3px rgba(0, 0, 0, 0.2)',
        'walter': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        'lucifer': '4px 4px 10px rgba(0, 0, 0, 0.3)', //x, y, blur, rgba
        'bigChungus': [
            '2px 5px 10px rgba(0, 0, 0, 0.3)',
            '-2px -5px 10px rgba(0, 0, 0, 0.1)'
        ],
        'buttonDevil': '0px 6px 0px #111',
        'buttonDevilA': '0px 3px 0px #111',
        'buttonImp': '0px 4px 0px #111',
        'buttonImpA': '0px 2px 0px #111'
      },
      colors:{
        backgroundD: '#1E1E1E',
        foregroundD: '#2B2B2B',
        backgroundL: '#D9A7DA',
        foregroundL: '#FF00FF',
        experimentA: '#393939',
        experimentB: '#484848',
      },
      animation: {
        'droplet1': 'drop 1.4s cubic-bezier(.57,0,.75,.07)',
        'droplet2': 'drop 1.5s cubic-bezier(.65,0,.71,.3)',
        'droplet3': 'drop 1.6s cubic-bezier(.57,0,.75,.07)',
        'droplet4': 'drop 1.7s cubic-bezier(.65,0,.71,.3)',
        'droplet5': 'drop 1.8s cubic-bezier(.57,0,.75,.07)',
        'droplet6': 'drop 1.9s cubic-bezier(.57,0,.75,.07)',
        'droplet7': 'drop 1.0s cubic-bezier(.65,0,.71,.3)',
        'droplet8': 'drop 1.1s cubic-bezier(.57,0,.75,.07)',
        'droplet9': 'drop 1.2s cubic-bezier(.65,0,.71,.3)',
        'droplet0': 'drop 1.3s cubic-bezier(.57,0,.75,.07)',
        'drip': 'drip 30s cubic-bezier(0,1.05,.59,.9)',
        'wiggle': 'wiggle 3s linear infinite',
      },
      keyframes: {
        drip: {
          '0%': { transform: 'translateY(-215px)', opacity: 0 }, //-135
          '1%': { transform: 'translateY(-215px)', opacity: 1},    
          '99%': { transform: 'translateY(-127px)', opacity: 1 },
          '100%': { transform: 'translateY(-127px)', opacity: 0 },
        },
        drop: {
          '0%': { transform: 'translateY(20px)', opacity: 0 }, //-135
          '1%': { transform: 'translateY(20px)', opacity: 1},    
          '99%': { transform: 'translateY(97vh)', opacity: 1 },
          '100%': { transform: 'translateY(97vh)', opacity: 0 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },

  },
  plugins: [
    require("tailwind-gradient-mask-image"),
    require('tailwind-scrollbar')
  ],
}
