/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors:{
        '#1': '#E5E5CB',
        '#2': '#D5CEA3',
        '#3': '#3C2A21',
        '#4': '#1A120B',
      }
    },
  },
  plugins: [],
}