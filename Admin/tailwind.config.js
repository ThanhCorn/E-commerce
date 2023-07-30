/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#131921",
        secondary: "#febd69",
        third: "#232f3e",
        "color-black": "#212529",
        "color-yellow": "#ffd333",
        "color-green": "#47ad24",
        "color-red": "#e52e2e",
        "color-gray": "#828599",
      },
    },
  },
  plugins: [],
};
