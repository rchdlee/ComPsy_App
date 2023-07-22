/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      backgroundDark: "#222222",
      // backgroundLight: "#F3F3F7",
      backgroundLight: "#F3F3F7",
      sidebarDark: "#161616",
      cardDark: "#303030",
      cardDarkHover: "#292929",
      // cardLight: "#E9EBF2",
      cardLight: "#dde0eb",
      // cardLight: "#EAEDF6",
      white: "#F7F7F7",
      lilacBlue: "#A0B3F6",
      lilacBlueActive: "#6C87E7",
      salmonRed: "#F6A0A0",
      error: "#ec0000",
      blackTextLight: "#191919",
    },
    extend: {},
  },
  plugins: [require("autoprefixer"), require("tailwindcss-text-fill")],
};
