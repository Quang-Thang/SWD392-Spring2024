/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#416FDF",
        secondary: "#00492C",
      },
      backgroundImage: {
        "page-notfound": "url('/reas-project//src/asset/404bg.png')",
      },
    },
  },
  plugins: [],
};
