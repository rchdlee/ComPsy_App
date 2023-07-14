/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      backgroundDark: "#222222",
      // backgroundLight: "#F3F3F7",
      backgroundLight: "#F3F3F7",
      sidebarDark: "#161616",
      cardDark: "#303030",
      cardDarkHover: "#292929",
      cardLight: "#E9EBF2",
      white: "#F7F7F7",
      lilacBlue: "#A0B3F6",
      lilacBlueActive: "#6C87E7",
      salmonRed: "#F6A0A0",
      salmonRedActive: "#ED6B6B ",
      blackTextLight: "#191919",
    },
    extend: {},
  },
  plugins: [require("autoprefixer"), require("tailwindcss-text-fill")],
};
