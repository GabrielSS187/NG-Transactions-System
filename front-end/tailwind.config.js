/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./commons/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "black",
        "light-white": "rgba(255,255,255,0.17)",
      },
      screens: {
        "desk850": "400px",
        "desk460": "460px",
        "desk600": "600px"
      }
    }
  },
  plugins: [],
}