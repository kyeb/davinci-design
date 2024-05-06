/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        // https://tints.dev/maroon/2B0018
        maroon: {
          50: "#FFDBEF",
          100: "#FFBDE1",
          200: "#FF7AC3",
          300: "#FF38A5",
          400: "#F50087",
          500: "#B30062",
          600: "#6B003B",
          700: "#2B0018",
          800: "#1F0011",
          900: "#0F0008",
          950: "#050003",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
