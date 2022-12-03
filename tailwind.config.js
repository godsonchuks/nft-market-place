/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        b1: '#1B1C1E',
        b3: '#656B8A',
        stroke: '#E8EDF0',
        lightdark: '#95979F',
        p2: '#7B61FF'
      }
    },
  },
  plugins: [],
}
