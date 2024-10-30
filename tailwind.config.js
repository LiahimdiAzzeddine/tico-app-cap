/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0f548d',
        'custom-gray':'#a4a4a4',
        'custom-rose':'#fff1f1',
        'custom-red':"#c32721",
        'custom-red-clear':"#c6312b",
        'custom-green':'#42a199'
      },
      screens: {

      },
    },
  },
  plugins: [],
}

