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
        'custom-green':'#42a199',
        'custom-green-clear':"#ecf8f8",
        'custom-green-background':'#c7f0d9',
        'custom-green-text':"#51736c",
        "custom-green-divider":"#b9d3d0",
        "custom-brown":"#ffeca7",
        "custom-green-text":"#4b996c",
        "custom-red-bg-clear":"#fad4ce"
      },
      screens: {

      },
    },
  },
  plugins: [],
}

