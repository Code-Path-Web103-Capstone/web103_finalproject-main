/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}", // Add this line to include shadcn components
  ],
  theme: {
    extend: {
      fontFamily: {
        anonymous: ['"Anonymous Pro"', "monospace"],
        manrope: ['"Manrope"', "sans-serif"],
      },
      colors: {
        customGray: "hsl(0, 0%, 80%)", // Define the custom color
        budgetblue: "#778DA9",
      },
      borderColor: {
        customGray: "hsl(0, 0%, 80%)", // Add the custom color to the borderColor utility
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
