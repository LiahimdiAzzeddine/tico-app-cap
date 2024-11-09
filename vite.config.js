import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ['favicon.ico', "apple-touc-icon.png", "masked-icon.png" ],
  manifest: {
    name: "TiCO app",
    short_name: "TiCO app",
    description: "An app that can show the TiCO forecast for your city.",
    icons: [
      
      {
        src: "./icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose:'favicon'
      },
      {
        src: '/apple-touch-icon.png',
        sizes:'180x180',
        type:'image/png',
        purpose:'apple touch icon',
      }
    ],
    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  
  server: {
    host: '192.168.11.106',
    port: 3000
  }
})
