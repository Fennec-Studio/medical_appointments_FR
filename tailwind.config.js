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
        'backgroundBlue': '#E6F2FF',
        'whiteFixed': '#FDFDFF',
        'primaryBlueText': '#074270',
      }
    },
  },
  plugins: [],
}
