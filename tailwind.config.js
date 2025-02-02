/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'accentBlue': '#08506B',
        'primaryBlue': '#1991F0',
        'secondaryBlue': '#0A5A99',
        'primaryGreen': '#5BC4BE',
        'secondaryGreen': '#33AABA',
        'backgroundBlue': '#E6F2FF',
        'whiteFixed': '#FDFDFF',
        'primaryBlueText': '#074270',
        'navbarBlue': '#08506B',
      },
      fontFamily: {
        'IBM': ['IBM Plex Sans', 'sans-serif'],
        'Roboto': ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
