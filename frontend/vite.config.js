import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/your-repo/', // Replace with your GitHub repo name
  server: {
    historyApiFallback: true, // Ensures all routes are served from index.html
}});
