const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    animationDelay: {
      100: "100ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      1000: "1000ms",
      2000: "2137ms",
      3000: "3000ms",
      5000: "5300ms",
      10000: "10400ms",
      12000: "12666ms",
      15000: "15600ms",
      16000: "16200ms",
      18000: "18700ms",
      20000: "20100ms",
    },
    linearGradientDirections: { // defaults to these values
      't': 'to top',
      'tr': 'to top right',
      'r': 'to right',
      'br': 'to bottom right',
      'b': 'to bottom',
      'bl': 'to bottom left',
      'l': 'to left',
      'tl': 'to top left',
    },
    linearGradientColors: { // defaults to {}
      'red': '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff'],
    },
    radialGradientShapes: { // defaults to this value
      'default': 'ellipse',
    },
    radialGradientSizes: { // defaults to this value
      'default': 'closest-side',
    },
    radialGradientPositions: { // defaults to these values
      'default': 'center',
      't': 'top',
      'tr': 'top right',
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left',
    },
    radialGradientColors: { // defaults to {}
      'red': '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff'],
    },
    conicGradientStartingAngles: { // defaults to this value
      'default': '0',
    },
    conicGradientPositions: { // defaults to these values
      'default': 'center',
      't': 'top',
      'tr': 'top right',
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left',
    },
    conicGradientColors: { // defaults to {}
      'red': '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'checkerboard': ['white 90deg', 'black 90deg 180deg', 'white 180deg 270deg', 'black 270deg'],
    },
    repeatingLinearGradientDirections: theme => theme('linearGradientDirections'), // defaults to this value
    repeatingLinearGradientColors: theme => theme('linearGradientColors'), // defaults to {}
    repeatingLinearGradientLengths: { // defaults to {}
      'sm': '25px',
      'md': '50px',
      'lg': '100px',
    },
    repeatingRadialGradientShapes: theme => theme('radialGradientShapes'), // defaults to this value
    repeatingRadialGradientSizes: { // defaults to this value
      'default': 'farthest-corner',
    },
    repeatingRadialGradientPositions: theme => theme('radialGradientPositions'), // defaults to this value
    repeatingRadialGradientColors: theme => theme('radialGradientColors'), // defaults to {}
    repeatingRadialGradientLengths: { // defaults to {}
      'sm': '25px',
      'md': '50px',
      'lg': '100px',
    },
    repeatingConicGradientStartingAngles: theme => theme('conicGradientStartingAngles'), // defaults to this value
    repeatingConicGradientPositions: theme => theme('conicGradientPositions'), // defaults to this value
    repeatingConicGradientColors: { // defaults to {}
      'red': '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'starburst': ['white 0 5deg', 'blue 5deg'],
    },
    repeatingConicGradientLengths: { // defaults to {}
      'sm': '10deg',
      'md': '20deg',
      'lg': '40deg',
    },    
    backgroundImage: {
      'bloodDrip': "url('/easterEgg1/drippin.svg')",
      'ocean': "url('/easterEgg1/seaofblood.png')",  //prawdopodobnie do konwersji na svg
      'joinedGroups': "url('/colorful43.svg')",
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
        opNickname: '#F2A44B',
      },
      animation: {
        'troll': 'flashing 5s linear infinite',
        'creep': 'creep 10s linear infinite',
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
        creep: {
          '0%': { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
          '79%': { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
          '80%': { transform: 'translateY(-2px) translateX(2px)', opacity: 1 },
          '80.5%': { transform: 'translateY(1px) translateX(-1px)', opacity: 1}, 
          '81%': { transform: 'translateY(2px) translateX(1px)', opacity: 1},    
          '81.5%': { transform: 'translateY(-1px) translateX(1px)', opacity: 1}, 
          '82%': { transform: 'translateY(-1x) translateX(-2px)', opacity: 1 },
          '82.5%': { transform: 'translateY(0px) translateX(1px)', opacity: 1}, 
          '83%': { transform: 'translateY(2px) translateX(-1px)', opacity: 1 },
          '83.5%': { transform: 'translateY(1px) translateX(-1px)', opacity: 1}, 
          '84%': { transform: 'translateY(-1px) translateX(0px)', opacity: 1 },
          '84.5%': { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
          '100%': { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
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
    },
  },
  plugins: [
    require("tailwind-gradient-mask-image"),
    require('tailwind-scrollbar'),
    require('tailwindcss-gradients'),
    require("tailwindcss-animation-delay"),
    require('@tailwindcss/line-clamp')
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
        scrollbar: ['rounded'],
        backgroundImage: ['responsive'], // this is for the "bg-none" utility
        linearGradients: ['responsive'],
        radialGradients: ['responsive'],
        conicGradients: ['responsive'],
        repeatingLinearGradients: ['responsive'],
        repeatingRadialGradients: ['responsive'],
        repeatingConicGradients: ['responsive'],
  }
}