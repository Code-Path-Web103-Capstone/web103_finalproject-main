/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}", // Add this line to include shadcn components
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			anonymous: ['Anonymous Pro"', "monospace"],
  			manrope: ['Manrope"', "sans-serif"]
  		},
  		colors: {
  			customGray: 'hsl(0, 0%, 80%)',
  			budgetblue: '#778DA9'
  		},
  		borderColor: {
  			customGray: 'hsl(0, 0%, 80%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
      require("tailwindcss-animate")
],
};
