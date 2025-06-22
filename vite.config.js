// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/projet2/', // IMPORTANT : le nom exact du repo GitHub
  plugins: [react()],
})
