import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src')}
    ]
  },
  server: {
    port: 1234
  }
})
