import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ganti 'school-dashboard' dengan nama repository GitHub kamu
export default defineConfig({
  plugins: [react()],
  base: '/school-dashboard/',
})
