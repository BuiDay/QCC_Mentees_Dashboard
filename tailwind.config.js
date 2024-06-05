/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "primary":"#24294a",
        "pink":"#FE568E",
        "second":"#eaebef"
      },
      colors:{
        "pink":"#FE568E"
      }
    },
  },
  plugins: [],
}