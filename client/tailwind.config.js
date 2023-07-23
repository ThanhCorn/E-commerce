/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'rubik': ['Rubik', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#131921',
        'secondary': '#febd69',
        'third': '#232f3e',
      }
    },
  },
  plugins: [],
}