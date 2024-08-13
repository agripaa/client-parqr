import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extends: {
      margin: {
        '12px': '12px',
      },
      maxHeight: {
        '10v': '10vh',
        '20v': '20vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',  
        '70v': '70vh',
        '80v': '80vh',
        '90v': '90vh',
      },
      height: {
        '65v': '65vh',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes:{}
  })],
}
