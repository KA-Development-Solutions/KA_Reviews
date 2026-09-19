import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Sends /api calls from the dev server to Express, which holds the RAWG key
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
