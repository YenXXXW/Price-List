/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        OpenSans: ["Open Sans", "sans-serif"],
      },
      gridTemplateRows: {
        // Complex site-specific row configuration
        layout: "70px auto",
      },
    },
  },
  plugins: [],
};
