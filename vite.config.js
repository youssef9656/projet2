
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/projet2/', // EXACTEMENT le nom de ton dépôt GitHub
  plugins: [react()],
})
