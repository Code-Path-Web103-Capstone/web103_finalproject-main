/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        anonymous: ['"Anonymous Pro"', "monospace"],
        manrope: ['"Manrope"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
