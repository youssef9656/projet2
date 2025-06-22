// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/projet2/', // ← CHEMIN CORRECT POUR GITHUB PAGES
  plugins: [react()],
})
