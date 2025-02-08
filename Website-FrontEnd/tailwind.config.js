/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'h-xr': { raw: '(min-height: 896px)' },
      },
    },
  },
  plugins: [],
}

