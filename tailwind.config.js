/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        customMd: "0.9rem",
        customOne: "1rem",
        customLg: "1.1rem",
      },
      lineHeight: {
        clash: 1,
        archivo: 1.2,
      },

      colors: {
        "custom-blue": "#0F548D",
        "custom-gray": "#a4a4a4",
        "custom-rose": "#fff1f1",
        "custom-red": "#c32721",
        "custom-red-clear": "#c6312b",
        "custom-green": "#42a199",
        "custom-green-clear": "#ebf8f7",
        "custom-green-background": "#c7f0d9",
        "custom-green-divider": "#bde4e1",
        "custom-brown": "#ffeca7",
        "custom-green-text": "#4E986D",
        "custom-red-bg-clear": "#fad4ce",
        "custom-orange": "#ffeda3",
        "custom-text-orange": "#FF8200",
        "custom-orange-bg": "#FFECA7",
        "mockup-green": "#2d6b66",
        "mockup-blue": "#6dc3bc",
      },
      screens: {
        iphonese: "320px", // Taille spécifique pour iPhone SE
        iphonexr: "414px", // Taille spécifique pour iPhone XR
      },
    },
    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      tight: "-.025em",
      normal: "0",
      wide: ".025em",
      wider: ".05em",
      widest: ".1em",
      widest: ".25em",
    },
  },
  plugins: [],
};
