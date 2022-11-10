const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    backgroundImage: {
      'bloodDrip': "url('../../assets/easterEgg1/drippin.svg')",
      'ocean': "url('../../assets/easterEgg1/seaofblood.png')",  //prawdopodobnie do konwersji na svg
      'joinedGroups': "url('../../assets/colorful43.svg')",
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
      'cm': '1920px', 
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
        highlightD: '#252525',
        foregroundD: '#2B2B2B',
        backgroundL: '#D9A7DA',
        foregroundL: '#FF00FF',
        accentD: '#3F3F3F',
        accentL: '',
        black: '#000000',
        experimentC: '#323232',
        experimentA: '#393939',
        experimentB: '#484848',
        cancel: '#700000',
        cancelH: '#8F0000',
        apply: '#007000',
        applyH: '#008F00',
        delete: '#350000',
        deleteH: '#5A0000',
      },
      animation: {
        'troll': 'flashing 5s linear infinite',
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
        'drip': 'drip 20s cubic-bezier(.22,.73,.45,.83)',  //cubic-bezier(0,1.05,.59,.9)
        'wiggle': 'wiggle 3s linear infinite',
      },
      keyframes: {
        flashing: {
          '0%': {opacity: 0, filter: 'invert(0%) brightness(2) hue-rotate(120deg) contrast(2) saturate(0.5)'},    
          '1%': {opacity: 1, filter: 'invert(0%) brightness(2) hue-rotate(210deg) contrast(2) saturate(0.5)'},
          '2%': {opacity: 0, filter: 'invert(0%) brightness(0.6) hue-rotate(320deg) contrast(2) saturate(1)'},    
          '3%': {opacity: 1, filter: 'invert(0%) brightness(0.6) hue-rotate(320deg) contrast(2) saturate(1)'},          
          '4%': {opacity: 0, filter: 'invert(0%) brightness(1.3) hue-rotate(340deg) contrast(2) saturate(2)'},    
          '5%': {opacity: 1, filter: 'invert(0%) brightness(1.3) hue-rotate(340deg) contrast(2) saturate(2)'},
          '6%': {opacity: 0, filter: 'invert(0%) brightness(0.5) hue-rotate(340deg) contrast(2) saturate(2)'},    
          '7%': {opacity: 1, filter: 'invert(0%) brightness(0.5) hue-rotate(340deg) contrast(2) saturate(2)'},
          '11%': {opacity: 1, filter: 'invert(0%) brightness(0.5) hue-rotate(340deg) contrast(2) saturate(2)'},
          '12%': {opacity: 0, filter: 'invert(0%) brightness(0.5) hue-rotate(340deg) contrast(2) saturate(2)'},
          '76%': {opacity: 0, filter: 'invert(100%) brightness(1) hue-rotate(160deg) contrast(2) saturate(2)'},
          '77%': {opacity: 1, filter: 'invert(100%) brightness(1) hue-rotate(160deg) contrast(2) saturate(2)'},
          '80%': {opacity: 0, filter: 'invert(100%) brightness(1.5) hue-rotate(90deg) contrast(2) saturate(2)'},
          '81%': {opacity: 0, filter: 'invert(0%) brightness(1.5) hue-rotate(90deg) contrast(2) saturate(2)'},
          '100%': {opacity: 0, filter: 'invert(0%) brightness(2) hue-rotate(120deg) contrast(2) saturate(0.5)'},
        },
        drip: {
          '0%': { transform: 'translateY(-135px) translateX(-22vw)', opacity: 0 }, //-135
          '1%': { transform: 'translateY(-135px) translateX(-22vw)', opacity: 1},    
          '99%': { transform: 'translateY(-18px) translateX(-22vw)', opacity: 1 },  //-70
          '100%': { transform: 'translateY(-18px) translateX(-22vw)', opacity: 0 },
        },
        drop: {
          '0%': { transform: 'translateY(20px)', opacity: 0 }, //-135
          '1%': { transform: 'translateY(20px)', opacity: 1},    
          '99%': { transform: 'translateY(99vh)', opacity: 1 },
          '100%': { transform: 'translateY(99vh)', opacity: 0 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      linearGradientColors: theme => theme('colors'),
      radialGradientColors: theme => theme('colors'),
      conicGradientColors: theme => theme('colors'),
    },

  },
  plugins: [
    require("tailwind-gradient-mask-image"),
    require('tailwind-scrollbar'),
    require('tailwindcss-gradients'),
    // plugin(function({ addComponents }) {
    //   const buttons = {
    //     '.death': {
    //       backgroundColor: '#3490dc',
    //     },
    //     '.fade': {
    //       //mask-image: radial-gradient(ellipse 90% 80% at 48% 78%, black 40%, transparent 50%)
    //     },
    //     '.btn-red': {
    //       backgroundColor: '#e3342f',
    //       color: '#fff',
    //       '&:hover': {
    //         backgroundColor: '#cc1f1a'
    //       },
    //     },
    //   }

    //   addComponents(buttons)
    // })
  ],  
  variants: {
        scrollbar: ['rounded']
  }
}