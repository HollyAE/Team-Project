/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin")
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        'medium' : '850px',
        'sm-md' : '550px',
        'x-small' : '400px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    /*Code used to hide scrollbar by adding a new Tailwind Class.
    Credit to https://tailwindcss.com/docs/plugins#adding-utilities and
    https://stackoverflow.com/questions/66416614/how-to-create-scrollable-element-in-tailwind-without-a-scrollbar
    for the idea and code */
    
    plugin(function ( {addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar" : {
          "display": "none",
      },
      
      ".no-scrollbar" : {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",  
      }
      })
    })
  ],
};
