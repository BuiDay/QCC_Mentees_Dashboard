/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        "primary":"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
      },
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