/** @type {import('tailwindcss').DefaultTheme} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./lib/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#F7EFDF",
        charcoal: "#2B211A",
        terracotta: "#B54B2E",
        gold: "#D9A441",
        indigo: "#1B3A6B",
        locked: "#efe6d2",
        "locked-edge": "#c9bda3",
      },
      borderWidth: {
        2.5: "2.5px",
      },
    },
  },
  plugins: [],
};
